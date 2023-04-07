const db = require("../../data/db-config");

async function getAll() {
  return await db("arabalar");
}

async function getById(araba_id) {
  return await db("arabalar").where("araba_id", araba_id).first();
}

async function create(araba) {
  let araba_id = await db("arabalar").insert(araba);
  return getById(araba_id[0]);
}

async function update(araba_id, araba) {
  await db("arabalar").where("araba_id", araba_id).update(araba);
  return getById(araba_id);
}

async function remove(araba_id) {
  await db("arabalar").where("araba_id", araba_id).del();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
