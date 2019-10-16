const express = require("express");
const nunjucks = require("nunjucks");

const app = express();

nunjucks.configure("views", {
  autoscape: true,
  express: app,
  watch: true
});

app.use(express.urlencoded({ extend: false }));
app.set("view engine", "njk");

const check = (req, res, next) => {
  //middleware que checa se a informação esta no param
  const { age } = req.query;

  if (!age) {
    return res.redirect("/");
  }
  return next();
};

app.get("/", (req, res) => {
  return res.render("age");
});

app.get("/major", check, (req, res) => {
  const { age } = req.query;
  return res.render("major", { age });
});

app.get("/minor", check, (req, res) => {
  const { age } = req.query;
  return res.render("minor", { age });
});

app.post("/check", (req, res) => {
  console.log(req.body);

  const { age } = req.body;

  if (age >= 18) {
    return res.redirect(`/major?age=${age}`);
  } else {
    return res.redirect(`/minor?age=${age}`);
  }
});

app.listen(3000);
