const router = require("express").Router();
const {
  models: { User },
} = require("../db");
const { requireToken } = require("./middleware");
module.exports = router;

// Path is /api/user/:userId
router.put("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);
    await user.update(req.body);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});
