const db = require("./data/db-config");
const server = require("./api/server");
const superTest = require("supertest");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

describe("CarsApp server test", () => {
  it("[1] Server çalışıyor mu ? /", async () => {
    const res = await superTest(server).get("/");
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ message: "Server is working" });
  }, 1000);
});

describe("Showroom testleri", () => {
  it("[2] Doğru sayıda showroom geliyor mu? /", async () => {
    const res = await superTest(server).get("/api/showroomlar");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(3);
  }, 1000);
  it("[3] Doğru showroom geliyor mu ? /", async () => {
    const res = await superTest(server).get("/api/showroomlar/1");
    expect(res.status).toBe(200);
    expect(res.body.showroom_adi).toBe("Borusan İstinye");
  }, 1000);
  it("[4] Olmayan showroom ID'si verildiğinde 404 hata kodu veriyor mu ? /", async () => {
    const res = await superTest(server).get("/api/showroomlar/9");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Showroom Bulunamadı");
  }, 1000);
  it("[5] Showroom ekleme doğru çalışıyor mu ? /", async () => {
    let showroom = {
      showroom_adi: "Borusan Balgat",
      lokasyon: "Balgat",
      marka: "BMW",
    };
    const res = await superTest(server).post("/api/showroomlar").send(showroom);
    expect(res.status).toBe(201);
    expect(res.body.showroom_adi).toBe("Borusan Balgat");
  }, 1000);
});

describe("Araba testleri", () => {
  it("[1] Doğru sayıda araba geliyor mu ? /", async () => {
    const res = await superTest(server).get("/api/arabalar");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(3);
  }, 1000);
  it("[7] doğru araba geliyor mu ? /", async () => {
    const res = await superTest(server).get("/api/arabalar/2");
    expect(res.status).toBe(200);
    expect(res.body.araba_modeli).toBe("Bmw 430i xDrive Coupe");
  }, 1000);
  it("[8] Olmayan bir arabanın ID'si girildiğinde 404 hata kodu veriyor mu ? /", async () => {
    let res = await superTest(server).get("/api/arabalar/25");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Araba Bulunamadı");
  }, 1000);
  it("[9] araba ekleme doğru çalışıyor mu ? /", async () => {
    let araba = {
      araba_modeli: "Bmw m6 ",
      araba_fiyati: 9286500,
      showroom_id: 1,
    };
    let res = await superTest(server).post("/api/arabalar").send(araba);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      araba_modeli: "Bmw m6 ",
      araba_fiyati: 9286500,
      showroom_id: 1,
    });
  }, 1000);
});

describe("Silme testleri ", () => {
  it("[1] araba silme testi doğru çalışıyor mu ? /", async () => {
    let res = await superTest(server).delete("/api/arabalar/2");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Araba silme işlemi başarılı");
  }, 1000);
  it("[2] Showroom silme testi doğru çalışıyor mu ? /", async () => {
    let res = await superTest(server).delete("/api/showroomlar/3");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Showroom silme işlemi başarılı");
  }, 1000);
});
