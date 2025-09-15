const userRepository = require("../repositories/userRepository");
const userService = require("../services/userService");

// Whenever something requires userRepo, give it a mocked version
jest.mock("../repositories/userRepository");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("User Service Tests", () => {
  test("getUserByUsername should return the user without password field", async () => {
    userRepository.getUserByUsername.mockResolvedValue({
      createdAt: 1757705534436,
      username: "Alice",
      password: "AlicesPassword",
      role: "employee",
    });

    const result = await userService.getUserByUsername({
      username: "Alice",
    });

    expect(result).toEqual({
      createdAt: 1757705534436,
      username: "Alice",
      role: "employee",
    });

    expect(userRepository.getUserByUsername).toHaveBeenCalledWith("Alice");
    expect(userRepository.getUserByUsername).toHaveBeenCalledTimes(1);
  });

  test("getUserByUsername should return null if user doesn't exist", async () => {
    userRepository.getUserByUsername.mockResolvedValue(null);

    const result = await userService.getUserByUsername({
      username: "Nonexistentuser",
    });

    expect(result).toEqual(null);

    expect(userRepository.getUserByUsername).toHaveBeenCalledWith(
      "Nonexistentuser"
    );
    expect(userRepository.getUserByUsername).toHaveBeenCalledTimes(1);
  });

  test("getUserByUsername should handle empty username", async () => {
    // userRepository.getUserByUsername.mockResolvedValue(null);

    await expect(
      userService.getUserByUsername({ username: "" })
    ).rejects.toThrow("Invalid username");
  });

  test("getUserByUsername should handle non-string username", async () => {
    // userRepository.getUserByUsername.mockResolvedValue(null);

    await expect(
      userService.getUserByUsername({ username: 1 })
    ).rejects.toThrow("Invalid username");
  });

  test("deleteUserByUsername should call repository with correct username and return result", async () => {
    userRepository.deleteUserByUsername.mockResolvedValue(true);

    const result = await userService.deleteUserByUsername({
      username: "Alice",
    });

    expect(result).toBe(true);
    expect(userRepository.deleteUserByUsername).toHaveBeenCalledWith("Alice");
    expect(userRepository.deleteUserByUsername).toHaveBeenCalledTimes(1);
  });

  test("deleteUserByUsername should handle repository returning false", async () => {
    userRepository.deleteUserByUsername.mockResolvedValue(false);

    const result = await userService.deleteUserByUsername({ username: "Bob" });

    expect(result).toBe(false);
    expect(userRepository.deleteUserByUsername).toHaveBeenCalledWith("Bob");
    expect(userRepository.deleteUserByUsername).toHaveBeenCalledTimes(1);
  });
});
