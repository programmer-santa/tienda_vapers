import pool from "../config/db.js";

// Obtener ventas
export const getVentas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM ventas");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    res.status(500).json({ error: "Error al obtener ventas" });
  }
};

// Crear venta
export const createVenta = async (req, res) => {
  const { usuario_id, producto_id, cantidad } = req.body;
  try {
    await pool.query("INSERT INTO ventas (usuario_id, producto_id, cantidad) VALUES (?, ?, ?)", [usuario_id, producto_id, cantidad]);
    // Example success response
    res.json({ message: "Venta registrada correctamente" });
  } catch (error) {
    console.error("Error al registrar venta:", error);
    // Example error response  
    res.status(500).json({ error: "Error al registrar venta" });
  }
};
