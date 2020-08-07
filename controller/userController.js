const database = require("../database");
const { validationResult } = require("express-validator");
const { asyncQuery } = require("../helper/queryHelp");

module.exports = {
  register: async (req, res) => {
    const { username, password, email } = req.body;
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(422).send({ errors: error.array() });
    }

    try {
      const checkUser = `SELECT * FROM users WHERE username = ${database.escape(
        username
      )} OR email =${database.escape(email)}`;
      const resultCheck = await asyncQuery(checkUser);

      if (resultCheck.length > 0) {
        return res.status(400).send("Username or email already used");
      }

      const addUser = `INSERT INTO users (username,password,email,role, status) values(${database.escape(
        username
      )}, ${database.escape(password)}, ${database.escape(email)}, 'user', 1)`;
      const resultAdd = await asyncQuery(addUser);

      const new_user_id = resultAdd.insertId;

      const addprofile = `INSERT INTO profil (user_id) values(${new_user_id})`;
      const resultAddProf = await asyncQuery(addprofile);

      res.status(200).send(resultAddProf);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  login: async (req, res) => {
    const { username, password, email } = req.body;
    try {
      let login = "";
      if (username === undefined) {
        login += `SELECT * FROM users WHERE  email = ${database.escape(email)}
            AND password = ${database.escape(password)}`;
      } else if (email === undefined) {
        login += `SELECT * FROM users WHERE username = ${database.escape(
          username
        )} 
            AND password = ${database.escape(password)}`;
      }

      const result = await asyncQuery(login);
      if (result.length === 0) {
        return res.status(400).send("Invalid username, email, or password!");
      }
      if (result[0].status !== 1) {
        return res.status(400).send("User status not active!");
      }
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  deactive: async (req, res) => {
    const Id = parseInt(req.params.id);
    try {
      const checkId = `SELECT * FROM users WHERE id = ${database.escape(Id)}`;
      const resultCheck = await asyncQuery(checkId);

      if (resultCheck.length === 0) {
        return res.status(400).send(`User with id = ${Id} doesn\'t exist`);
      }
      if (resultCheck[0].status === 3) {
        return res.status(400).send(`User has closed`);
      }

      const deactive = `UPDATE users SET status = 2 WHERE id = ${database.escape(
        Id
      )}`;
      const result = await asyncQuery(deactive);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  close: async (req, res) => {
    const Id = parseInt(req.params.id);
    try {
      const checkId = `SELECT * FROM users WHERE id = ${database.escape(Id)}`;
      const resultCheck = await asyncQuery(checkId);

      if (resultCheck.length === 0) {
        return res.status(400).send(`User with id = ${Id} doesn\'t exist`);
      }

      const close = `UPDATE users SET status = 3 WHERE id = ${database.escape(
        Id
      )}`;
      const result = await asyncQuery(close);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  active: async (req, res) => {
    const Id = parseInt(req.params.id);
    try {
      const checkId = `SELECT * FROM users WHERE id = ${database.escape(Id)}`;
      const resultCheck = await asyncQuery(checkId);

      if (resultCheck.length === 0) {
        return res.status(400).send(`User with id = ${Id} doesn\'t exist`);
      }

      if (resultCheck[0].status === 3) {
        return res.status(400).send(`User has closed, cannot activate user!`);
      }

      const activate = `UPDATE users SET status = 1 WHERE id = ${database.escape(
        Id
      )}`;
      const result = await asyncQuery(activate);
      res.status(200).send(result);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
