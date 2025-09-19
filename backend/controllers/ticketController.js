const express = require("express");
const router = express.Router();

const ticketService = require("../services/ticketService");

// Manager returns every ticket, or by status
// Employee returns their own tickets
router.get("/", async (req, res, next) => {
  try {
    let tickets;

    if (req.user.role === "manager") {
      const { status } = req.query;

      if (status) {
        tickets = await ticketService.getTicketsByStatus(status);
      } else {
        tickets = await ticketService.getAllTickets();
      }
    } else {
      tickets = await ticketService.getTicketsByUsername(req.user.username);
    }

    if (tickets && tickets.length > 0) {
      return res.status(200).json(tickets);
    } else {
      return res.status(200).json([]); // safer than 404 for list endpoints
    }
  } catch (err) {
    next(err);
  }
});

// get ticket by id - only manager or if ticket created by logged in user
router.get("/:ticketId", async (req, res, next) => {
  try {
    const ticketId = req.params.ticketId;
    const ticket = await ticketService.getTicketById(ticketId);

    if (req.user.role !== "manager" && req.user.username !== ticket.username) {
      return res.status(403).json({ message: "Forbidden: Managers only" });
    }

    res.status(200).json(ticket);
  } catch (err) {
    next(err); // handled by AppError middleware
  }
});

// submit ticket - gets username from logged in user
router.post("/", async (req, res, next) => {
  try {
    const username = req.user.username;
    const ticket = await ticketService.submitTicket(req.body, username);

    res
      .status(201)
      .json({ message: `Created Ticket ${JSON.stringify(ticket)}` });
  } catch (err) {
    next(err); // Passes error to your custom error middleware
  }
});

// process ticket - only managers
router.patch("/:ticketId", async (req, res) => {
  if (req.user.role !== "manager") {
    return res.status(403).json({ message: "Forbidden: Managers only" });
  }

  const ticketId = req.params.ticketId;
  const newStatus = req.body.status;
  const ticket = await ticketService.processTicket(ticketId, newStatus);
  if (ticket) {
    // Adding on manager who processed ticket
    const ticketWithManager = {
      ...ticket,
      processedBy: req.user.username,
    };
    res.status(202).json(ticketWithManager);
  } else {
    res.status(400).json({ message: `Ticket ${ticketId} not found` });
  }
});

module.exports = router;
