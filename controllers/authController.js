// Authentication and authorization controllers

const request = require('request-promise-native');

// Check if the client is either a user or an admin
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

// Check if the client is an admin
exports.isAdmin = (req, res, next) => {
  const userEmail = req.headers.authorization;
  console.log(req.headers);

  if (userEmail) {
    const options = {
      uri: process.env.CLIENTS_URI,
      method: 'GET',
      json: true
    };

    request(options)
      .then(response => {
        const user = response.clients.find(client => {
          return (client.email === userEmail && client.role === 'admin');
        });

        if (user) {
          next();
        } else {
          res.status(403).json({ message: 'Admin permission required' });
        }
      })
      .catch(error => {
        next(error);
      });
  } else {
    res.status(401).json({ message: 'Identification required' });
  }
};
