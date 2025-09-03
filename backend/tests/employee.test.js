// jest.mock("../db/dynamoClient");
// const request = require("supertest");
// process.env.NODE_ENV = "test";
// const app = require("../server");
// const dynamoDB = require("../db/dynamoClient");

// describe("Employees API", () => {
//   beforeEach(() => {
//     dynamoDB.put.mockClear();
//     dynamoDB.get.mockClear();
//     dynamoDB.promise.mockClear();
//   });

//   test("Health check works", async () => {
//     const res = await request(app).get("/health");
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toEqual({ status: "API is running" });
//   });

//   test("POST /employees creates an employee", async () => {
//     dynamoDB.put().promise.mockResolvedValueOnce({});
//     const employeeData = { name: "Alice" };

//     const res = await request(app).post("/employees").send(employeeData);

//     expect(res.statusCode).toBe(201);
//     expect(res.body).toHaveProperty("employeeId");
//     expect(res.body.name).toBe("Alice");
//     expect(dynamoDB.put).toHaveBeenCalledTimes(1);
//   });

//   test("GET /employees/:id returns an employee", async () => {
//     const fakeEmployee = { employeeId: "123", name: "Bob" };
//     dynamoDB.get().promise.mockResolvedValueOnce({ Item: fakeEmployee });

//     const res = await request(app).get("/employees/123");

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toEqual(fakeEmployee);
//     expect(dynamoDB.get).toHaveBeenCalledTimes(1);
//   });
// });

process.env.NODE_ENV = "test";
jest.mock("../db/dynamoClient");

const dynamoDB = require("../db/dynamoClient");
const request = require("supertest");
const app = require("../server");

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Employees API", () => {
  test("Health check works", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: "API is running" });
  });

  test("POST /employees creates an employee", async () => {
    // Mock the nested promise function directly
    dynamoDB.put().promise.mockResolvedValueOnce({});
    const employeeData = { name: "Alice" };

    const res = await request(app).post("/employees").send(employeeData);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("employeeId");
    expect(res.body.name).toBe("Alice");
    expect(dynamoDB.put).toHaveBeenCalledTimes(1);
  });

  test("GET /employees/:id returns an employee", async () => {
    const fakeEmployee = { employeeId: "123", name: "Bob" };
    // Mock the nested promise function directly
    dynamoDB.get().promise.mockResolvedValueOnce({ Item: fakeEmployee });

    const res = await request(app).get("/employees/123");

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(fakeEmployee);
    expect(dynamoDB.get).toHaveBeenCalledTimes(1);
  });
});