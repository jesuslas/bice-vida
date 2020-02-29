const express = require("express");
const router = express.Router();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const policy = require("./module");

router.get("/insurance/policy/cost", policy.getPolicy);
router.use("*", (_, res) => res.redirect("/insurance/policy/cost"));
app.use("/", router);

module.exports = app;
