import React from "react";

function SellerDashboard({ products }) {
  return (
    <div>
      <h2>Seller Dashboard</h2>
      <h3>Product Management</h3>
      {products.length === 0 ? (
        <p>You haven't added any products yet.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name} - {product.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
