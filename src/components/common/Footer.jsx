import * as Route from 'constants/routes';
import logo from 'images/logo-full.png';
import React from 'react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const { pathname } = useLocation();

  const visibleOnlyPath = [
    Route.HOME,
    Route.SHOP
  ];

  return !visibleOnlyPath.includes(pathname) ? null : (
    <footer className="footer">
      <div className="footer-col-1">
        <strong>
          <span>
            Desenvolvido por
            {' '}
            <a href="https://wtasso.com.br">Grupo WTasso</a>
          </span>
        </strong>
      </div>
      <div className="footer-col-2">
        <img alt="Footer logo" className="footer-logo" src="https://wtasso.com.br/wp-content/uploads/2021/04/logo-deitado-geral.png" />
        <h5>
          &copy;&nbsp;
          {new Date().getFullYear()}
        </h5>
      </div>
      <div className="footer-col-3">
        <strong>
          <span>
            Entre em contato conosco &nbsp;
            <a href="https://wtasso.com.br">clicando aqui</a>
          </span>
        </strong>
      </div>
    </footer>
  );
};

export default Footer;
