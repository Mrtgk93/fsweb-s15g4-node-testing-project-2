const arabaModel = require("./arabalar-model");

async function arabaIdKontrol(req, res, next) {
  try {
    const existAraba = await arabaModel.getById(req.params.id);
    if (!existAraba) {
      res.status(404).json({ message: "Araba Bulunamadı" });
    } else {
      req.Araba = existAraba;
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function arabaPayloadKontrol(req, res, next) {
  try {
    let { araba_modeli, araba_fiyati, showroom_id } = req.body;
    if (!araba_modeli || !araba_fiyati || !showroom_id) {
      res.status(400).json({ message: "eksik alanları kontrol ediniz!.." });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { arabaIdKontrol, arabaPayloadKontrol };
