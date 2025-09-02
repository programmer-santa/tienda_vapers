import { Router } from "express";
import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from "../controllers/productoController.js";
import { getCategories } from "../controllers/categoryController.js";
import { 
    loginUsuario, 
    createUsuario, 
    getUsuarios,
    updateUsuario,
    deleteUsuario 
} from "../controllers/usuariosController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload, handleUploadErrors } from '../middlewares/uploadMiddleware.js';

const router = Router();

// Ruta de prueba principal
router.get("/", (req, res) => {
  res.send("API Santa Vape funcionando 🚀");
});

// Ruta para probar la conexión a la base de datos
router.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1 + 1 AS result");
    res.json({ message: "Conexión exitosa a MySQL 🎉", result: rows[0] });
  } catch (error) {
    console.error("Error al conectar con la BD:", error);
    res.status(500).json({ error: "Error en la conexión con la BD" });
  }
});

router.get("/products", getProducts);
router.post("/products", upload.single('image'), handleUploadErrors, createProduct);
router.put("/products/:id", upload.single('image'), handleUploadErrors, updateProduct);
router.delete("/products/:id", deleteProduct);

router.get("/categories", getCategories);

// Rutas públicas
router.post("/login", loginUsuario);
router.post("/register", createUsuario);

// Rutas protegidas
router.get("/users", authMiddleware, getUsuarios);
router.put("/users/:id", authMiddleware, updateUsuario);
router.delete("/users/:id", authMiddleware, deleteUsuario);

export default router;
