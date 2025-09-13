// Whenever something requires userRepo, give it a mocked version
jest.mock("../repositories/userRepository");
const userRepository = require("../repositories/userRepository");
const userService = require("../services/userService");
// maybe put in describe block

beforeEach(() => {
  jest.resetAllMocks();
});

describe("User Service Tests", () => {
  test("getUserByUsername should return the user", async () => {
    userRepository.getUserByUsername.mockResolvedValue({
      createdAt: 1757705534436,
      username: "Alice",
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
});
