// data.js – Số liệu web Nhóm 9 (n = 74 phiếu hợp lệ)
const DATA = {
  tongQuan: {
    phieuThuVe: 101, khongDongY: 3, saiCauKiemTra: 23, traLoiDua: 1, hopLe: 74,
    nu: 45, nam: 29, psqiTB: 6.14, psqiDLC: 2.83, nguKem: 42, nguTot: 32,
    tyLeNguKem: 56.8, essTB: 11.55, essTren10: 45, stressTB: 13.11,
    gioNguTB: 6.72, nguSau0h: 47, gpaTB: 3.14, gpaN: 54
  },
  psqiLoai: { nhan: ["Ngủ kém", "Ngủ tốt"], giaTri: [42, 32] },
  psqiThanhPhan: {
    nhan: ["Chất lượng chủ quan", "Thời gian đi vào giấc ngủ", "Thời lượng ngủ",
           "Hiệu quả giấc ngủ", "Rối loạn giấc ngủ", "Dùng thuốc ngủ",
           "Rối loạn chức năng ban ngày"],
    giaTri: [1.38, 1.26, 1.00, 0.38, 0.92, 0.07, 1.14]
  },
  soSanh: {
    nhan: ["ESS > 10", "Hay buồn ngủ trên lớp", "Đi muộn, bỏ học ≥ 1 lần", "Stress trên mức bình thường"],
    nguKem: [73.8, 54.8, 47.6, 50.0],
    nguTot: [43.8, 28.1, 21.9, 28.1]
  },
  dienThoai: {
    nhan: ["Dưới 30 phút / không dùng", "30–60 phút", "Trên 60 phút"],
    tyLeNguKem: [31.3, 66.7, 61.3],
    soNguoi: [16, 27, 31]
  },
  khoa: {
    nhan: ["Kinh tế và Quản lý", "Công nghệ thông tin", "Cơ khí", "Kế toán và Kinh doanh", "Điện – Điện tử", "Khoa khác"],
    giaTri: [43, 9, 6, 5, 4, 7]
  },
  gioNgu: {
    nhan: ["Trước 23h", "23h–0h", "0h–1h", "1h–2h", "Từ 2h trở đi"],
    giaTri: [9, 18, 26, 11, 10]
  },
  giaThuyet: [
    { ma: "H1", noiDung: "Nhóm ngủ kém có GPA thấp hơn", soLieu: "GPA 3,13 so với 3,17", ketQua: "Không ủng hộ" },
    { ma: "H2", noiDung: "Nhóm ngủ kém buồn ngủ ban ngày nhiều hơn, tập trung kém hơn", soLieu: "ESS > 10: 73,8% so với 43,8%; tập trung 5,88 so với 6,44", ketQua: "Ủng hộ một phần" },
    { ma: "H3", noiDung: "Dùng điện thoại trên 30 phút trước ngủ có tỷ lệ ngủ kém cao hơn", soLieu: "61–67% so với 31%", ketQua: "Ủng hộ" },
    { ma: "H4", noiDung: "Đi làm thêm có tỷ lệ ngủ kém cao hơn", soLieu: "56,7% so với 56,8%", ketQua: "Không ủng hộ" }
  ],
  nhanXet: {
    psqiLoai: "Hơn một nửa sinh viên (56,8%) có chất lượng giấc ngủ kém (PSQI > 5).",
    psqiThanhPhan: "Điểm cao nhất ở chất lượng ngủ chủ quan (1,38) và thời gian đi vào giấc ngủ (1,26); gần như không ai dùng thuốc ngủ (0,07).",
    soSanh: "Nhóm ngủ kém buồn ngủ ban ngày (73,8% so với 43,8%) và đi muộn, bỏ học (47,6% so với 21,9%) nhiều hơn rõ rệt.",
    dienThoai: "Dùng điện thoại trên 30 phút trước khi ngủ, tỷ lệ ngủ kém lên 61–67%, gấp đôi nhóm dùng ít (31,3%).",
    khoa: "Mẫu tập trung ở Khoa Kinh tế và Quản lý (43/74 người, 58,1%), nên kết quả nghiêng về khoa này.",
    gioNgu: "63,5% sinh viên (47/74) đi ngủ sau 0h; mốc phổ biến nhất là 0h–1h (26 người)."
  }
};
