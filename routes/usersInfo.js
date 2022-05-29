const router = require("express").Router();
const { User } = require("../models/user");
const { Expense } = require("../models/expense");

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
  User.findOneAndUpdate(
    { _id: req.user._id },
    { money: req.body.money },
    { new: true },
    (err, doc) => {
      if (!err) {
        console.log("Edytowano");
      } else {
        res.status(500).send({ message: error.message });
      }
    }
  );
});

router.post("/addExpense", async (req, res) => {
  try {
    await new Expense({ ...req.body, userId: req.user._id }).save();
    res.status(201).send({ message: "Dodano wydatek" });
  } catch (error) {
    res.status(500).send({ message: "Wewnętrzny błąd serwera" });
  }
});

module.exports = router;
