const express = require("express");
const router = express.Router();

const ticketService = require("../services/ticketService");

// get all tickets or tickets by username
router.get("/", async (req, res) => {
  const { username } = req.query;
  if (username) {
    const tickets = await ticketService.getTicketsByUsername(username);
    if (tickets) {
      return res.status(200).json(tickets);
    } else {
      return res
        .status(400)
        .json({ message: `Tickets from ${username} not found` });
    }
  } else {
    const tickets = await ticketService.getAllTickets();
    if (tickets) {
      return res.status(200).json(tickets);
    } else {
      return res.status(400).json({ message: "Internal server error" });
    }
  }
});

// get unprocessed tickets
router.get("/unprocessed", async (req, res) => {
  const tickets = await ticketService.getUnprocessedTickets();
  if (tickets) {
    return res.status(200).json(tickets);
  } else {
    return res.status(400).json({ message: "Internal server error" });
  }
});

// get ticket by id
router.get("/:ticketId", async (req, res) => {
  const ticketId = req.params.ticketId;
  const ticket = await ticketService.getTicketById(ticketId);
  if (ticket) {
    res.status(200).json(ticket);
  } else {
    res.status(400).json({ message: `Ticket ${ticketId} not found` });
  }
});

// submit ticket
router.post("/", async (req, res) => {
  const ticket = await ticketService.submitTicket(req.body);
  if (ticket) {
    res
      .status(201)
      .json({ message: `Created Ticket ${JSON.stringify(ticket)}` });
  } else {
    res.status(500).json({ message: "Ticket not created", data: req.body });
  }
});

// process ticket
router.patch("/:ticketId", async (req, res) => {
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
