// Whenever something requires userRepo, give it a mocked version
jest.mock("../repositories/userRepository");
const userRepository = require("../repositories/userRepository");
const userService = require("../services/userService");
// maybe put in describe block

describe("User Service Tests", () => {
  test("getUserByUsername should return the user", async () => {
    userRepository.getUserByUsername.mockResolvedValue({
      username: "Alice",
    });

    const result = await userService.getUserByUsername({
      username: "Alice",
    });

    expect(result).toEqual({
      username: "Alice",
    });

    expect(userRepository.getUserByUsername).toHaveBeenCalledWith("Alice");
  });
  
//   next: test user not found
});
