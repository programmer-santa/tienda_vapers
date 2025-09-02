import connection from "@/lib/mysql"
import { NextResponse } from "next/server"

// PUT - Actualizar producto
export async function PUT(request, { params }) {
  try {
    const { id } = params
    const { name, description, price, stock, category_id, image_url } = await request.json()

    await connection.execute(
      "UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ?, image_url = ? WHERE id = ?",
      [name, description, price, stock, category_id, image_url, id],
    )

    return NextResponse.json({
      id: Number.parseInt(id),
      name,
      description,
      price,
      stock,
      category_id,
      image_url,
    })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Error updating product" }, { status: 500 })
  }
}

// DELETE - Eliminar producto
export async function DELETE(request, { params }) {
  try {
    const { id } = params
    await connection.execute("DELETE FROM products WHERE id = ?", [id])
    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Error deleting product" }, { status: 500 })
  }
}
