// API Controllers

const request = require('request-promise-native');

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

// User data by user name
exports.userByName = (req, res, next) => {
  const userName = req.params.name;

  const options = {
    uri: process.env.CLIENTS_URI,
    method: 'GET',
    json: true
  };

  request(options)
    .then(response => {
      const user = response.clients.find(client => {
        return client.name === userName;
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

// Policies linked to user name
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

// User linked to policy number
exports.userByPolicyId = (req, res, next) => {
  const policyId = req.params.id;

  const optionsPoliciesRequest = {
    uri: process.env.POLICIES_URI,
    method: 'GET',
    json: true
  };

  request(optionsPoliciesRequest)
    .then(responsePolicy => {
      const policy = responsePolicy.policies.find(policyElem => {
        return policyElem.id === policyId;
      });

      if (policy) {
        const optionsUserRequest = {
          uri: process.env.CLIENTS_URI,
          method: 'GET',
          json: true
        };

        request(optionsUserRequest)
          .then(responseUser => {
            const user = responseUser.clients.find(client => {
              return client.email === policy.email;
            });

            if (user) {
              res.status(200).json(user);
            } else {
              res.status(404).json({ message: 'This policy is linked to a non-existent user' });
            }
          })
          .catch(error => {
            next(error);
          });
      } else {
        res.status(404).json({ message: 'Policy not found' });
      }
    })
    .catch(error => {
      next(error);
    });
};
