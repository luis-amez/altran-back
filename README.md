# altran-back

Simple consumption-only API for retrieving data about insurance	policies	and	company	clients.

The API is accessed from the URL: [https://altran-back.herokuapp.com/](https://altran-back.herokuapp.com/)

For authentication purposes, every call must include in its header a field `authorization: email`, where 'email' is the email of a user in the database.

## Routes list:

- `GET /user-by-id/:id` returns user with the provided id
- `GET /user-by-name/:name` returns user with the provided name
- `GET /policies-by-user-name/:name` returns the policies linked to the user with the provided name
- `GET /user-by-policy-id/:id` returns user linked to the provided policy id
