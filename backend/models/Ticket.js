class Ticket {
  constructor({ ticketId, username, amount, description }) {
    if (amount < 0) throw new Error("Invalid amount");

    if (description.length <= 0) throw new Error("Please enter a description");
    this.ticketId = ticketId;
    this.username = username;
    this.amount = amount;
    this.description = description;
    this.status = "pending";
  }
}

module.exports = Ticket;
