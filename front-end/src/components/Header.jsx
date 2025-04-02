import React, { useContext } from 'react';
import { AppBar, Toolbar, Button, IconButton, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <Button component={Link} to="/" color="inherit">
            Trang Chính
          </Button>
          <Button component={Link} to="/stock-in" color="inherit">
            Nhập Kho
          </Button>
          <Button component={Link} to="/stock-out" color="inherit">
            Xuất Kho
          </Button>
          <Button component={Link} to="/product" color="inherit">
            Sản Phẩm
          </Button>
        </Box>

        {user ? (
          <IconButton component={Link} to="/profile" color="inherit">
            <AccountCircleIcon />
          </IconButton>
        ) : (
          <Button component={Link} to="/login" color="inherit">
            Đăng Nhập
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
