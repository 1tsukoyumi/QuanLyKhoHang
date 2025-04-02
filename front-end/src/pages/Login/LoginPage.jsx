// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  TextField, 
  Button, 
  FormControlLabel, 
  Checkbox, 
  Link,
  InputAdornment, 
  IconButton 
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
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
            Đăng nhập
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
            />
            <TextField 
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              placeholder="Nhập mật khẩu"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <FormControlLabel 
              control={<Checkbox value="remember" color="primary" />}
              label="Ghi nhớ đăng nhập"
            />
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Đăng nhập
            </Button>
            <Box display="flex" justifyContent="flex-end">
              <Link href="/login/forgot-password" variant="body2">
                Quên mật khẩu?
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
