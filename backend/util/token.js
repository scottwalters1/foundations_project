// Token stored here for dev purposes -
// will be in frontend eventually
// Resets on every fresh run, logging in is first step
let token = null;

function setToken(newToken) {
  token = newToken;
  console.log("Token set:", token);
}

function getToken() {
  return token;
}

module.exports = { setToken, getToken };