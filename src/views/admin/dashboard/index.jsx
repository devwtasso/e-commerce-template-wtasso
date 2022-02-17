import { useDocumentTitle, useScrollTop } from 'hooks';
import React from 'react';

const Dashboard = () => {
  useDocumentTitle('Painel Administrativo | Grupo WTasso');
  useScrollTop();

  return (
    <div className="loader">
      <h2>Bem vindo ao Painel Administrativo</h2>
    </div>
  );
};

export default Dashboard;
