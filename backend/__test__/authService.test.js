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

    expect(logger.info).toHaveBeenCalledWith(`Creating new user: ${user.username}`);
    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(userRepository.createUser).toHaveBeenCalledWith(expect.objectContaining({
      username: "exampleUsername",
    }));
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

    expect(logger.info).toHaveBeenCalledWith(`Creating new user: ${user.username}`);
    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(userRepository.createUser).toHaveBeenCalledWith(expect.objectContaining({
      username: "exampleUsername",
    }));
    expect(userRepository.createUser).toHaveBeenCalledTimes(1);
  });

  test("Given a username which already exists in DB, register should return null", async () => {
    userRepository.getUserByUsername.mockResolvedValue({
      createdAt: 1757705534436,
      username: "Alice",
      role: "employee",
    });
    let user = {
      username: "Alice",
      password: "AlicesPassword",
    };

    let registeredUser = await authService.register(user);
    expect(registeredUser).toBe(null);

    expect(logger.info).toHaveBeenCalledWith("Username already registered");
    expect(logger.info).toHaveBeenCalledTimes(1);
    expect(userRepository.getUserByUsername).toHaveBeenCalledWith("Alice");
    expect(userRepository.getUserByUsername).toHaveBeenCalledTimes(1);
  });

  test("Given invalid username or password, register should return null", async () => {
    let user = {
      username: "Alice",
      password: "",
    };

    let registeredUser = await authService.register(user);
    expect(registeredUser).toBe(null);

    user = {
      username: "",
      password: "AlicesPassword",
    };

    registeredUser = await authService.register(user);
    expect(registeredUser).toBe(null);

    expect(logger.info).toHaveBeenCalledWith(
      `Invalid username or password: ${JSON.stringify(user)}`
    );
    expect(logger.info).toHaveBeenCalledTimes(2);
  });
});
