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

module.exports = router;
