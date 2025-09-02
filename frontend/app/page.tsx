"use client"

import { useState, useEffect } from "react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Trash2, Edit, Plus, ShoppingCart } from "lucide-react"
import { productApi, categoryApi } from "../lib/api"

interface Product {
  id: number
  name: string
  price: number
  category_id: number
  category_name?: string
  description: string
  image_url: string
  stock: number
}

interface Category {
  id: number
  name: string
  description: string
}

interface CartItem {
  id: number
  quantity: number
}

export default function VapeStore() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category_id: "",
    description: "",
    stock: "",
    image_url: "",
  })

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await productApi.getAll()
      setProducts(data)
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const data = await categoryApi.getAll()
      setCategories(data)
    } catch (error) {
      console.error("Error loading categories:", error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, category_id: value }))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category_id: "",
      description: "",
      stock: "",
      image_url: "",
    })
  }

  const createProduct = async () => {
    try {
      const response = await productApi.create({
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
        category_id: Number.parseInt(formData.category_id),
        image_url: formData.image_url || `/placeholder.svg?height=200&width=200&query=${formData.name}`,
      })

      if (response) {
        await loadProducts()
        resetForm()
        setIsDialogOpen(false)
      }
    } catch (error) {
      console.error("Error creating product:", error)
    }
  }

  const updateProduct = async () => {
    if (!editingProduct) return

    try {
      const response = await productApi.update(editingProduct.id, {
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
        category_id: Number.parseInt(formData.category_id),
        image_url: formData.image_url || editingProduct.image_url,
      })

      if (response) {
        await loadProducts()
        resetForm()
        setEditingProduct(null)
        setIsDialogOpen(false)
      }
    } catch (error) {
      console.error("Error updating product:", error)
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      const response = await productApi.delete(id)
      if (response) {
        await loadProducts()
        setCart(cart.filter(item => item.id !== id))
      }
    } catch (error) {
      console.error("Error deleting product:", error)
    }
  }

  const openEditDialog = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category_id: product.category_id.toString(),
      description: product.description,
      stock: product.stock.toString(),
      image_url: product.image_url,
    })
    setIsDialogOpen(true)
  }

  const addToCart = (productId: number) => {
    const existingItem = cart.find(item => item.id === productId)
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === productId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ))
    } else {
      setCart([...cart, { id: productId, quantity: 1 }])
    }
  }

  const cartTotal = cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.id)
    return total + (product ? product.price * item.quantity : 0)
  }, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-slate-600">Cargando productos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">
            <Plus className="mr-2 h-4 w-4" /> Agregar Producto
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Editar" : "Nuevo"} Producto</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Nombre</Label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Precio</Label>
              <Input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>URL de la imagen</Label>
              <Input
                name="image_url"
                value={formData.image_url}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Categoría</Label>
              <Select 
                value={formData.category_id} 
                onValueChange={handleSelectChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Stock</Label>
              <Input
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label>Descripción</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <Button 
              onClick={editingProduct ? updateProduct : createProduct}
              disabled={!formData.name || !formData.price || !formData.category_id}
            >
              {editingProduct ? "Actualizar" : "Crear"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{product.name}</span>
                  <Badge>{product.category_name}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={product.image_url || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-lg font-bold">${product.price}</p>
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  onClick={() => addToCart(product.id)}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Agregar al carrito
                </Button>
                <Button variant="outline" onClick={() => openEditDialog(product)}>
                  <Edit className="mr-2 h-4 w-4" /> Editar
                </Button>
                <Button variant="destructive" onClick={() => deleteProduct(product.id)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="fixed bottom-0 right-0 m-4 p-4 bg-white shadow-lg rounded-lg">
          <h3 className="text-lg font-bold mb-2">Carrito</h3>
          <p className="text-xl">Total: ${cartTotal.toFixed(2)}</p>
        </div>
      )}
    </div>
  )
}
