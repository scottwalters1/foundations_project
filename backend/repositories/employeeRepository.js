const dynamoDB = require("../db/dynamoClient");

const EMPLOYEES_TABLE = process.env.EMPLOYEES_TABLE || "Employees-dev";

module.exports = {
    async createEmployee(employee) {
        const params = { TableName: EMPLOYEES_TABLE, Item: employee };
        return dynamoDB.put(params).promise();
    },

    async getEmployeeById(employeeId) {
        const params = { TableName: EMPLOYEES_TABLE, Key: { employeeId }};
        const result = await dynamoDB.get(params).promise();
        return result.Item;
    }
};