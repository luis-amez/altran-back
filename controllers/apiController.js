// API Controllers

const request = require('request-promise-native');

// Default call
exports.default = (req, res) => {
  res.status(200).json({ message: 'ok' });
};

// List of clients
exports.clients = (req, res, next) => {
  const options = {
    uri: process.env.CLIENTS_URI,
    json: true
  };

  request(options)
    .then(response => {
      res.status(200).json(response);
    })
    .catch(error => {
      next(error);
    });
};
