/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
import { AppliedFilters, ProductGrid, ProductList } from 'components/product';
import { useDocumentTitle, useScrollTop } from 'hooks';
import React, { useState, useEffect } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import { applyFilter, resetFilter } from 'redux/actions/filterActions';
import { selectFilter } from 'selectors/selector';
import styled from 'styled-components';

const Sidebar = styled.aside`
  width: 250px;
  display: flex;
  flex-direction: column;
  margin-right: 2rem;
  border-radius: .8rem;
  background: #fff;
  padding-left: 2rem;

  max-height: 250px;

  h2 {
    font-weight: bold;
    text-transform: uppercase;
  }

  ul {
    margin-top: -5px;
    padding: 0;
  }

  ul > li {
    list-style-type: none;
    font-size: 1.5rem;
    cursor: pointer;
    line-height: 4rem;   
  }

  ul > li:hover {
    font-size: 1.7rem;
  }
  
  ul > li.active {
    color: red;
  }

  ul > li.active:before {
    content: ' ✔ ';
  }
`;

const Shop = () => {
  useDocumentTitle('Loja | Grupo WTasso');
  useScrollTop();

  const { filter, isLoading, products } = useSelector((state) => ({
    filter: state.filter,
    isLoading: state.app.loading,
    products: state.products.items
  }));

  const dispatch = useDispatch();

  const filtrosCategorias = ['Todos', 'Sites'];
  const filtrosOrdenacao = [
    { title: 'Menor preço', value: 'price-asc' },
    { title: 'Maior preço', value: 'price-desc' },
    { title: 'A-Z', value: 'name-asc' },
    { title: 'Z-A', value: 'name-desc' }
  ];

  const [isActiveCategorias, setActiveCategorias] = useState(false);
  const [isActiveOrdenacao, setActiveOrdenacao] = useState(false);

  const store = useSelector((state) => ({
    filteredProducts: selectFilter(state.products.items, state.filter),
    products: state.products,
    requestStatus: state.app.requestStatus,
    isLoading: state.app.loading
  }), shallowEqual);

  const [field, setField] = useState({
    brand: filter.brand,
    minPrice: filter.minPrice,
    maxPrice: filter.maxPrice,
    sortBy: 'price-asc'
  });


  const onApplyFilter = () => {
    dispatch(applyFilter(field));
  };

  const onSortFilterChange = (e) => {
    setField({ ...field, sortBy: e.currentTarget.dataset.id });
    setActiveOrdenacao(e.target.innerHTML);
  };

  useEffect(() => {
    const isChanged = Object.keys(field).some((key) => field[key] !== filter[key]);

    if (isChanged) {
      onApplyFilter();
    }
  }, [field]);

  useEffect(() => {
    setActiveCategorias('Todos');
    setActiveOrdenacao('Menor preço');
  }, []);

  return (
    <main className="content" style={{ marginTop: '1rem' }}>
      <Sidebar>
        {/* <h2>Categorias</h2>

        <ul>
          {
            filtrosCategorias.map((filtro) => (
              <li key={filtro} className={isActiveCategorias === filtro ? 'active' : ''} onClick={() => setActiveCategorias(filtro)}>{filtro}</li>
            ))
          }
        </ul> */}

        <h2>Ordenar por</h2>
        <ul>
          {
            filtrosOrdenacao.map((filtro) => (
              <li key={filtro.value} className={isActiveOrdenacao === filtro.title ? 'active' : ''} onClick={onSortFilterChange} data-id={filtro.value}>{filtro.title}</li>
            ))
          }
        </ul>
      </Sidebar>
      <section className="product-list-wrapper">
        {/* <AppliedFilters filteredProductsCount={store.filteredProducts.length} /> */}
        <ProductList {...store}>
          <ProductGrid products={store.filteredProducts} />
        </ProductList>
      </section>
    </main>
  );
};

export default Shop;
