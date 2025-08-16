# Tienda de Vapes - Aplicación CRUD

Una aplicación web completa para gestionar una tienda de vapes con funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) y base de datos SQLite.

## Características

- ✅ **Frontend moderno**: Interfaz de usuario construida con Next.js 15 y Tailwind CSS
- ✅ **Backend robusto**: API REST con endpoints para operaciones CRUD
- ✅ **Base de datos**: SQLite con Prisma ORM para gestión de datos
- ✅ **Responsive**: Diseño adaptable para dispositivos móviles y desktop
- ✅ **Validación**: Validación de formularios y manejo de errores

## Tecnologías utilizadas

- **Frontend**: Next.js 15, React 19, Tailwind CSS, TypeScript
- **Backend**: Next.js API Routes
- **Base de datos**: SQLite con Prisma ORM
- **Gestión de paquetes**: pnpm

## Estructura del proyecto

```
vape_shop/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── products/
│   │   │       ├── route.ts          # API para listar y crear productos
│   │   │       └── [id]/
│   │   │           └── route.ts      # API para operaciones por ID
│   │   ├── components/
│   │   │   ├── ProductList.tsx       # Componente para listar productos
│   │   │   └── ProductForm.tsx       # Formulario para crear/editar productos
│   │   └── page.tsx                  # Página principal
│   └── generated/
│       └── prisma/                   # Cliente Prisma generado
├── prisma/
│   ├── schema.prisma                 # Esquema de la base de datos
│   └── migrations/                   # Migraciones de la base de datos
├── dev.db                           # Base de datos SQLite
└── package.json
```

## Instalación y configuración

### Prerrequisitos

- Node.js 18 o superior
- pnpm (recomendado) o npm

### Pasos de instalación

1. **Clonar o descargar el proyecto**
   ```bash
   cd vape_shop
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   ```

3. **Configurar la base de datos**
   ```bash
   # Generar el cliente Prisma
   npx prisma generate
   
   # Ejecutar migraciones (si es necesario)
   npx prisma migrate dev
   ```

4. **Iniciar el servidor de desarrollo**
   ```bash
   pnpm dev
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## Uso de la aplicación

### Funcionalidades principales

1. **Ver productos**: La página principal muestra todos los productos disponibles en formato de tarjetas
2. **Agregar producto**: Hacer clic en "Agregar Producto" para crear un nuevo producto
3. **Editar producto**: Hacer clic en "Editar" en cualquier producto para modificar sus datos
4. **Eliminar producto**: Hacer clic en "Eliminar" para borrar un producto (con confirmación)

### Campos del producto

- **Nombre** (requerido): Nombre del producto
- **Descripción** (opcional): Descripción detallada del producto
- **Precio** (requerido): Precio en formato numérico
- **URL de imagen** (opcional): Enlace a una imagen del producto

## API Endpoints

### Productos

- `GET /api/products` - Obtener todos los productos
- `POST /api/products` - Crear un nuevo producto
- `GET /api/products/[id]` - Obtener un producto específico
- `PUT /api/products/[id]` - Actualizar un producto
- `DELETE /api/products/[id]` - Eliminar un producto

### Ejemplo de uso de la API

```javascript
// Crear un producto
const response = await fetch('/api/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Vape Eleaf iStick Pico',
    description: 'Vape compacto y potente',
    price: 89.99,
    imageUrl: 'https://ejemplo.com/imagen.jpg'
  })
});
```

## Scripts disponibles

- `pnpm dev` - Iniciar servidor de desarrollo
- `pnpm build` - Construir para producción
- `pnpm start` - Iniciar servidor de producción
- `pnpm lint` - Ejecutar linter

## Base de datos

La aplicación utiliza SQLite como base de datos, que se almacena en el archivo `dev.db`. El esquema incluye:

### Tabla Products
- `id` (Integer, Primary Key, Auto-increment)
- `name` (String, Unique, Required)
- `description` (String, Optional)
- `price` (Float, Required)
- `imageUrl` (String, Optional)
- `createdAt` (DateTime, Auto-generated)
- `updatedAt` (DateTime, Auto-updated)

## Desarrollo

### Agregar nuevas funcionalidades

1. **Modificar el esquema de la base de datos**: Editar `prisma/schema.prisma`
2. **Crear migración**: `npx prisma migrate dev --name nombre_migracion`
3. **Actualizar la API**: Modificar los archivos en `src/app/api/`
4. **Actualizar el frontend**: Modificar los componentes en `src/app/components/`

### Comandos útiles de Prisma

```bash
# Ver la base de datos en el navegador
npx prisma studio

# Resetear la base de datos
npx prisma migrate reset

# Generar el cliente después de cambios en el esquema
npx prisma generate
```

## Despliegue

Para desplegar en producción:

1. **Construir la aplicación**
   ```bash
   pnpm build
   ```

2. **Iniciar en modo producción**
   ```bash
   pnpm start
   ```

## Solución de problemas

### Error de permisos en la base de datos
Si encuentras errores de permisos, asegúrate de que el archivo `dev.db` tenga los permisos correctos:
```bash
chmod 664 dev.db
```

### Error de compilación TypeScript
Si hay errores de tipos, regenera el cliente Prisma:
```bash
npx prisma generate
```

### Puerto en uso
Si el puerto 3000 está en uso, puedes especificar otro puerto:
```bash
PORT=3001 pnpm dev
```

## Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Soporte

Si tienes problemas o preguntas, puedes:
- Crear un issue en el repositorio
- Revisar la documentación de [Next.js](https://nextjs.org/docs)
- Consultar la documentación de [Prisma](https://www.prisma.io/docs)

