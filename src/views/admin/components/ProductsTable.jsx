/* eslint-disable react/forbid-prop-types */
import PropType from 'prop-types';
import React from 'react';
import { ProductItem } from '.';

const ProductsTable = ({ filteredProducts }) => (
  <div>
    {filteredProducts.length > 0 && (
      <div className="grid grid-product grid-count-6">
        <div className="grid-col">
          <h5>Imagem</h5>
        </div>
        <div className="grid-col">
          <h5>Descrição</h5>
        </div>
        <div className="grid-col">
          <h5>Marca</h5>
        </div>
        <div className="grid-col">
          <h5>Preço</h5>
        </div>
        <div className="grid-col">
          <h5>Data Cadastro</h5>
        </div>
        <div className="grid-col">
          <h5>Qtd</h5>
        </div>
      </div>
    )}
    {filteredProducts.length === 0 ? new Array(10).fill({}).map((product, index) => (
      <ProductItem
        // eslint-disable-next-line react/no-array-index-key
        key={`product-skeleton ${index}`}
        product={product}
      />
    )) : filteredProducts.map((product) => (
      <ProductItem
        key={product.id}
        product={product}
      />
    ))}
  </div>
);

ProductsTable.propTypes = {
  filteredProducts: PropType.array.isRequired
};

export default ProductsTable;
