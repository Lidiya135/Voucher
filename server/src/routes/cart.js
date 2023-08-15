const express = require("express");
const router = express.Router();
const { CartController } = require("../controllers/cart");

router.get("/", CartController.getCart);
router.get("/tot", CartController.get);
router.get("/:id",CartController.getCartById);
router.post("/", CartController.insert);
router.put("/:id", CartController.update);
router.delete("/:id", CartController.delete);
router.delete("/", CartController.deletee);

module.exports = router;