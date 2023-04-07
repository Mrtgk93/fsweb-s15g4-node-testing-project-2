/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const defShowroomlar = [
  { showroom_adi: "Borusan İstinye", lokasyon: "Sarıyer", marka: "BMW" },
  {
    showroom_adi: "Koluman İstanbul Büyükdere",
    lokasyon: "Şişli",
    marka: "MERCEDES-BENZ",
  },

  { showroom_adi: "Doğuş Oto Maslak", lokasyon: "Maslak", marka: "AUDİ" },
];
const defArabalar = [
  { araba_modeli: "Bmw i4 m50", araba_fiyati: 4286500, showroom_id: 1 },
  {
    araba_modeli: "Bmw 430i xDrive Coupe",
    araba_fiyati: 3414600,
    showroom_id: 1,
  },
  {
    araba_modeli: "Audi RS e-tron GT quattro",
    araba_fiyati: 6602730,
    showroom_id: 3,
  },
  {
    araba_modeli: "Mercedes-AMG GT 63 S E performance FL",
    araba_fiyati: 16141834,
    showroom_id: 2,
  },
];
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("showroomlar").truncate();
  await knex("showroomlar").insert(defShowroomlar);

  await knex("arabalar").truncate();
  await knex("arabalar").insert(defArabalar);
};
