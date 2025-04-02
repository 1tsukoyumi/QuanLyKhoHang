// src/pages/StockInPage.jsx
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

// Dữ liệu mẫu mở rộng
const initialRows = [
    {
        id: 1,
        createdAt: '01/04/2025 08:00',
        code: 'A123',
        name: 'Phiếu nhập A',
        quantity: 10,
        value: 200000,
        creator: 'Nguyễn Văn A',
        status: 'Hoàn thành'
    },
    {
        id: 2,
        createdAt: '02/04/2025 09:15',
        code: 'B456',
        name: 'Phiếu nhập B',
        quantity: 15,
        value: 300000,
        creator: 'Trần Thị B',
        status: 'Đang xử lý'
    },
    {
        id: 3,
        createdAt: '03/04/2025 10:30',
        code: 'C789',
        name: 'Phiếu nhập C',
        quantity: 8,
        value: 150000,
        creator: 'Lê Văn C',
        status: 'Hoàn thành'
    },
    {
        id: 4,
        createdAt: '04/04/2025 11:45',
        code: 'D012',
        name: 'Phiếu nhập D',
        quantity: 20,
        value: 400000,
        creator: 'Phạm Thị D',
        status: 'Đang xử lý'
    },
    {
        id: 5,
        createdAt: '05/04/2025 13:00',
        code: 'E345',
        name: 'Phiếu nhập E',
        quantity: 12,
        value: 250000,
        creator: 'Hoàng Văn E',
        status: 'Hoàn thành'
    },
    {
        id: 6,
        createdAt: '06/04/2025 14:15',
        code: 'F678',
        name: 'Phiếu nhập F',
        quantity: 18,
        value: 350000,
        creator: 'Nguyễn Thị F',
        status: 'Đang xử lý'
    },
    {
        id: 7,
        createdAt: '07/04/2025 15:30',
        code: 'G901',
        name: 'Phiếu nhập G',
        quantity: 5,
        value: 100000,
        creator: 'Trần Văn G',
        status: 'Hoàn thành'
    },
    {
        id: 8,
        createdAt: '08/04/2025 16:45',
        code: 'H234',
        name: 'Phiếu nhập H',
        quantity: 25,
        value: 500000,
        creator: 'Phạm Văn H',
        status: 'Đang xử lý'
    },
    {
        id: 9,
        createdAt: '09/04/2025 18:00',
        code: 'I567',
        name: 'Phiếu nhập I',
        quantity: 30,
        value: 600000,
        creator: 'Lê Thị I',
        status: 'Hoàn thành'
    },
    {
        id: 10,
        createdAt: '10/04/2025 19:15',
        code: 'J890',
        name: 'Phiếu nhập J',
        quantity: 22,
        value: 440000,
        creator: 'Hoàng Thị J',
        status: 'Đang xử lý'
    }
];

const StockInPage = () => {
    // Quản lý danh sách phiếu nhập
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
            setSelectedIds(selectedIds.filter((item) => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const allIds = currentRows.map((row) => row.id);
            setSelectedIds([...new Set([...selectedIds, ...allIds])]);
        } else {
            const filtered = selectedIds.filter(
                (id) => !currentRows.map((r) => r.id).includes(id)
            );
            setSelectedIds(filtered);
        }
    };

    const isAllSelected = currentRows.every((row) => selectedIds.includes(row.id));

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
        alert('Đã in phiếu nhập (demo).');
    };

    const handleAddNew = () => {
        alert('Chuyển sang trang Thêm phiếu nhập (demo).');
    };

    return (
        <Box sx={{ p: 2 }}>
            {/* Thanh tiêu đề*/}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {/* Phần bên trái: Tiêu đề */}
                <Box sx={{ flexBasis: '20%' }}>
                    <Typography variant="h6">
                        Danh sách phiếu nhập
                    </Typography>
                </Box>

                {/* Phần giữa: Ô tìm kiếm */}
                <Box sx={{ flexBasis: '60%', display: 'flex', justifyContent: 'center', marginRight: 2, marginLeft: 2 }}>
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
                            ),
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

                {/* Phần bên phải: các nút chức năng */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" onClick={handlePrint}>
                        In phiếu nhập
                    </Button>
                    <Button variant="contained" onClick={handleAddNew}>
                        Thêm phiếu nhập
                    </Button>
                </Box>
            </Box>

            {/* Bảng danh sách phiếu nhập */}
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
                            <TableCell>Giá trị nhập</TableCell>
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

export default StockInPage;