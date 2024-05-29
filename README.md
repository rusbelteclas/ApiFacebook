# Api de facebok 

Este proyecto incluye una API de Facebook que permite realizar diversas acciones relacionadas con la integración de Facebook en tu aplicación.

Antes de comenzar a utilizar la API de Facebook, asegúrate de seguir estos pasos de configuración:

1. **Obtén credenciales de la API de Facebook:**
   - Ve al [Portal para desarrolladores de Facebook](https://developers.facebook.com/) y crea una nueva aplicación.
   - Obtén tu `App ID` y tu `App Secret`.

2. **Configura las credenciales en tu aplicación:**
   - Abre el archivo `app.js`.
   - Reemplaza las líneas `clientID` y `clientSecret` en la configuración de la estrategia de Passport para Facebook con tus credenciales obtenidas en el paso anterior.

## Uso

Una vez que hayas configurado las credenciales de la API de Facebook en tu aplicación, puedes comenzar a utilizarla para realizar diversas acciones, como la autenticación de usuarios a través de Facebook y el acceso a datos de perfil.

Aquí hay algunos ejemplos de cómo utilizar la API de Facebook en tu aplicación:

### Autenticación con Facebook

```javascript
// Configurar la estrategia de Passport para Facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: "TuClientID",
      clientSecret: "TuClientSecret",
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["id", "displayName", "email", "name"],
    },
    (accessToken, refreshToken, profile, done) => {
      // Lógica de autenticación
    }
  )
);
