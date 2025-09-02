import pool from "../config/db.js";
import { deleteFile } from '../middlewares/uploadMiddleware.js';

// Obtener todos los productos
export const getProducts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

// Crear un nuevo producto
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category_id } = req.body;
    let image_url = null;

    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    }

    const [result] = await pool.query(
      "INSERT INTO products (name, description, price, stock, category_id, image_url) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, price, stock, category_id, image_url]
    );

    res.json({
      success: true,
      product: {
        id: result.insertId,
        name,
        description,
        price,
        stock,
        category_id,
        image_url,
      },
    });
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ error: "Error al crear producto" });
  }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category_id } = req.body;

    // Obtener el producto actual para su imagen
    const [currentProduct] = await pool.query(
      "SELECT image_url FROM products WHERE id = ?",
      [id]
    );

    let image_url = currentProduct[0]?.image_url;

    // Si se subió una nueva imagen
    if (req.file) {
      // Eliminar la imagen anterior si existe
      if (currentProduct[0]?.image_url) {
        const oldImagePath = path.join(process.cwd(), currentProduct[0].image_url);
        await deleteFile(oldImagePath);
      }
      // Actualizar con la nueva imagen
      image_url = `/uploads/${req.file.filename}`;
    }
  try {
    const { id } = req.params;
    const { name, description, price, stock, category_id } = req.body;
    let image_url = null;

    if (req.file) {
      // Si hay una imagen anterior, la eliminamos
      const [oldProduct] = await pool.query(
        "SELECT image_url FROM products WHERE id = ?",
        [id]
      );

      if (oldProduct[0]?.image_url) {
        const oldImagePath = path.join(
          process.cwd(),
          "uploads",
          oldProduct[0].image_url
        );
        await unlink(oldImagePath).catch(console.error);
      }

      image_url = `/uploads/${req.file.filename}`;
    }

    const updateQuery = image_url
      ? "UPDATE products SET name=?, description=?, price=?, stock=?, category_id=?, image_url=? WHERE id=?"
      : "UPDATE products SET name=?, description=?, price=?, stock=?, category_id=? WHERE id=?";

    const updateParams = image_url
      ? [name, description, price, stock, category_id, image_url, id]
      : [name, description, price, stock, category_id, id];

    await pool.query(updateQuery, updateParams);

    res.json({ success: true, message: "Producto actualizado" });
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    res.status(500).json({ error: "Error al actualizar producto" });
  }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Obtener la información del producto antes de eliminarlo
    const [product] = await pool.query(
      "SELECT image_url FROM products WHERE id = ?",
      [id]
    );

    // Si el producto tiene una imagen, eliminarla
    if (product[0]?.image_url) {
      const imagePath = path.join(process.cwd(), product[0].image_url);
      await deleteFile(imagePath);
    }
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM products WHERE id=?", [id]);
    res.json({ message: "Producto eliminado" });
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    res.status(500).json({ error: "Error al eliminar producto" });
  }
};
