const database = require("../database");
const util = require("util");

module.exports = {
  generateQuery: (body) => {
    let setQuery = "";
    for (let key in body) {
      setQuery += `${key} = ${database.escape(body[key])},`;
    }
    return setQuery.slice(0, -1);
  },
  asyncQuery: util.promisify(database.query).bind(database),
};
