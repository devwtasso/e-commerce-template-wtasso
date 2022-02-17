import { ADMIN_PRODUCTS } from 'constants/routes';
import React from 'react';
import { NavLink } from 'react-router-dom';

import { BsBox } from 'react-icons/bs';

const SideNavigation = () => (
  <aside className="sidenavigation">
    <div className="sidenavigation-wrapper">
      <div className="sidenavigation-item">
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu"
          to={ADMIN_PRODUCTS}
          style={{ display: 'flex', gap: '8px' }}
        >
          <BsBox />
          Produtos
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <h4 className="sidenavigation-menu my-0">Usuários</h4>
      </div>
    </div>
  </aside>
);

export default SideNavigation;
