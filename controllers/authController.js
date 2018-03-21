// Authentication and authorization controllers

const request = require('request-promise-native');

// Check if the client is a user or an admin
exports.isUser = (req, res, next) => {
  const userEmail = req.headers.authorization;

  if (userEmail) {
    const options = {
      uri: process.env.CLIENTS_URI,
      method: 'GET',
      json: true
    };

    request(options)
      .then(response => {
        const user = response.clients.find(client => {
          return client.email === userEmail;
        });

        if (user) {
          next();
        } else {
          res.status(403).json({ message: 'User or Admin permission required' });
        }
      })
      .catch(error => {
        next(error);
      });
  } else {
    res.status(401).json({ message: 'Identification required' });
  }
};
