/*const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const path = require("path");
const bodyParser = require("body-parser");
const FacebookStrategy = require("passport-facebook").Strategy;
const MicrosoftStrategy = require("passport-microsoft").Strategy;
const app = express();
const secretKey = "";*/

// Configuración de las vistas
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configuración de Passport
/*passport.use(
  new FacebookStrategy(
    {
      clientID: "",
      clientSecret: "",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "displayName", "email", "name"],
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = { id: id, displayName: "Rusbel" };
  done(null, user);
});

passport.use(
  new MicrosoftStrategy(
    {
      clientID: "",
      clientSecret: "",
      callbackURL: "http://localhost:3000/auth/microsoft/callback",
      responseType: "code",
      responseMode: "form_post",
      prompt: "select_account",
      scope: ["user.read", "calendars.read", "mail.read", "offline_access"],
      authorizationURL:
        "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
      tokenURL: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
    }
  )
);

app.use(
  session({
    secret: "",
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: "mongodb://localhost:27017/apifacebook",
      collection: "sessions",
      ttl: 24 * 60 * 60,
      autoRemove: "native",
      autoRemoveInterval: 60 * 60,
    }),
  })
);*/

app.use(passport.initialize());
app.use(passport.session());

app.get("/auth/facebook", passport.authenticate("facebook"));
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/",
  })
);

app.get("/auth/microsoft", (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout();
  }

  passport.authenticate("microsoft", { prompt: "select_account" })(
    req,
    res,
    next
  );
});

app.get(
  "/auth/microsoft/callback",
  passport.authenticate("microsoft", {
    failureRedirect: "/",
    session: false,
  }),
  (req, res) => {
    res.render("profile", { user: req.user });
  }
);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("profile", { user: req.user });
  } else {
    res.redirect("/");
  }
});

app.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.error(err);
      return res.redirect("/");
    }

    res.redirect("/");
  });
});

///////////////////////////////////////////////////////////////////////////////////////

/*app.post('/submit', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const user = { name: name, email: email };

  res.render('profile', { user: user });
});*/

app.listen(3000, () => {
  console.log("Servidor iniciado en http://localhost:3000");
});
