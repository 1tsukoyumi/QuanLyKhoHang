// src/routes/AppRouter.jsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login/LoginPage';
import ForgotPasswordPage from '../pages/Login/ForgotPasswordPage';
import ConfirmCodePage from '../pages/Login/ConfirmCodePage';
import ResetPasswordPage from '../pages/Login/ResetPasswordPage';
import MainLayout from '../components/MainLayout';
import DashboardPage from '../pages/DashboardPage';
import StockInPage from '../pages/StockIn/StockInPage';
import StockOutPage from '../pages/StockOut/StockOutPage';

const AppRouter = () => {
  return (
    <Router>
      <Suspense fallback={<div>Đang tải...</div>}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/login/confirm-code" element={<ConfirmCodePage />} />
          <Route path="/login/reset-password" element={<ResetPasswordPage />} />
          <Route path="/" element={
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          } />
          <Route path="/dashboard" element={
            <MainLayout>
              <DashboardPage />
            </MainLayout>
          } />
          <Route path="/stock-in" element={
            <MainLayout>
              <StockInPage />
            </MainLayout>
          } />
          <Route path="/stock-out" element={
            <MainLayout>
              <StockOutPage />
            </MainLayout>
          } />

          <Route path="*" element={<div>Không tìm thấy trang</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
