// src/pages/ResetPasswordPage.jsx
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleBack = () => {
    // Nếu muốn quay lại trang xác nhận mã, có thể dùng:
    // navigate('/login/confirm-code');
    // Nếu không, quay về trang đăng nhập hoặc trang chủ:
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === '' || confirmPassword === '') {
      alert('Vui lòng nhập đầy đủ mật khẩu!');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('Mật khẩu không khớp. Vui lòng thử lại.');
    } else {
      alert('Mật khẩu đã thay đổi');
      // Sau khi đổi mật khẩu thành công, chuyển hướng về trang chính
      navigate('/');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            p: 4,
            backgroundColor: 'white',
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 2,
            boxShadow: 2,
            position: 'relative',
          }}
        >
          {/* Icon mũi tên trở về */}
          <IconButton
            onClick={handleBack}
            sx={{ position: 'absolute', top: 8, left: 8 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography component="h1" variant="h5" align="center" sx={{ mt: 2 }}>
            Đổi mật khẩu
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="new-password"
              label="Mật khẩu mới"
              type="password"
              name="newPassword"
              autoComplete="new-password"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirm-password"
              label="Xác nhận mật khẩu"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              placeholder="Nhập lại mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Xác nhận
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;