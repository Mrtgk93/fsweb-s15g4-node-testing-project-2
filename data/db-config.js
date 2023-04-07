const knex = require("knex");
const config = require("../knexfile");

const environment = process.env.CURRENT_ENV || "development";

module.exports = knex(config[environment]);
