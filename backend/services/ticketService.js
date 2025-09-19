const { v4: uuidv4 } = require("uuid");

const { AppError } = require("../util/appError");
const { logger } = require("../util/logger");
const ticketRepository = require("../repositories/ticketRepository");
const Ticket = require("../models/Ticket");

function getAllTickets() {
  return ticketRepository.getAllTickets();
}

function getTicketsByUsername(username) {
  return ticketRepository.getTicketsByUsername(username);
}

function getTicketsByStatus(status) {
  return ticketRepository.getTicketsByStatus(status);
}

async function getTicketById(ticketId) {
  const ticket = await ticketRepository.getTicketById(ticketId);
  if (!ticket) {
    logger.warn(`Ticket ${ticketId} not found`);
    throw new AppError(`Ticket ${ticketId} not found`, 404);
  }
  return ticket;
}

async function submitTicket(data, username) {
  if (
    data.amount === undefined ||
    typeof data.amount !== "number" ||
    isNaN(data.amount) ||
    data.amount <= 0
  ) {
    logger.warn("Ticket cannot be submitted without a numerical amount greater than 0");
    throw new AppError(
      "Ticket cannot be submitted without a numerical amount greater than 0",
      400
    );
  }
  if (data.description === undefined || data.description.length == 0) {
    logger.warn("Ticket cannot be submitted without a description");
    throw new AppError("Ticket cannot be submitted without a description", 400);
  }

  const newTicket = new Ticket({
    ...data,
    username,
    ticketId: uuidv4(),
    createdAt: Date.now(),
  });
  await ticketRepository.submitTicket(newTicket);
  logger.info("Ticket submitted");
  return newTicket;
}

async function processTicket(ticketId, newStatus) {
  const ticketToProcess = await ticketRepository.getTicketById(ticketId);

  if (!ticketToProcess) {
    logger.warn("Ticket not found");
    throw new AppError(`Ticket ${ticketId} not found`, 404); // 404 Not Found
  }
  if (ticketToProcess.status !== "pending") {
    logger.warn("Ticket already processed");
    throw new AppError("Ticket already processed", 409); // 409 Conflict
  }
  if (!["approved", "denied"].includes(newStatus)) {
    logger.warn("Invalid new status");
    throw new AppError("Invalid new status", 400);
  }
  logger.info("Ticket processed");
  return ticketRepository.processTicket(ticketId, newStatus);
}

module.exports = {
  submitTicket,
  getAllTickets,
  getTicketsByUsername,
  getTicketById,
  processTicket,
  getTicketsByStatus,
};
