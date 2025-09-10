const ticketService = require("../services/ticketService");

async function submitTicket(req, res) {
  try {
    const ticket = await ticketService.submitTicket(req.body);
    res.status(201).json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function getTicketById(req, res) {
  try {
    const ticket = await ticketService.getTicketById(req.params.ticketId);
    res.status(200).json(ticket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function getAllTickets(req, res) {
  try {
    const tickets = await ticketService.getAllTickets();
    res.status(200).json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function getUnprocessedTickets(req, res) {
  try {
    const tickets = await ticketService.getUnprocessedTickets();
    res.status(200).json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function getTicketsByUsername(req, res) {
  try {
    const tickets = await ticketService.getTicketsByUsername(
      req.params.username
    );
    res.status(200).json(tickets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

async function processTicket(req, res) {
  try {
    const ticketId = req.params.ticketId;
    const status = req.body.status;
    const processedTicket = await ticketService.processTicket(ticketId, status);
    res.status(200).json(processedTicket);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  submitTicket,
  getAllTickets,
  getUnprocessedTickets,
  getTicketsByUsername,
  getTicketById,
  processTicket,
};
