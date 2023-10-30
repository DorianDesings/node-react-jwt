const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const port = 3000;

// Rutas

// Middlewares para cliente
app.use(cors());
app.use(express.json());

// Uso de rutas

// Clave secreta para firmar y verificar tokens
const secretKey = 'tuclaveSecretaSuperSegura';

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verifica las credenciales (esto es solo un ejemplo)
  if (username === 'dorian' && password === '123456') {
    const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
});

// Ruta protegida que verifica el token antes de responder
app.get('/protegido', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    res.json({ message: 'Ruta protegida', usuario: decoded.username });
  });
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
