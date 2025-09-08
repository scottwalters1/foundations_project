// Submit Ticket Feature

// The submit ticket feature is meant to guide you through input acceptance, validation, and error handling. The ability to submit a reimbursement request ticket is the core functionality of this application. User Stories Employees can submit a new reimbursement ticket

//     Must have an amount
//     Must have a description
//     Should have a default status of Pending

class Ticket {
    constructor( { ticketId, username, amount, description }) {
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