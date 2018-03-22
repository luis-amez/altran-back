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
    method: 'GET',
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

// User data by user id
exports.userById = (req, res, next) => {
  const userId = req.params.id;

  const options = {
    uri: process.env.CLIENTS_URI,
    method: 'GET',
    json: true
  };

  request(options)
    .then(response => {
      const user = response.clients.find(client => {
        return client.id === userId;
      });

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(error => {
      next(error);
    });
};
