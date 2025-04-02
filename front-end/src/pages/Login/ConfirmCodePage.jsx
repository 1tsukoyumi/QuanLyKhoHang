// src/pages/ConfirmCodePage.jsx
import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  IconButton, 
  Link 
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const ConfirmCodePage = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  const handleBack = () => {
    // Điều hướng về trang quên mật khẩu nếu cần
    navigate('/login/forgot-password');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý logic xác nhận mã ở đây
    // Nếu mã xác nhận hợp lệ, điều hướng sang trang đặt lại mật khẩu hoặc trang chính
    navigate('/login/reset-password'); // hoặc navigate('/dashboard')
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
          {/* Icon mũi tên trở về */}
          <IconButton
            onClick={handleBack}
            sx={{ position: 'absolute', top: 8, left: 8 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography component="h1" variant="h5" align="center" sx={{ mt: 2 }}>
            Xác nhận mã
          </Typography>
          <Box component="form" sx={{ mt: 1 }} noValidate onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmation-code"
              label="Mã xác nhận"
              name="confirmationCode"
              autoFocus
              placeholder="Nhập mã xác nhận"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Xác nhận
            </Button>
            <Box display="flex" justifyContent="center">
              <Link href="#" variant="body2">
                Gửi lại mã?
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ConfirmCodePage;
