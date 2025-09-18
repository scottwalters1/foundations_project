class Ticket {
  constructor({ ticketId, username, amount, description, createdAt }) {

    this.ticketId = ticketId;
    this.username = username;
    this.amount = amount;
    this.description = description;
    this.status = "pending";
    this.createdAt = createdAt;
  }
}

module.exports = Ticket;
