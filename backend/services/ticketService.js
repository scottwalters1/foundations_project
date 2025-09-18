const { v4: uuidv4 } = require("uuid");

const { AppError } = require("../util/appError");
const ticketRepository = require("../repositories/ticketRepository");
const Ticket = require("../models/Ticket");

function getAllTickets() {
  return ticketRepository.getAllTickets();
}

function getTicketsByStatus(status) {
  return ticketRepository.getTicketsByStatus(status);
}

function getUnprocessedTickets() {
  return ticketRepository.getUnprocessedTickets();
}

function getTicketById(ticketId) {
  return ticketRepository.getTicketById(ticketId);
}

function getTicketsByUsername(username) {
  return ticketRepository.getTicketsByUsername(username);
}

async function submitTicket(data, username) {
  if (data.amount === undefined || data.amount <= 0) {
    throw new AppError(
      "Ticket cannot be submitted without an amount greater than 0",
      400
    );
  }
  if (data.description === undefined || data.description.length == 0) {
    throw new AppError("Ticket cannot be submitted without a description", 400);
  }

  const newTicket = new Ticket({
    ...data,
    username,
    ticketId: uuidv4(),
    createdAt: Date.now(),
  });
  await ticketRepository.submitTicket(newTicket);
  return newTicket;
}

async function processTicket(ticketId, newStatus) {
  const ticketToProcess = await ticketRepository.getTicketById(ticketId);

  if (!ticketToProcess) {
    throw new AppError("Ticket not found", 404); // 404 Not Found
  }
  if (ticketToProcess.status !== "pending") {
    throw new AppError("Ticket already processed", 409); // 409 Conflict
  }
  if (!["approved", "denied"].includes(newStatus)) {
    throw new AppError("Invalid new status", 400);
  }

  return ticketRepository.processTicket(ticketId, newStatus);
}

module.exports = {
  submitTicket,
  getAllTickets,
  getUnprocessedTickets,
  getTicketsByUsername,
  getTicketById,
  processTicket,
  getTicketsByStatus,
};
