CREATE DATABASE QuanLyKho
GO

USE QuanLyKho
GO

-- Tạo bảng TaiKhoan
CREATE TABLE TaiKhoan (
    MaTaiKhoan INT PRIMARY KEY IDENTITY(1,1),
    TenTaiKhoan NVARCHAR(50) NOT NULL,
    MatKhau NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NULL,
    DienThoai NVARCHAR(15) NULL,
    VaiTro NVARCHAR(50) CHECK (VaiTro IN ('QuanLy', 'NhanVien')) NOT NULL,
    DangNhapCuoi DATETIME NULL,
    -- 0: Ngừng hoạt động, 1: Hoạt động
    TrangThai TINYINT CHECK (TrangThai IN (0, 1)) NOT NULL DEFAULT(1)
)
GO

-- Tạo bảng NhaKho
CREATE TABLE NhaKho (
    MaNhaKho INT PRIMARY KEY IDENTITY(1,1),
    TenNhaKho NVARCHAR(100) NOT NULL,
    ViTri NVARCHAR(255) NULL,
    -- 0: Ngừng hoạt động, 1: Hoạt động
    TrangThai BIT CHECK (TrangThai IN (0, 1)) NOT NULL DEFAULT(1),
    SuaChua FLOAT NULL,
    DienTich FLOAT NULL,
    GhiChu NVARCHAR(255) NULL,
    LoaiKho NVARCHAR(100) NOT NULL
)
GO

-- Tạo bảng DinhDanh
CREATE TABLE DinhDanh (
    MaDinhDanh INT PRIMARY KEY IDENTITY(1,1),
    TenDinhDanh NVARCHAR(50) NOT NULL,
    SoDinhDanh NVARCHAR(50) NOT NULL,
    SoLuong INT NOT NULL,
    NgaySanXuat DATETIME NULL,
    HanSuDung DATETIME NULL,
    -- 0: Chưa kích hoạt, 1: Đang hoạt động, 2: Đã hủy
    TrangThai TINYINT CHECK (TrangThai IN (0, 1, 2)) NOT NULL DEFAULT(0),
    GhiChu NVARCHAR(255) NULL
)
GO

-- Tạo bảng DonHang
CREATE TABLE DonHang (
    MaDonHang INT PRIMARY KEY IDENTITY(1,1),
    NgayTao DATETIME NOT NULL DEFAULT(GETDATE()),
    NguoiTao INT NOT NULL,
    CapNhatCuoi DATETIME NULL,
    -- 0: Chờ xử lý, 1: Đã duyệt, 2: Đã giao
    TrangThai TINYINT CHECK (TrangThai IN (0, 1, 2)) NOT NULL DEFAULT(0),
    FOREIGN KEY (NguoiTao) REFERENCES TaiKhoan(MaTaiKhoan)
)
GO

-- Tạo bảng SanPham
CREATE TABLE SanPham (
    MaSanPham INT PRIMARY KEY IDENTITY(1,1),
    TenSanPham NVARCHAR(100) NOT NULL,
    MaDanhMucCon INT NOT NULL,
    MaDonViTinh INT NOT NULL,
    GiaBan DECIMAL(16,2) NULL,
    KhoiLuong FLOAT NULL,
    KichThuoc FLOAT NULL,
    CapNhatCuoi DATETIME NULL,
    FOREIGN KEY (MaDanhMucCon) REFERENCES DanhMucCon(MaDanhMucCon),
    FOREIGN KEY (MaDonViTinh) REFERENCES DonViTinh(MaDonViTinh)
)
GO

-- Tạo bảng NhaCungCap
CREATE TABLE NhaCungCap (
    MaNhaCungCap INT PRIMARY KEY IDENTITY(1,1),
    TenNhaCungCap NVARCHAR(100) NOT NULL,
    NguoiLienHe NVARCHAR(100) NULL,
    DienThoai NVARCHAR(15) NULL,
    Email NVARCHAR(100) NULL,
    DiaChi NVARCHAR(255) NULL,
    DienKhoanThanhToan NVARCHAR(100) NULL,
    ThoiGianGiaoHang DATETIME NULL,
    -- 0: Ngừng hoạt động, 1: Đang hoạt động
    TrangThai TINYINT CHECK (TrangThai IN (0, 1)) NOT NULL DEFAULT(1),
    CapNhatCuoi DATETIME NULL
)
GO

-- Tạo bảng NguyenLieu
CREATE TABLE NguyenLieu (
    MaNguyenLieu INT PRIMARY KEY IDENTITY(1,1),
    TenNguyenLieu NVARCHAR(100) NOT NULL,
    MaNhaKho INT NOT NULL,
    MaDonViTinh INT NOT NULL,
    MaNhaCungCap INT NOT NULL,
    MaDanhMucCon INT NOT NULL,
    MoTa NVARCHAR(255) NULL,
    GiaMua FLOAT NULL,
    CapNhatCuoi DATETIME NULL,
    FOREIGN KEY (MaNhaKho) REFERENCES NhaKho(MaNhaKho),
    FOREIGN KEY (MaDonViTinh) REFERENCES DonViTinh(MaDonViTinh),
    FOREIGN KEY (MaNhaCungCap) REFERENCES NhaCungCap(MaNhaCungCap),
    FOREIGN KEY (MaDanhMucCon) REFERENCES DanhMucCon(MaDanhMucCon)
)
GO

-- Tạo bảng TonKho
CREATE TABLE TonKho (
    MaTonKho INT PRIMARY KEY IDENTITY(1,1),
    MaSanPham INT NOT NULL,
    MaNguyenLieu INT NOT NULL,
    MaNhaKho INT NOT NULL,
    SoLuongTon INT NOT NULL,
    NgayCapNhat DATETIME NOT NULL DEFAULT(GETDATE()),
    FOREIGN KEY (MaSanPham) REFERENCES SanPham(MaSanPham),
    FOREIGN KEY (MaNguyenLieu) REFERENCES NguyenLieu(MaNguyenLieu),
    FOREIGN KEY (MaNhaKho) REFERENCES NhaKho(MaNhaKho)
)
GO

-- Tạo bảng DanhMucCon
CREATE TABLE DanhMucCon (
    MaDanhMucCon INT PRIMARY KEY IDENTITY(1,1),
    TenDanhMuc NVARCHAR(100) NOT NULL,
    MaDanhMuc INT NOT NULL,
    MoTa NVARCHAR(255) NULL,
    CapNhatCuoi DATETIME NULL,
    FOREIGN KEY (MaDanhMuc) REFERENCES DanhMuc(MaDanhMuc)
)
GO

-- Tạo bảng DanhMuc
CREATE TABLE DanhMuc (
    MaDanhMuc INT PRIMARY KEY IDENTITY(1,1),
    TenDanhMuc NVARCHAR(100) NOT NULL,
    MoTa NVARCHAR(255) NULL,
    CapNhatCuoi DATETIME NULL
)
GO

-- Tạo bảng DonViTinh
CREATE TABLE DonViTinh (
    MaDonViTinh INT PRIMARY KEY IDENTITY(1,1),
    TenDonVi NVARCHAR(50) NOT NULL,
    MoTa NVARCHAR(255) NULL
)
GO

-- Tạo bảng PhieuNhap
CREATE TABLE PhieuNhap (
    MaPhieuNhap INT PRIMARY KEY IDENTITY(1,1),
    MaNhaCungCap INT NOT NULL,
    MaNhaKho INT NOT NULL,
    NgayTao DATETIME NOT NULL DEFAULT(GETDATE()),
    NguoiTao INT NOT NULL,
    CapNhatCuoi DATETIME NULL,
    -- 0: Chờ xử lý, 1: Đã duyệt, 2: Đã nhập kho
    TrangThai TINYINT CHECK (TrangThai IN (0, 1, 2)) NOT NULL DEFAULT(0),
    FOREIGN KEY (MaNhaCungCap) REFERENCES NhaCungCap(MaNhaCungCap),
    FOREIGN KEY (MaNhaKho) REFERENCES NhaKho(MaNhaKho),
    FOREIGN KEY (NguoiTao) REFERENCES TaiKhoan(MaTaiKhoan)
)
GO

-- Tạo bảng PhieuXuat
CREATE TABLE PhieuXuat (
    MaPhieuXuat INT PRIMARY KEY IDENTITY(1,1),
    MaNhaCungCap INT NOT NULL,
    MaNhaKho INT NOT NULL,
    NgayTao DATETIME NOT NULL DEFAULT(GETDATE()),
    NguoiTao INT NOT NULL,
    CapNhatCuoi DATETIME NULL,
    -- 0: Chờ xử lý, 1: Đã duyệt, 2: Đã xuất kho
    TrangThai TINYINT CHECK (TrangThai IN (0, 1, 2)) NOT NULL DEFAULT(0),
    FOREIGN KEY (MaNhaCungCap) REFERENCES NhaCungCap(MaNhaCungCap),
    FOREIGN KEY (MaNhaKho) REFERENCES NhaKho(MaNhaKho),
    FOREIGN KEY (NguoiTao) REFERENCES TaiKhoan(MaTaiKhoan)
)
GO

-- Tạo bảng ChiTietPhieuNhap
CREATE TABLE ChiTietPhieuNhap (
    MaChiTietPhieuNhap INT PRIMARY KEY IDENTITY(1,1),
    MaPhieuNhap INT NOT NULL,
    MaSanPham INT NOT NULL,
    MaNguyenLieu INT NOT NULL,
    SoLuong INT NOT NULL,
    GiaNhap DECIMAL(16,2) NOT NULL,
    NgayTao DATETIME NOT NULL DEFAULT(GETDATE()),
    CapNhatCuoi DATETIME NULL,
    GhiChu NVARCHAR(255) NULL,
    FOREIGN KEY (MaPhieuNhap) REFERENCES PhieuNhap(MaPhieuNhap),
    FOREIGN KEY (MaSanPham) REFERENCES SanPham(MaSanPham),
    FOREIGN KEY (MaNguyenLieu) REFERENCES NguyenLieu(MaNguyenLieu)
)
GO

-- Tạo bảng ChiTietPhieuXuat
CREATE TABLE ChiTietPhieuXuat (
    MaChiTietPhieuXuat INT PRIMARY KEY IDENTITY(1,1),
    MaPhieuXuat INT NOT NULL,
    MaSanPham INT NOT NULL,
    MaNguyenLieu INT NOT NULL,
    SoLuong INT NOT NULL,
    GiaXuat DECIMAL(16,2) NOT NULL,
    NgayTao DATETIME NOT NULL DEFAULT(GETDATE()),
    CapNhatCuoi DATETIME NULL,
    GhiChu NVARCHAR(255) NULL,
    FOREIGN KEY (MaPhieuXuat) REFERENCES PhieuXuat(MaPhieuXuat),
    FOREIGN KEY (MaSanPham) REFERENCES SanPham(MaSanPham),
    FOREIGN KEY (MaNguyenLieu) REFERENCES NguyenLieu(MaNguyenLieu)
)
GO