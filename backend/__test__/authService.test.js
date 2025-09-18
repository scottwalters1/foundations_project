const userRepository = require("../repositories/userRepository");
const authService = require("../services/authService");
const { logger } = require("../util/logger");

// Whenever something requires userRepo, give it a mocked version
jest.mock("../repositories/userRepository");
jest.mock("../util/logger");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Authorization Service Tests", () => {
  test("Given a unused username and a valid password with no specified role, register should return the created new user as an employee", async () => {
    userRepository.createUser.mockResolvedValue({
      username: "exampleUsername",
      password: "$2b$10$JL4MpAOQpDV9VNxqHhSkc.pSKEBUJH/XT96m5McSQd0aiuXCKlLf6",
      role: "employee",
      createdAt: 1757359194830,
    });

    let user = {
      username: "exampleUsername",
      password: "examplePassword",
    };

    let registeredUser = await authService.register(user);

    expect(registeredUser.username).toBe("exampleUsername");
    expect(registeredUser.password).toBe(
      "$2b$10$JL4MpAOQpDV9VNxqHhSkc.pSKEBUJH/XT96m5McSQd0aiuXCKlLf6"
    );
    expect(registeredUser.role).toBe("employee");

    expect(logger.info).toHaveBeenCalledWith(
      `Creating new user: ${user.username}`
    );
    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(userRepository.createUser).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "exampleUsername",
      })
    );
    expect(userRepository.createUser).toHaveBeenCalledTimes(1);
  });

  test("Given a unused username and a valid password with role specified as manager, register should return the created new user as a manager", async () => {
    userRepository.createUser.mockResolvedValue({
      username: "exampleUsername",
      password: "$2b$10$JL4MpAOQpDV9VNxqHhSkc.pSKEBUJH/XT96m5McSQd0aiuXCKlLf6",
      role: "manager",
      createdAt: 1757359194830,
    });

    let user = {
      username: "exampleUsername",
      password: "examplePassword",
    };

    let registeredUser = await authService.register(user);

    expect(registeredUser.username).toBe("exampleUsername");
    expect(registeredUser.password).toBe(
      "$2b$10$JL4MpAOQpDV9VNxqHhSkc.pSKEBUJH/XT96m5McSQd0aiuXCKlLf6"
    );
    expect(registeredUser.role).toBe("manager");

    expect(logger.info).toHaveBeenCalledWith(
      `Creating new user: ${user.username}`
    );
    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(userRepository.createUser).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "exampleUsername",
      })
    );
    expect(userRepository.createUser).toHaveBeenCalledTimes(1);
  });

  test("Given a username which already exists in DB, register should throw AppError", async () => {
    // Arrange
    userRepository.getUserByUsername.mockResolvedValue({
      createdAt: 1757705534436,
      username: "Alice",
      role: "employee",
    });

    const user = {
      username: "Alice",
      password: "AlicesPassword",
    };

    // Act
    const registerPromise = authService.register(user);

    // Assert
    await expect(registerPromise).rejects.toMatchObject({
      message: "Username already registered",
      statusCode: 400,
    });

    // Logger assertions
    expect(logger.warn).toHaveBeenCalledWith("Username already registered");
    expect(logger.warn).toHaveBeenCalledTimes(1);

    // Repository assertions
    expect(userRepository.getUserByUsername).toHaveBeenCalledWith("Alice");
    expect(userRepository.getUserByUsername).toHaveBeenCalledTimes(1);
  });

  test("Given invalid username or password, register should throw AppError", async () => {
    // Arrange
    let user = {
      username: "Alice",
      password: "",
    };

    // Act
    const registerPromise1 = authService.register(user);

    // Assert
    await expect(registerPromise1).rejects.toMatchObject({
      message: "Invalid username or password",
      statusCode: 400,
    });

    // Logger assertion
    expect(logger.warn).toHaveBeenCalledWith("Invalid username or password");

    // Next invalid case
    user = {
      username: "",
      password: "AlicesPassword",
    };

    // Act
    const registerPromise2 = authService.register(user);

    // Assert
    await expect(registerPromise2).rejects.toMatchObject({
      message: "Invalid username or password",
      statusCode: 400,
    });

    // Logger assertions
    expect(logger.warn).toHaveBeenCalledTimes(2);
  });
});
