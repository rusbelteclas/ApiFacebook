const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const MicrosoftStrategy = require('passport-microsoft').Strategy;

// Configuración de la estrategia de autenticación de Facebook
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: '/auth/facebook/callback'
},
function(accessToken, refreshToken, profile, done) {
  // Lógica para la autenticación con Facebook
  // ...
}));

// Configuración de la estrategia de autenticación de Microsoft
passport.use(new MicrosoftStrategy({
  clientID: process.env.MICROSOFT_APP_ID,
  clientSecret: process.env.MICROSOFT_APP_SECRET,
  callbackURL: '/auth/microsoft/callback'
},
function(accessToken, refreshToken, profile, done) {
  // Lógica para la autenticación con Microsoft
  // ...
}));
