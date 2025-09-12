const express = require("express");
const router = express.Router();

const ticketService = require("../services/ticketService");

// Manager returns every ticket
// Employee returns their own tickets
router.get("/", async (req, res) => {
  if (req.user.role === "manager") {
    const tickets = await ticketService.getAllTickets();
    if (tickets) {
      return res.status(200).json(tickets);
    } else {
      return res.status(400).json({ message: "Internal server error" });
    }
  } else {
    const tickets = await ticketService.getTicketsByUsername(req.user.username);
    if (tickets) {
      return res.status(200).json(tickets);
    } else {
      return res
        .status(400)
        .json({ message: `Tickets from ${username} not found` });
    }
  }
});

// get unprocessed tickets - only manager
router.get("/unprocessed", async (req, res) => {
  if (req.user.role !== "manager") {
    return res.status(403).json({ message: "Forbidden: Managers only" });
  }
  const tickets = await ticketService.getUnprocessedTickets();
  if (tickets) {
    return res.status(200).json(tickets);
  } else {
    return res.status(400).json({ message: "Internal server error" });
  }
});

// get ticket by id - only manager or if ticket created by logged in user
router.get("/:ticketId", async (req, res) => {
  const ticketId = req.params.ticketId;
  const ticket = await ticketService.getTicketById(ticketId);
  if (req.user.role !== "manager" && req.user.username !== ticket.username) {
    return res.status(403).json({ message: "Forbidden: Managers only" });
  }
  if (ticket) {
    res.status(200).json(ticket);
  } else {
    res.status(400).json({ message: `Ticket ${ticketId} not found` });
  }
});

// submit ticket - gets username from logged in user
router.post("/", async (req, res) => {
  const username = req.user.username;
  const ticket = await ticketService.submitTicket(req.body, username);
  if (ticket) {
    res
      .status(201)
      .json({ message: `Created Ticket ${JSON.stringify(ticket)}` });
  } else {
    res.status(500).json({ message: "Ticket not created", data: req.body });
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
    res.status(200).json(ticket);
  } else {
    res.status(400).json({ message: `Ticket ${ticketId} not found` });
  }
});

module.exports = router;
