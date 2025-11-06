require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fraseRoutes = require("./src/routes/fraseRoutes");
const usuarioRoutes = require("./src/routes/usuarioRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/frases", fraseRoutes);
app.use("/api/usuarios", usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
