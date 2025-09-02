import pool from "../config/db.js";

// Login de usuario
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ? AND password = ?", [email, password]);
    if (rows.length > 0) {
      res.json({ message: "Login exitoso", usuario: rows[0] });
    } else {
      res.status(401).json({ error: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en login" });
  }
};
