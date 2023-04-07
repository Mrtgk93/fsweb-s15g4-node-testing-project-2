const router = require("express").Router();
const showroomModel = require("./showroomlar-model");
const {
  showroomIdKontrol,
  showroomPayloadKontrol,
} = require("./showroomlar-middleware");

router.get("/", async (req, res, next) => {
  const allShowroom = await showroomModel.getAll();
  res.json(allShowroom);
});

router.get("/:id", showroomIdKontrol, async (req, res, next) => {
  try {
    res.json(req.Showroom);
  } catch (error) {
    next(error);
  }
});

router.post("/", showroomPayloadKontrol, async (req, res, next) => {
  try {
    const inserted = await showroomModel.create({
      showroom_adi: req.body.showroom_adi,
      lokasyon: req.body.lokasyon,
      marka: req.body.marka,
    });
    res.status(201).json(inserted);
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:id",
  showroomIdKontrol,
  showroomPayloadKontrol,
  async (req, res, next) => {
    try {
      let updatedShowroom = await showroomModel.update(req.params.id, {
        showroom_adi: req.body.showroom_adi,
        lokasyon: req.body.lokasyon,
        marka: req.body.marka,
      });
      res.json(updatedShowroom);
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", showroomIdKontrol, async (req, res, next) => {
  try {
    await showroomModel.remove(req.params.id);
    res.json({ message: "Showroom silme işlemi başarılı" });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
