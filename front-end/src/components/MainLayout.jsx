import React from 'react';
import Header from './Header';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
