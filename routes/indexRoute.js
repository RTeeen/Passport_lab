const express = require("express");
const session = require("express-session");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const memory = require("../memory");

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", ensureAuthenticated, (req, res) => {
  res.render("admin", {
    user: req.user,
    sessionList: memory.sessions,
  });
});

router.get("/revoke", ensureAuthenticated, (req, res) => {
  memory.sessions.destroy(req.query.sid,(err)=>{
    console.log(err);
  })
  res.redirect("/admin");
});

module.exports = router;
