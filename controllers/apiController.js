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

// Users data by name
exports.usersByName = (req, res, next) => {
  const userName = req.params.name;

  const options = {
    uri: process.env.CLIENTS_URI,
    method: 'GET',
    json: true
  };

  request(options)
    .then(response => {
      const users = response.clients.filter(client => {
        return client.name === userName;
      });

      if (users.length > 0) {
        res.status(200).json(users);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(error => {
      next(error);
    });
};

// Policies linked to user name (firs user with that name)
exports.policiesByUserName = (req, res, next) => {
  const userName = req.params.name;

  const optionsUserRequest = {
    uri: process.env.CLIENTS_URI,
    method: 'GET',
    json: true
  };

  request(optionsUserRequest)
    .then(responseUser => {
      const user = responseUser.clients.find(client => {
        return client.name === userName;
      });

      if (user) {
        const optionsPoliciesRequest = {
          uri: process.env.POLICIES_URI,
          method: 'GET',
          json: true
        };

        request(optionsPoliciesRequest)
          .then(responsePolicy => {
            const policies = responsePolicy.policies.filter(policy => {
              return policy.email === user.email;
            });

            if (policies.length > 0) {
              res.status(200).json(policies);
            } else {
              res.status(404).json({ message: 'This user has no policies' });
            }
          })
          .catch(error => {
            next(error);
          });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(error => {
      next(error);
    });
};
