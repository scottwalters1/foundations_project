const employeeService = require("../services/employeeService");

module.exports = {
    createEmployee: async (req, res) => {
        const { name } = req.body;
        try {
            const employee = await employeeService.createEmployee(name);
            res.status(201).json(employee);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    },

    getEmployee: async (req, res) => {
        const { id } = req.params;
        try {
            const employee = await employeeService.getEmployeeById(id);
            if (!employee) return res.status(404).json({ error: "Employee not found"});
            res.json(employee);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    }
};