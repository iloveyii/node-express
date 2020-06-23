"use strict";
exports.__esModule = true;
var express_1 = require("express");
var list_1 = require("../controllers/list");
var router = express_1["default"].Router();
router.route("/")
    .get(list_1.getList)
    .post(list_1.addList)["delete"](list_1.deleteList)
    .put(list_1.updateList);
exports["default"] = router;
