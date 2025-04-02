// src/pages/StockOutPage.jsx
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Pagination,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';

// Dữ liệu mẫu mở rộng cho phiếu xuất
const initialRows = [
  {
    id: 1,
    createdAt: '01/04/2025 08:00',
    code: 'X123',
    name: 'Phiếu xuất A',
    quantity: 5,
    value: 100000,
    creator: 'Nguyễn Văn X',
    status: 'Hoàn thành'
  },
  {
    id: 2,
    createdAt: '02/04/2025 09:15',
    code: 'X456',
    name: 'Phiếu xuất B',
    quantity: 8,
    value: 160000,
    creator: 'Trần Thị Y',
    status: 'Đang xử lý'
  },
  {
    id: 3,
    createdAt: '03/04/2025 10:30',
    code: 'X789',
    name: 'Phiếu xuất C',
    quantity: 10,
    value: 200000,
    creator: 'Lê Văn Z',
    status: 'Hoàn thành'
  },
  {
    id: 4,
    createdAt: '04/04/2025 11:45',
    code: 'X012',
    name: 'Phiếu xuất D',
    quantity: 12,
    value: 240000,
    creator: 'Phạm Thị W',
    status: 'Đang xử lý'
  },
  {
    id: 5,
    createdAt: '05/04/2025 13:00',
    code: 'X345',
    name: 'Phiếu xuất E',
    quantity: 6,
    value: 120000,
    creator: 'Hoàng Văn V',
    status: 'Hoàn thành'
  },
  {
    id: 6,
    createdAt: '06/04/2025 14:15',
    code: 'X678',
    name: 'Phiếu xuất F',
    quantity: 9,
    value: 180000,
    creator: 'Nguyễn Thị U',
    status: 'Đang xử lý'
  },
  {
    id: 7,
    createdAt: '07/04/2025 15:30',
    code: 'X901',
    name: 'Phiếu xuất G',
    quantity: 4,
    value: 80000,
    creator: 'Trần Văn T',
    status: 'Hoàn thành'
  },
  {
    id: 8,
    createdAt: '08/04/2025 16:45',
    code: 'X234',
    name: 'Phiếu xuất H',
    quantity: 11,
    value: 220000,
    creator: 'Phạm Văn S',
    status: 'Đang xử lý'
  },
  {
    id: 9,
    createdAt: '09/04/2025 18:00',
    code: 'X567',
    name: 'Phiếu xuất I',
    quantity: 7,
    value: 140000,
    creator: 'Lê Thị R',
    status: 'Hoàn thành'
  },
  {
    id: 10,
    createdAt: '10/04/2025 19:15',
    code: 'X890',
    name: 'Phiếu xuất J',
    quantity: 13,
    value: 260000,
    creator: 'Hoàng Thị Q',
    status: 'Đang xử lý'
  }
];

const StockOutPage = () => {
  // Quản lý danh sách phiếu xuất
  const [rows, setRows] = useState(initialRows);
  // Quản lý checkbox được chọn
  const [selectedIds, setSelectedIds] = useState([]);
  // Quản lý phân trang (mỗi trang hiển thị 5 dòng)
  const rowsPerPage = 5;
  const [page, setPage] = useState(1);
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = rows.slice(startIndex, endIndex);

  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      const allIds = currentRows.map(row => row.id);
      setSelectedIds([...new Set([...selectedIds, ...allIds])]);
    } else {
      const filtered = selectedIds.filter(id => !currentRows.map(r => r.id).includes(id));
      setSelectedIds(filtered);
    }
  };

  const isAllSelected = currentRows.every(row => selectedIds.includes(row.id));
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  // Quản lý ô tìm kiếm và kiểu lọc
  const [searchCode, setSearchCode] = useState('');
  const [filterType, setFilterType] = useState('Mã phiếu');
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  const handleSearch = (e) => {
    setSearchCode(e.target.value);
    // Thực hiện logic tìm kiếm theo filterType nếu cần
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleSelectFilterType = (type) => {
    setFilterType(type);
    handleCloseMenu();
  };

  const handlePrint = () => {
    alert('Đã in phiếu xuất (demo).');
  };

  const handleAddNew = () => {
    alert('Chuyển sang trang Thêm phiếu xuất (demo).');
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Thanh tiêu đề */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {/* Phần bên trái: Tiêu đề */}
        <Box sx={{ flexBasis: '20%' }}>
          <Typography variant="h6">
            Danh sách phiếu xuất
          </Typography>
        </Box>

        {/* Phần giữa: Ô tìm kiếm */}
        <Box sx={{ flexBasis: '60%', display: 'flex', justifyContent: 'center', mx: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder={`Tìm kiếm theo ${filterType}...`}
            value={searchCode}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'gray' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Box
                    sx={{
                      borderLeft: '1px solid #ccc',
                      height: '60%',
                      mr: 1,
                    }}
                  />
                  <IconButton
                    onClick={handleOpenMenu}
                    sx={{
                      color: 'gray',
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                        color: '#1976d2',
                      },
                    }}
                  >
                    <ArrowDropDownIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {/* Menu sổ xuống để chọn kiểu lọc */}
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => handleSelectFilterType('Mã phiếu')}>
              Mã phiếu
            </MenuItem>
            <MenuItem onClick={() => handleSelectFilterType('Thời gian tạo')}>
              Thời gian tạo
            </MenuItem>
            {/* Thêm các lựa chọn khác nếu cần */}
          </Menu>
        </Box>

        {/* Phần bên phải: Các nút chức năng */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button variant="contained" onClick={handlePrint}>
            In phiếu xuất
          </Button>
          <Button variant="contained" onClick={handleAddNew}>
            Thêm phiếu xuất
          </Button>
        </Box>
      </Box>

      {/* Bảng danh sách phiếu xuất */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox checked={isAllSelected} onChange={handleSelectAll} />
              </TableCell>
              <TableCell>Thời gian tạo</TableCell>
              <TableCell>Mã phiếu</TableCell>
              <TableCell>Tên phiếu</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Giá trị xuất</TableCell>
              <TableCell>Người tạo</TableCell>
              <TableCell>Trạng thái</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedIds.includes(row.id)}
                    onChange={() => handleCheckboxChange(row.id)}
                  />
                </TableCell>
                <TableCell>{row.createdAt}</TableCell>
                <TableCell>{row.code}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.quantity}</TableCell>
                <TableCell>{row.value}</TableCell>
                <TableCell>{row.creator}</TableCell>
                <TableCell>
                  <Button variant="outlined" size="small">
                    {row.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Phân trang */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={Math.ceil(rows.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default StockOutPage;
