// src/pages/ForgotPasswordPage.jsx
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleBack = () => {
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Kiểm tra xem email có được nhập không
    if (email.trim() === '') {
      alert('Vui lòng nhập email!');
    } else {
      // Nếu có email, điều hướng đến trang xác nhận mã
      navigate('/login/confirm-code');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
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
            position: 'relative'
          }}
        >
          <IconButton
            onClick={handleBack}
            sx={{ position: 'absolute', top: 8, left: 8 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography component="h1" variant="h5" align="center" sx={{ mt: 2 }}>
            Quên mật khẩu
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Gửi yêu cầu
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgotPasswordPage;
