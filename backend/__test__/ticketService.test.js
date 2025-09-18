const ticketRepository = require("../repositories/ticketRepository");
const ticketService = require("../services/ticketService");

// Whenever something requires userRepo, give it a mocked version
jest.mock("../repositories/ticketRepository");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Ticket Service Tests", () => {
  test("getAllTickets should return all the tickets in the DB", async () => {
    ticketRepository.getAllTickets.mockResolvedValue([
      {
        amount: 1000,
        username: "Frank",
        description: "supplies",
        ticketId: "855012a0-c55a-4d28-86f7-9434653260f8",
        status: "approved",
      },
      {
        amount: 1000,
        username: "Alice",
        description: "lunch",
        ticketId: "6a32eb1d-935d-4808-9dc9-f230ef4184c8",
        status: "denied",
      },
      {
        amount: 752.37,
        username: "John",
        description: "lunch",
        ticketId: "3658d285-46ca-4c65-acf0-b47354077b06",
        status: "denied",
      },
      {
        amount: 10000,
        username: "Chuck",
        description: "supplies",
        ticketId: "8a8ad762-b67e-4561-a06b-759b43c6facb",
        status: "approved",
      },
      {
        amount: 1000,
        username: "Dave",
        description: "supplies",
        ticketId: "5e2f0480-dea1-48eb-9fb0-30d588d6ecbb",
        status: "approved",
      },
      {
        amount: 654.77,
        username: "Alice",
        description: "drinks",
        ticketId: "cd818830-0cfd-4da7-a9c0-a7d514998488",
        status: "pending",
      },
      {
        amount: 654.77,
        username: "Frank",
        description: "drinks",
        ticketId: "f73707d9-dfe8-4ce6-8371-58d1069f0162",
        status: "pending",
      },
      {
        amount: 500,
        username: "Alice",
        description: "mileage reimbursement",
        ticketId: "b31c4acd-83b9-4686-9d31-bf22c69ad393",
        status: "approved",
      },
      {
        amount: 1000,
        username: "Bob",
        description: "supplies",
        ticketId: "9196adea-ee06-4825-aa0b-bcde107dc85e",
        status: "pending",
      },
      {
        amount: 500,
        username: "Alice",
        description: "mileage reimbursement",
        ticketId: "2a335ed3-a062-4371-8544-04111ac9354e",
        status: "pending",
      },
      {
        amount: 654.77,
        username: "Frank",
        description: "drinks",
        ticketId: "854b687d-c22a-4dca-9611-088d214779f8",
        status: "denied",
      },
      {
        amount: 1000,
        username: "Ed",
        description: "dinner",
        ticketId: "a16d033f-7365-4d45-962a-5675abf7ac8c",
        status: "pending",
      },
      {
        amount: 1000,
        username: "Gus",
        description: "lunch",
        ticketId: "3186364f-ee0e-44ce-8d2d-c08db1ae20e2",
        status: "approved",
      },
    ]);

    const result = await ticketService.getAllTickets();

    expect(result).toEqual([
      {
        amount: 1000,
        username: "Frank",
        description: "supplies",
        ticketId: "855012a0-c55a-4d28-86f7-9434653260f8",
        status: "approved",
      },
      {
        amount: 1000,
        username: "Alice",
        description: "lunch",
        ticketId: "6a32eb1d-935d-4808-9dc9-f230ef4184c8",
        status: "denied",
      },
      {
        amount: 752.37,
        username: "John",
        description: "lunch",
        ticketId: "3658d285-46ca-4c65-acf0-b47354077b06",
        status: "denied",
      },
      {
        amount: 10000,
        username: "Chuck",
        description: "supplies",
        ticketId: "8a8ad762-b67e-4561-a06b-759b43c6facb",
        status: "approved",
      },
      {
        amount: 1000,
        username: "Dave",
        description: "supplies",
        ticketId: "5e2f0480-dea1-48eb-9fb0-30d588d6ecbb",
        status: "approved",
      },
      {
        amount: 654.77,
        username: "Alice",
        description: "drinks",
        ticketId: "cd818830-0cfd-4da7-a9c0-a7d514998488",
        status: "pending",
      },
      {
        amount: 654.77,
        username: "Frank",
        description: "drinks",
        ticketId: "f73707d9-dfe8-4ce6-8371-58d1069f0162",
        status: "pending",
      },
      {
        amount: 500,
        username: "Alice",
        description: "mileage reimbursement",
        ticketId: "b31c4acd-83b9-4686-9d31-bf22c69ad393",
        status: "approved",
      },
      {
        amount: 1000,
        username: "Bob",
        description: "supplies",
        ticketId: "9196adea-ee06-4825-aa0b-bcde107dc85e",
        status: "pending",
      },
      {
        amount: 500,
        username: "Alice",
        description: "mileage reimbursement",
        ticketId: "2a335ed3-a062-4371-8544-04111ac9354e",
        status: "pending",
      },
      {
        amount: 654.77,
        username: "Frank",
        description: "drinks",
        ticketId: "854b687d-c22a-4dca-9611-088d214779f8",
        status: "denied",
      },
      {
        amount: 1000,
        username: "Ed",
        description: "dinner",
        ticketId: "a16d033f-7365-4d45-962a-5675abf7ac8c",
        status: "pending",
      },
      {
        amount: 1000,
        username: "Gus",
        description: "lunch",
        ticketId: "3186364f-ee0e-44ce-8d2d-c08db1ae20e2",
        status: "approved",
      },
    ]);

    expect(ticketRepository.getAllTickets).toHaveBeenCalledTimes(1);
  });

  test("getUnprocessedTickets should return all tickets with pending status", async () => {
    ticketRepository.getUnprocessedTickets.mockResolvedValue([
      {
        amount: 654.77,
        username: "Alice",
        description: "drinks",
        ticketId: "cd818830-0cfd-4da7-a9c0-a7d514998488",
        status: "pending",
      },
      {
        amount: 654.77,
        username: "Frank",
        description: "drinks",
        ticketId: "f73707d9-dfe8-4ce6-8371-58d1069f0162",
        status: "pending",
      },
      {
        amount: 1000,
        username: "Bob",
        description: "supplies",
        ticketId: "9196adea-ee06-4825-aa0b-bcde107dc85e",
        status: "pending",
      },
      {
        amount: 500,
        username: "Alice",
        description: "mileage reimbursement",
        ticketId: "2a335ed3-a062-4371-8544-04111ac9354e",
        status: "pending",
      },
      {
        amount: 1000,
        username: "Ed",
        description: "dinner",
        ticketId: "a16d033f-7365-4d45-962a-5675abf7ac8c",
        status: "pending",
      },
    ]);

    const result = await ticketService.getUnprocessedTickets();

    expect(result).toEqual([
      {
        amount: 654.77,
        username: "Alice",
        description: "drinks",
        ticketId: "cd818830-0cfd-4da7-a9c0-a7d514998488",
        status: "pending",
      },
      {
        amount: 654.77,
        username: "Frank",
        description: "drinks",
        ticketId: "f73707d9-dfe8-4ce6-8371-58d1069f0162",
        status: "pending",
      },
      {
        amount: 1000,
        username: "Bob",
        description: "supplies",
        ticketId: "9196adea-ee06-4825-aa0b-bcde107dc85e",
        status: "pending",
      },
      {
        amount: 500,
        username: "Alice",
        description: "mileage reimbursement",
        ticketId: "2a335ed3-a062-4371-8544-04111ac9354e",
        status: "pending",
      },
      {
        amount: 1000,
        username: "Ed",
        description: "dinner",
        ticketId: "a16d033f-7365-4d45-962a-5675abf7ac8c",
        status: "pending",
      },
    ]);

    expect(ticketRepository.getUnprocessedTickets).toHaveBeenCalledTimes(1);
  });

  test("getTicketById should return the ticket with the given id", async () => {
    const mockTicket = {
      amount: 1000,
      username: "Alice",
      description: "lunch",
      ticketId: "6a32eb1d-935d-4808-9dc9-f230ef4184c8",
      status: "denied",
    };

    ticketRepository.getTicketById.mockResolvedValue(mockTicket);

    const result = await ticketService.getTicketById(
      "6a32eb1d-935d-4808-9dc9-f230ef4184c8"
    );

    expect(result).toEqual(mockTicket);
    expect(ticketRepository.getTicketById).toHaveBeenCalledTimes(1);
    expect(ticketRepository.getTicketById).toHaveBeenCalledWith(
      "6a32eb1d-935d-4808-9dc9-f230ef4184c8"
    );
  });

  test("getTicketById should return null if no ticket is found", async () => {
    ticketRepository.getTicketById.mockResolvedValue(null);

    const result = await ticketService.getTicketById("non-existent-id");

    expect(result).toBeNull();
    expect(ticketRepository.getTicketById).toHaveBeenCalledTimes(1);
    expect(ticketRepository.getTicketById).toHaveBeenCalledWith(
      "non-existent-id"
    );
  });

  test("getTicketsByUsername should return all tickets for the given username", async () => {
    const mockTickets = [
      {
        amount: 500,
        username: "Alice",
        description: "mileage reimbursement",
        ticketId: "b31c4acd-83b9-4686-9d31-bf22c69ad393",
        status: "approved",
      },
      {
        amount: 654.77,
        username: "Alice",
        description: "drinks",
        ticketId: "cd818830-0cfd-4da7-a9c0-a7d514998488",
        status: "pending",
      },
    ];

    ticketRepository.getTicketsByUsername.mockResolvedValue(mockTickets);

    const result = await ticketService.getTicketsByUsername("Alice");

    expect(result).toEqual(mockTickets);
    expect(ticketRepository.getTicketsByUsername).toHaveBeenCalledTimes(1);
    expect(ticketRepository.getTicketsByUsername).toHaveBeenCalledWith("Alice");
  });

  test("getTicketsByUsername should return an empty array if no tickets are found for username", async () => {
    ticketRepository.getTicketsByUsername.mockResolvedValue([]);

    const result = await ticketService.getTicketsByUsername("NoUser");

    expect(result).toEqual([]);
    expect(ticketRepository.getTicketsByUsername).toHaveBeenCalledTimes(1);
    expect(ticketRepository.getTicketsByUsername).toHaveBeenCalledWith(
      "NoUser"
    );
  });

  test("submitTicket should return successfully created ticket", async () => {
    // Arrange
    const mockSubmitBody = {
      amount: 50,
      description: "lunch",
    };

    // Don't need mockResolvedValue since service itself creates the ticket
    ticketRepository.submitTicket.mockResolvedValue();

    // Act
    const result = await ticketService.submitTicket(mockSubmitBody, "Harry");

    // Assert
    expect(result).toMatchObject({
      amount: 50,
      description: "lunch",
      username: "Harry",
      status: "pending", // if default is "pending" in your Ticket class
    });

    console.log(result);

    // ticketId and createdAt are dynamic, so check only that they're defined
    expect(result.ticketId).toEqual(expect.any(String));
    expect(result.createdAt).toEqual(expect.any(Number));

    expect(ticketRepository.submitTicket).toHaveBeenCalledTimes(1);
    expect(ticketRepository.submitTicket).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 50,
        description: "lunch",
        username: "Harry",
      })
    );
  });
});
