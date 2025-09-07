class User {
  constructor({ userName, role = "employee" }) {
    if (!userName) throw new Error("userName is required");
    this.userName = userName;
    this.role = role;
    this.createdAt = Date.now(); 
  }
}

module.exports = User;