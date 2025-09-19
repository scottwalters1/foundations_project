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
      res.status(200).json(tickets);
    } else {
      res.status(200).json([]);
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
    next(err);
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
    next(err);
  }
});

// process ticket - only managers

router.patch("/:ticketId", async (req, res, next) => {
  try {
    if (req.user.role !== "manager") {
      throw new AppError("Forbidden: Managers only", 403);
    }

    const ticket = await ticketService.processTicket(
      req.params.ticketId,
      req.body.status
    );

    res.status(202).json({
      // adding on manager who processed ticket
      ...ticket,
      processedBy: req.user.username,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
