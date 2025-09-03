const dynamoDB = {
  put: jest.fn(() => ({
    promise: jest.fn()
  })),
  get: jest.fn(() => ({
    promise: jest.fn()
  }))
};

module.exports = dynamoDB;