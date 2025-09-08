class User {
  constructor({ username, password, role = "employee", createdAt }) {
    if (!username) throw new Error("username is required");
    if (role !== "employee" && role !== "manager")
      throw new Error("Invalid role");
    this.username = username;
    this.password = password;
    this.role = role;
    this.createdAt = createdAt;
  }
}

module.exports = User;
