interface Product {
  id: number
  name: string
  description?: string
  price: number
  imageUrl?: string
  createdAt: string
  updatedAt: string
}

interface ProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: number) => void
}

export default function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No hay productos disponibles</div>
        <div className="text-gray-400 text-sm mt-2">Agrega tu primer producto para comenzar</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          {product.imageUrl && (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
            {product.description && (
              <p className="text-gray-600 mb-4">{product.description}</p>
            )}
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-green-600">
                ${product.price.toLocaleString()}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEdit(product)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

