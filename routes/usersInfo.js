const router = require("express").Router();
const { User } = require("../models/user");

router.get("/name", async (req, res) => {
  User.findById(req.user._id)
    .exec()
    .then(async () => {
      const user = await User.findById(req.user._id);
      res.status(200).send({ data: user, message: "Nazwa użytkownika" });
    })
    .catch((error) => {
      res.status(500).send({ message: error.message });
    });
});

router.post("/updateMoney", async (req, res) => {
  try {
    User.findById(req.user._id)
      .exec()
      .then(() => {
        User.findById(req.user._id);
      })
      .catch((error) => {
        res.status(500).send({ message: error.message });
      });
  } catch (error) {
    res.status(500).send({ message: "Wewnętrzny błąd serwera!" });
  }
});

module.exports = router;
