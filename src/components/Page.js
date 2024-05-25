import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const products = [
  {
    id: 1,
    name: 'Levi T-Shirt',
    imageUrl: 'https://m.media-amazon.com/images/I/71vHPvwE3eL._AC_UY1100_.jpg',
    sizes: [
      { size: 'M', price: 20 },
      { size: 'L', price: 20 },
      { size: 'XL', price: 20 },
    ],
  },
  {
    id: 2,
    name: 'US Polo Jeans',
    imageUrl: 'https://m.media-amazon.com/images/I/71vHPvwE3eL._AC_UY1100_.jpg',
    sizes: [
      { size: 'M', price: 40 },
      { size: 'L', price: 40 },
      { size: 'XL', price: 40 },
    ],
  },
];

export default function Page() {
  const [selectedSize, setSelectedSize] = useState('');
  const [cart, setCart] = useState([]);
  const [selectedProductSizes, setSelectedProductSizes] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = product.sizes[0].size; // Default to first size
      return acc;
    }, {})
  );

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  const handleProductSizeChange = (productId, size) => {
    setSelectedProductSizes((prevSelectedSizes) => ({
      ...prevSelectedSizes,
      [productId]: size,
    }));
  };

  const handleAddToCart = (product) => {
    const size = selectedProductSizes[product.id];
    const sizeInfo = product.sizes.find((s) => s.size === size);
    const existingProduct = cart.find(
      (item) => item.id === product.id && item.size === size
    );
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, size: size, price: sizeInfo.price, quantity: 1 }]);
    }
  };

  const filteredProducts = selectedSize
    ? products.map((product) => ({
        ...product,
        sizes: product.sizes.filter((size) => size.size === selectedSize),
      })).filter(product => product.sizes.length > 0)
    : products;

  return (
    <div className="container">
      <h1 className="my-4">Products</h1>
      <div className="mb-4">
        <label htmlFor="size" className="form-label">Filter by size:</label>
        <select id="size" value={selectedSize} onChange={handleSizeChange} className="form-select">
          <option value="">All</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>
      </div>
      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={product.imageUrl} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <div className="mb-2">
                  <label htmlFor={`size-${product.id}`} className="form-label">Select size:</label>
                  <select
                    id={`size-${product.id}`}
                    value={selectedProductSizes[product.id]}
                    onChange={(e) => handleProductSizeChange(product.id, e.target.value)}
                    className="form-select"
                  >
                    {product.sizes.map((size) => (
                      <option key={size.size} value={size.size}>
                        {size.size} - ${size.price}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="btn btn-primary" onClick={() => handleAddToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h2 className="my-4">Cart</h2>
      <div>
        {cart.map((item, index) => (
          <div key={index} className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={item.imageUrl} className="img-fluid rounded-start" alt={item.name} />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Size: {item.size}</p>
                  <p className="card-text">Price: ${item.price}</p>
                  <p className="card-text">Quantity: {item.quantity}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        {
           /*total price */
              cart.length > 0 && (
                <div className="card">
                  <div className="card-body">
                 <h5 className="card-title">Total Price</h5>
                 <p className="card-text">
                    ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                 </p>
                  </div>
                </div>
                ) 
        }
      </div>
    </div>
  );
}
