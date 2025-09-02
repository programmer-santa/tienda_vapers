import connection from "@/lib/mysql"
import { NextResponse } from "next/server"

// GET - Obtener todos los productos
export async function GET() {
  try {
    const [rows] = await connection.execute(`
      SELECT p.*, c.name as category_name 
      FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id 
      ORDER BY p.created_at DESC
    `)
    return NextResponse.json(rows)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Error fetching products" }, { status: 500 })
  }
}

// POST - Crear nuevo producto
export async function POST(request) {
  try {
    const { name, description, price, stock, category_id, image_url } = await request.json()

    const [result] = await connection.execute(
      "INSERT INTO products (name, description, price, stock, category_id, image_url) VALUES (?, ?, ?, ?, ?, ?)",
      [name, description, price, stock, category_id, image_url],
    )

    return NextResponse.json({
      id: result.insertId,
      name,
      description,
      price,
      stock,
      category_id,
      image_url,
    })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Error creating product" }, { status: 500 })
  }
}
