const { v4: uuidv4 } = require("uuid");
const ticketRepository = require("../repositories/ticketRepository");
const Ticket = require("../models/Ticket");

async function submitTicket(data) {
  const newTicket = new Ticket({
    ...data,
    ticketId: uuidv4(),
    createdAt: Date.now(),
  });
  await ticketRepository.submitTicket(newTicket);
  return { message: "Ticket Submitted" };
}

async function getAllTickets() {
    const tickets = await ticketRepository.getAllTickets();
    return tickets;
}

module.exports = {
  submitTicket,
  getAllTickets
};
