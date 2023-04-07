/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  const all = knex.schema
    .createTable("showroomlar", (t) => {
      t.increments("showroom_id");
      t.string("showroom_adi").notNullable().unique();
      t.string("lokasyon").notNullable();
      t.string("marka").notNullable();
    })
    .createTable("arabalar", (t) => {
      t.increments("araba_id");
      t.string("araba_modeli").notNullable().unique();
      t.integer("araba_fiyati").unsigned().notNullable();
      t.integer("showroom_id")
        .references("showroom_id")
        .inTable("showroomlar")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
  return all;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("arabalar")
    .dropTableIfExists("showroomlar");
};
