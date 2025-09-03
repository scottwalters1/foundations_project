const employeeRepository = require("../repositories/employeeRepository")
const { v4: uuidv4 } = require("uuid");

module.exports = {
    async createEmployee(name) {
        const employee = { employeeId: uuidv4(), name };
        await employeeRepository.createEmployee(employee);
        return employee;
    },

    async getEmployeeById(employeeId) {
        return employeeRepository.getEmployeeById(employeeId);
    }
};