const db = require("../../data/db-config");

async function getAll() {
  return await db("showroomlar");
}

async function getById(showroom_id) {
  return await db("showroomlar").where("showroom_id", showroom_id).first();
}

async function create(showroom) {
  let showroom_id = await db("showroomlar").insert(showroom);
  return getById(showroom_id[0]);
}

async function update(showroom_id, showroom) {
  await db("showroomlar").where("showroom_id", showroom_id).update(showroom);
  return getById(showroom_id);
}

async function remove(showroom_id) {
  await db("showroomlar").where("showroom_id", showroom_id).del();
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
