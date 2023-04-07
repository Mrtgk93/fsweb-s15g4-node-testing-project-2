const router = require("express").Router();
const arabaModel = require("./arabalar-model");
const {
  arabaIdKontrol,
  arabaPayloadKontrol,
} = require("./arabalar-middleware");

router.get("/", async (req, res, next) => {
  const allCars = await arabaModel.getAll();
  res.json(allCars);
});

router.get("/:id", arabaIdKontrol, async (req, res, next) => {
  try {
    res.json(req.Araba);
  } catch (error) {
    next(error);
  }
});
router.post("/", arabaPayloadKontrol, async (req, res, next) => {
  try {
    const inserted = await arabaModel.create({
      araba_modeli: req.body.araba_modeli,
      araba_fiyati: req.body.araba_fiyati,
      showroom_id: req.body.showroom_id,
    });
    res.status(201).json(inserted);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  arabaIdKontrol,
  arabaPayloadKontrol,
  async (req, res, next) => {
    try {
      let updatedCar = await arabaModel.update(req.params.id, {
        araba_modeli: req.body.araba_modeli,
        araba_fiyati: req.body.araba_fiyati,
        showroom_id: req.body.showroom_id,
      });
      res.json(updatedCar);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", arabaIdKontrol, async (req, res, next) => {
  try {
    await arabaModel.remove(req.params.id);
    res.json({ message: "Araba silme işlemi başarılı" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
