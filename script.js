// =====================================================
// SCRIPT.JS - WEBSITE BÁO CÁO NHÓM 9
// Chủ đề: Giấc ngủ và khả năng học tập của sinh viên
// JavaScript thuần, có chú thích tiếng Việt
// =====================================================


// =====================================================
// 1. KHỞI TẠO GIAO DIỆN SÁNG / TỐI
// =====================================================

const theHTML = document.documentElement;
const nutGiaoDien = document.getElementById("nutGiaoDien");

// Đọc giao diện đã lưu.
// Nếu trình duyệt chặn localStorage thì dùng giao diện tối mặc định.
function docGiaoDienDaLuu() {
    try {
        const giaoDien = localStorage.getItem("nhom9-giao-dien");

        if (giaoDien === "light") {
            theHTML.classList.remove("dark");
        } else {
            // Nếu chưa lưu hoặc lưu "dark", mặc định dùng giao diện tối.
            theHTML.classList.add("dark");
        }
    } catch (loi) {
        // Không làm website bị lỗi nếu localStorage bị chặn.
        theHTML.classList.add("dark");
    }
}


// Tạo icon mới bằng thư viện Lucide.
function datIcon(nut, tenIcon) {
    if (!nut) return;

    const icon = document.createElement("i");

    icon.setAttribute("data-lucide", tenIcon);
    icon.className = "h-5 w-5";

    // Thay icon cũ bằng icon mới.
    nut.replaceChildren(icon);
}


// Cập nhật icon của nút sáng/tối.
// Đang ở chế độ tối thì hiện mặt trời để chuyển sang sáng.
// Đang ở chế độ sáng thì hiện mặt trăng để chuyển sang tối.
function capNhatIconGiaoDien() {
    if (!nutGiaoDien) return;

    if (theHTML.classList.contains("dark")) {
        datIcon(nutGiaoDien, "sun");
        nutGiaoDien.setAttribute("aria-label", "Chuyển sang giao diện sáng");
    } else {
        datIcon(nutGiaoDien, "moon");
        nutGiaoDien.setAttribute("aria-label", "Chuyển sang giao diện tối");
    }

    // Vẽ lại icon sau khi thay đổi.
    if (window.lucide) {
        window.lucide.createIcons();
    }
}


// Xử lý khi người dùng nhấn nút đổi giao diện.
function xuLyDoiGiaoDien() {
    // Bật dark nếu đang sáng, tắt dark nếu đang tối.
    const dangToi = theHTML.classList.toggle("dark");

    // Lưu lựa chọn để lần mở trang sau vẫn giữ giao diện.
    try {
        localStorage.setItem(
            "nhom9-giao-dien",
            dangToi ? "dark" : "light"
        );
    } catch (loi) {
        // Nếu không lưu được thì giao diện hiện tại vẫn hoạt động.
    }

    // Cập nhật icon mặt trời / mặt trăng.
    capNhatIconGiaoDien();
}


// =====================================================
// 2. MENU ĐIỀU HƯỚNG TRÊN ĐIỆN THOẠI
// =====================================================

const nutMenu = document.getElementById("nutMenu");
const menuMobile = document.getElementById("menuMobile");


// Mở hoặc đóng menu mobile.
function datTrangThaiMenu(moMenu) {
    if (!nutMenu || !menuMobile) return;

    if (moMenu) {
        menuMobile.classList.remove("hidden");
        nutMenu.setAttribute("aria-expanded", "true");
        nutMenu.setAttribute("aria-label", "Đóng menu điều hướng");

        // Khi menu mở, hiện icon dấu X.
        datIcon(nutMenu, "x");
    } else {
        menuMobile.classList.add("hidden");
        nutMenu.setAttribute("aria-expanded", "false");
        nutMenu.setAttribute("aria-label", "Mở menu điều hướng");

        // Khi menu đóng, hiện icon ba gạch.
        datIcon(nutMenu, "menu");
    }

    // Vẽ lại icon Lucide sau khi thay đổi.
    if (window.lucide) {
        window.lucide.createIcons();
    }
}


// Nhấn nút ba gạch để mở/đóng menu.
if (nutMenu && menuMobile) {
    nutMenu.addEventListener("click", function () {
        const dangMo = !menuMobile.classList.contains("hidden");

        datTrangThaiMenu(!dangMo);
    });
}


// Nhấn vào một liên kết trong menu mobile thì tự đóng menu.
if (menuMobile) {
    const cacLinkMobile = menuMobile.querySelectorAll('a[href^="#"]');

    cacLinkMobile.forEach(function (link) {
        link.addEventListener("click", function () {
            datTrangThaiMenu(false);
        });
    });
}


// Nhấn phím Escape để đóng menu nếu menu đang mở.
document.addEventListener("keydown", function (suKien) {
    if (suKien.key === "Escape") {
        datTrangThaiMenu(false);
    }
});


// Nếu chuyển từ màn hình điện thoại sang desktop,
// đóng menu mobile để tránh trạng thái hiển thị không mong muốn.
window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) {
        datTrangThaiMenu(false);
    }
});


// =====================================================
// 3. THANH TIẾN ĐỘ CUỘN TRANG
// =====================================================

const thanhCuon = document.getElementById("thanhCuon");


// Tính phần trăm trang đã cuộn.
function capNhatThanhCuon() {
    if (!thanhCuon) return;

    const doCaoTrang = document.documentElement.scrollHeight;
    const doCaoManHinh = window.innerHeight;

    // Tổng khoảng cách có thể cuộn.
    const khoangCuon = doCaoTrang - doCaoManHinh;

    let phanTram = 0;

    if (khoangCuon > 0) {
        phanTram = (window.scrollY / khoangCuon) * 100;
    }

    // Giới hạn kết quả trong khoảng từ 0% đến 100%.
    phanTram = Math.max(0, Math.min(100, phanTram));

    // Độ rộng của thanh tím tương ứng với phần trăm đã cuộn.
    thanhCuon.style.width = phanTram + "%";
}


// Cập nhật khi cuộn trang hoặc thay đổi kích thước cửa sổ.
window.addEventListener("scroll", capNhatThanhCuon, {
    passive: true
});

window.addEventListener("resize", capNhatThanhCuon);


// =====================================================
// 4. TÔ MÀU LINK MENU CỦA MỤC ĐANG XEM
// Sử dụng IntersectionObserver
// =====================================================

const cacSection = document.querySelectorAll(
    "main section[id]"
);

const cacLinkMenu = document.querySelectorAll(
    'a[href^="#"]'
);


// Tô tím link trỏ tới mục hiện tại.
function capNhatLinkDangXem(idMuc) {
    cacLinkMenu.forEach(function (link) {
        const dangChon = link.getAttribute("href") === "#" + idMuc;

        if (dangChon) {
            // Tô màu tím và làm chữ đậm hơn.
            link.style.color = "#a78bfa";
            link.classList.add("font-semibold");
            link.setAttribute("aria-current", "location");
        } else {
            // Trả lại màu mặc định theo giao diện sáng/tối.
            link.style.removeProperty("color");
            link.classList.remove("font-semibold");
            link.removeAttribute("aria-current");
        }
    });
}


// Theo dõi section nào đang xuất hiện trên màn hình.
if ("IntersectionObserver" in window) {
    const boTheoDoiSection = new IntersectionObserver(
        function (danhSach) {
            danhSach.forEach(function (muc) {
                if (muc.isIntersecting) {
                    capNhatLinkDangXem(muc.target.id);
                }
            });
        },
        {
            // Xác định mục đang xem quanh vùng giữa màn hình.
            rootMargin: "-20% 0px -60% 0px",
            threshold: 0
        }
    );

    cacSection.forEach(function (section) {
        boTheoDoiSection.observe(section);
    });
} else {
    // Phương án dự phòng cho trình duyệt không hỗ trợ.
    // Xác định mục gần đầu màn hình nhất khi cuộn.
    window.addEventListener("scroll", function () {
        let mucDangXem = null;

        cacSection.forEach(function (section) {
            if (section.getBoundingClientRect().top <= window.innerHeight * 0.4) {
                mucDangXem = section;
            }
        });

        if (mucDangXem) {
            capNhatLinkDangXem(mucDangXem.id);
        }
    }, { passive: true });
}


// Khi người dùng đã cuộn đến cuối trang,
// ưu tiên đánh dấu mục Nhóm đang được xem.
function kiemTraCuoiTrang() {
    const daDenCuoi =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 3;

    if (daDenCuoi && cacSection.length > 0) {
        capNhatLinkDangXem(cacSection[cacSection.length - 1].id);
    }
}

window.addEventListener("scroll", kiemTraCuoiTrang, {
    passive: true
});


// =====================================================
// 5. KHỞI TẠO AOS VÀ LUCIDE
// =====================================================

function khoiTaoHieuUng() {
    // Khởi tạo AOS: hiệu ứng xuất hiện khi cuộn, chạy một lần.
    if (window.AOS && typeof window.AOS.init === "function") {
        window.AOS.init({
            once: true,
            duration: 700
        });
    }

    // Đọc giao diện đã lưu trước khi cập nhật icon.
    docGiaoDienDaLuu();

    // Chuẩn bị icon ban đầu.
    capNhatIconGiaoDien();

    if (nutMenu) {
        datIcon(nutMenu, "menu");
    }

    // Vẽ các icon Lucide trên trang.
    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }

    // Cập nhật thanh cuộn ngay khi trang được tải.
    capNhatThanhCuon();
}


// Gắn sự kiện đổi giao diện.
if (nutGiaoDien) {
    nutGiaoDien.addEventListener("click", xuLyDoiGiaoDien);
}


// Chạy sau khi HTML được tải xong.
// Cách này cũng hoạt động nếu script.js được nạp muộn.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", khoiTaoHieuUng);
} else {
    khoiTaoHieuUng();
}


// =====================================================
// 6. SỐ ĐẾM TĂNG DẦN KHI CUỘN TỚI
//
// Ví dụ HTML:
// <span data-dem="56.8" data-hau-to="%"></span>
//
// Kết quả: 0 → 56,8%
// Thời gian đếm: 1.500 mili giây = 1,5 giây
// Giữ nguyên số chữ số thập phân trong data-dem.
// =====================================================


// Định dạng số theo kiểu Việt Nam.
function dinhDangSoVietNam(giaTri, soChuSoThapPhan) {
    const boDinhDang = new Intl.NumberFormat("vi-VN", {
        minimumFractionDigits: soChuSoThapPhan,
        maximumFractionDigits: soChuSoThapPhan
    });

    return boDinhDang.format(giaTri);
}


// Chạy hiệu ứng đếm cho một phần tử.
function batDauDem(phanTu) {
    // Ngăn phần tử chạy nhiều lần.
    if (phanTu.dataset.demDaChay === "true") {
        return;
    }

    phanTu.dataset.demDaChay = "true";

    // Lấy số đích trong thuộc tính data-dem.
    const chuoiSo = phanTu.getAttribute("data-dem");

    if (chuoiSo === null || chuoiSo.trim() === "") {
        return;
    }

    const soDich = Number(chuoiSo.replace(",", "."));

    // Bỏ qua nếu dữ liệu không phải số hợp lệ.
    if (!Number.isFinite(soDich)) {
        console.warn("Giá trị data-dem không hợp lệ:", chuoiSo);
        return;
    }

    // Xác định số chữ số thập phân cần giữ.
    // Ví dụ 56.80 giữ 2 chữ số; 56.8 giữ 1 chữ số.
    const ketQuaThapPhan = chuoiSo.match(/[.,](\d+)$/);

    const soChuSoThapPhan = ketQuaThapPhan
        ? ketQuaThapPhan[1].length
        : 0;

    // Lấy hậu tố, chẳng hạn ký hiệu phần trăm.
    const hauTo = phanTu.getAttribute("data-hau-to") || "";

    // Thời gian đếm tổng cộng 1,5 giây.
    const thoiGianDem = 1500;

    // Ghi lại thời điểm bắt đầu.
    const thoiDiemBatDau = performance.now();


    // Hàm thực hiện từng khung hình của hiệu ứng.
    function capNhatSo(thoiDiemHienTai) {
        const thoiGianDaQua = thoiDiemHienTai - thoiDiemBatDau;

        // Tỷ lệ tiến độ từ 0 đến 1.
        const tiLe = Math.min(thoiGianDaQua / thoiGianDem, 1);

        // Hiệu ứng tăng chậm dần ở cuối.
        const tiLeMuot = 1 - Math.pow(1 - tiLe, 3);

        // Giá trị hiện tại tăng dần từ 0 đến số đích.
        const giaTriHienTai = soDich * tiLeMuot;

        // Định dạng theo quy tắc số Việt Nam.
        const soDaDinhDang = dinhDangSoVietNam(
            giaTriHienTai,
            soChuSoThapPhan
        );

        // Hiển thị số và hậu tố.
        phanTu.textContent = soDaDinhDang + hauTo;

        // Nếu chưa hết thời gian thì tiếp tục đếm.
        if (tiLe < 1) {
            requestAnimationFrame(capNhatSo);
        } else {
            // Đảm bảo giá trị cuối cùng chính xác tuyệt đối.
            phanTu.textContent =
                dinhDangSoVietNam(soDich, soChuSoThapPhan) + hauTo;
        }
    }

    // Bắt đầu hiệu ứng.
    requestAnimationFrame(capNhatSo);
}


// Tìm tất cả phần tử có thuộc tính data-dem.
const cacSoDem = document.querySelectorAll("[data-dem]");


// Chỉ bắt đầu đếm khi phần tử đi vào vùng nhìn thấy.
if ("IntersectionObserver" in window) {
    const boTheoDoiSoDem = new IntersectionObserver(
        function (danhSach, observer) {
            danhSach.forEach(function (muc) {
                if (muc.isIntersecting) {
                    batDauDem(muc.target);

                    // Mỗi phần tử chỉ cần quan sát đến lần đầu tiên.
                    observer.unobserve(muc.target);
                }
            });
        },
        {
            threshold: 0.2
        }
    );

    cacSoDem.forEach(function (phanTu) {
        boTheoDoiSoDem.observe(phanTu);
    });
} else {
    // Phương án dự phòng nếu trình duyệt không hỗ trợ
    // IntersectionObserver: đếm ngay khi trang tải xong.
    cacSoDem.forEach(function (phanTu) {
        batDauDem(phanTu);
    });
}


// =====================================================
// KẾT THÚC SCRIPT.JS - NHÓM 9
// =====================================================