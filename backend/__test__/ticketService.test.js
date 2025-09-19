const ticketRepository = require("../repositories/ticketRepository");
const ticketService = require("../services/ticketService");
const { logger } = require("../util/logger");

// Whenever something requires userRepo, give it a mocked version
jest.mock("../repositories/ticketRepository");
jest.mock("../util/logger");

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
      {
        amount: 120,
        username: "Bob",
        description: "office supplies",
        ticketId: "f19a2e7d-2e01-4e7c-8b19-123456789abc",
        status: "denied",
      },
      {
        amount: 300,
        username: "Charlie",
        description: "team lunch",
        ticketId: "aabbccdd-1122-3344-5566-77889900aabb",
        status: "pending",
      },
    ];

    ticketRepository.getTicketsByUsername.mockResolvedValue(mockTickets);

    const result = await ticketService.getTicketsByUsername("Alice");
    const expectedTickets = mockTickets.filter(
      (ticket) => ticket.username === "Alice"
    );

    expect(result.filter((t) => t.username === "Alice")).toEqual(
      expectedTickets
    );
    expect(ticketRepository.getTicketsByUsername).toHaveBeenCalledTimes(1);
    expect(ticketRepository.getTicketsByUsername).toHaveBeenCalledWith("Alice");
  });

  test("getTicketsByStatus should return only tickets matching the given status", async () => {
    const mockTickets = [
      { ticketId: "1", status: "pending", username: "Alice" },
      { ticketId: "2", status: "pending", username: "Bob" },
      { ticketId: "3", status: "approved", username: "Carol" },
      { ticketId: "4", status: "denied", username: "Dave" },
    ];

    ticketRepository.getTicketsByStatus.mockImplementation(async (status) => {
      return mockTickets.filter((ticket) => ticket.status === status);
    });

    const tickets = await ticketService.getTicketsByStatus("pending");
    expect(tickets).toEqual([
      { ticketId: "1", status: "pending", username: "Alice" },
      { ticketId: "2", status: "pending", username: "Bob" },
    ]);

    expect(ticketRepository.getTicketsByStatus).toHaveBeenCalledWith("pending");
    expect(ticketRepository.getTicketsByStatus).toHaveBeenCalledTimes(1);
  });

  test("getTicketByIdshould return the ticket with the given id", async () => {
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

  test("getTicketById should throw AppError if no ticket is found", async () => {
    const ticketId = "non-existent-id";
    ticketRepository.getTicketById.mockResolvedValue(null);

    const act = ticketService.getTicketById(ticketId);

    await expect(act).rejects.toMatchObject({
      message: `Ticket ${ticketId} not found`,
      statusCode: 404,
    });

    expect(ticketRepository.getTicketById).toHaveBeenCalledWith(ticketId);
    expect(ticketRepository.getTicketById).toHaveBeenCalledTimes(1);

    expect(logger.warn).toHaveBeenCalledWith(`Ticket ${ticketId} not found`);
    expect(logger.warn).toHaveBeenCalledTimes(1);
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
    const mockSubmitBody = {
      amount: 50,
      description: "lunch",
    };

    const result = await ticketService.submitTicket(mockSubmitBody, "Harry");

    expect(result).toMatchObject({
      amount: 50,
      description: "lunch",
      username: "Harry",
      status: "pending",
    });

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

    expect(logger.info).toHaveBeenCalledWith("Ticket submitted");
    expect(logger.info).toHaveBeenCalledTimes(1);
  });

  test("submitTicket should throw AppError if amount is undefined or <= 0", async () => {
    const invalidTicket = {
      amount: 0,
      description: "Lunch",
    };
    const username = "Alice";

    const ticket = ticketService.submitTicket(invalidTicket, username);

    await expect(ticket).rejects.toMatchObject({
      message: "Ticket cannot be submitted without an amount greater than 0",
      statusCode: 400,
    });

    expect(logger.warn).toHaveBeenCalledWith(
      "Ticket cannot be submitted without an amount greater than 0"
    );
    expect(logger.warn).toHaveBeenCalledTimes(1);
  });

  test("submitTicket should throw AppError if description is undefined or empty", async () => {
    // Arrange
    const invalidTicket = {
      amount: 100,
      description: "",
    };
    const username = "Alice";

    const ticket = ticketService.submitTicket(invalidTicket, username);

    await expect(ticket).rejects.toMatchObject({
      message: "Ticket cannot be submitted without a description",
      statusCode: 400,
    });

    expect(logger.warn).toHaveBeenCalledWith(
      "Ticket cannot be submitted without a description"
    );
    expect(logger.warn).toHaveBeenCalledTimes(1);
  });

  test("processTicket should update ticket with new status", async () => {
    const ticketId = "ticket3";
    const ticket = { ticketId, status: "pending" };
    const updatedTicket = { ...ticket, status: "approved" };

    ticketRepository.getTicketById.mockResolvedValue(ticket);
    ticketRepository.processTicket.mockResolvedValue(updatedTicket);

    const result = await ticketService.processTicket(ticketId, "approved");

    expect(result).toEqual(updatedTicket);
    expect(ticketRepository.getTicketById).toHaveBeenCalledWith(ticketId);
    expect(ticketRepository.processTicket).toHaveBeenCalledWith(
      ticketId,
      "approved"
    );

    expect(logger.info).toHaveBeenCalledWith("Ticket processed");
    expect(logger.info).toHaveBeenCalledTimes(1);
  });

  test("processTicket should throw AppError if ticket not found", async () => {
    const ticketId = "non-existent-id";
    ticketRepository.getTicketById.mockResolvedValue(null);

    const ticket = ticketService.processTicket(ticketId, "approved");

    await expect(ticket).rejects.toMatchObject({
      message: "Ticket not found",
      statusCode: 404,
    });
    expect(ticketRepository.getTicketById).toHaveBeenCalledWith(ticketId);

    expect(logger.warn).toHaveBeenCalledWith("Ticket not found");
    expect(logger.warn).toHaveBeenCalledTimes(1);
  });

  test("processTicket should throw AppError if ticket already processed", async () => {
    const ticketId = "ticket1";
    const ticket = { ticketId, status: "approved" }; // already processed
    ticketRepository.getTicketById.mockResolvedValue(ticket);

    const processedTicket = ticketService.processTicket(ticketId, "denied");

    await expect(processedTicket).rejects.toMatchObject({
      message: "Ticket already processed",
      statusCode: 409,
    });

    expect(logger.warn).toHaveBeenCalledWith("Ticket already processed");
    expect(logger.warn).toHaveBeenCalledTimes(1);
  });

  test("processTicket should throw AppError if newStatus is invalid", async () => {
    const ticketId = "ticket2";
    const ticket = { ticketId, status: "pending" }; // valid pending ticket
    ticketRepository.getTicketById.mockResolvedValue(ticket);

    const processedTicket = ticketService.processTicket(
      ticketId,
      "invalidStatus"
    );

    await expect(processedTicket).rejects.toMatchObject({
      message: "Invalid new status",
      statusCode: 400,
    });

    expect(logger.warn).toHaveBeenCalledWith("Invalid new status");
    expect(logger.warn).toHaveBeenCalledTimes(1);
  });
});
