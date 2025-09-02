-- Crear base de datos para la tienda de vapes
CREATE DATABASE IF NOT EXISTS vape_store;
USE vape_store;

-- Tabla de categorías
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  stock INT DEFAULT 0,
  category_id INT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Insertar categorías iniciales
INSERT INTO categories (name, description) VALUES 
('Dispositivos', 'Vapes, pods y dispositivos electrónicos'),
('Líquidos', 'E-liquids y jugos para vapear'),
('Accesorios', 'Repuestos, baterías y accesorios');

-- Insertar productos de ejemplo
INSERT INTO products (name, description, price, stock, category_id, image_url) VALUES 
('Vape Pod Elite', 'Dispositivo premium con batería de larga duración', 89.99, 15, 1, '/placeholder.svg?height=200&width=200'),
('Liquid Mango Tropical', 'Sabor tropical intenso, 50ml', 24.99, 30, 2, '/placeholder.svg?height=200&width=200'),
('Coil Pack x5', 'Pack de 5 resistencias compatibles', 19.99, 25, 3, '/placeholder.svg?height=200&width=200'),
('Vape Mod Pro', 'Mod avanzado con control de temperatura', 149.99, 8, 1, '/placeholder.svg?height=200&width=200'),
('Liquid Mint Fresh', 'Menta refrescante, 30ml', 22.99, 20, 2, '/placeholder.svg?height=200&width=200');
