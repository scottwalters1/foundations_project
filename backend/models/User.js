class User {
  constructor({ username, password, role = "employee" }) {
    if (!username) throw new Error("username is required");
    this.username = username;
    this.password = password;
    this.role = role;
    this.createdAt = Date.now(); 
  }
}

module.exports = User;