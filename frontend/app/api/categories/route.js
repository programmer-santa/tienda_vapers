import connection from "@/lib/mysql"
import { NextResponse } from "next/server"

// GET - Obtener todas las categorías
export async function GET() {
  try {
    const [rows] = await connection.execute("SELECT * FROM categories ORDER BY name")
    return NextResponse.json(rows)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ error: "Error fetching categories" }, { status: 500 })
  }
}
