import React, { useState } from "react";

function ProductFilter({ onFilter }) {
  const [priceRange, setPriceRange] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilter(priceRange);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Price Range:
        <select
          value={priceRange}
          onChange={(event) => setPriceRange(event.target.value)}
        >
          <option value="">All</option>
          <option value="under-10">Under $10</option>
          <option value="10-50">$10 - $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="over-100">Over $100</option>
        </select>
      </label>
      <button type="submit">Filter</button>
    </form>
  );
}

export default ProductFilter;
