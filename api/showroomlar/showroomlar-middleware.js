const showroomModel = require("./showroomlar-model");

async function showroomIdKontrol(req, res, next) {
  try {
    const existShowroom = await showroomModel.getById(req.params.id);
    if (!existShowroom) {
      res.status(404).json({ message: "Showroom Bulunamadı" });
    } else {
      req.Showroom = existShowroom;
      next();
    }
  } catch (error) {
    next(error);
  }
}

async function showroomPayloadKontrol(req, res, next) {
  try {
    let { showroom_adi, lokasyon, marka } = req.body;
    if (!showroom_adi || !lokasyon || !marka) {
      res.status(400).json({ message: "eksik alanları kontrol ediniz!.." });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { showroomIdKontrol, showroomPayloadKontrol };
