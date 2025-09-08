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

module.exports = { submitTicket };