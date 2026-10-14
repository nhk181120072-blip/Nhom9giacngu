// p2-charts.js – Biểu đồ phần Kết quả (Nhóm 9)
// Đọc số từ DATA (data.js), vẽ bằng Chart.js vào canvas #bieuDo.
(() => {
  const MAU = {
    tim: "#a78bfa",
    timDam: "#7c3aed",
    hong: "#f472b6",
    xanhNgoc: "#34d399",
    vang: "#fbbf24",
    chuToi: "#cbd5e1",   // màu chữ khi nền tối
    chuSang: "#334155",  // màu chữ khi nền sáng
    luoiToi: "rgba(203, 213, 225, 0.12)",
    luoiSang: "rgba(51, 65, 85, 0.12)"
  };
  const FONT = "'Be Vietnam Pro', sans-serif";

  // Kiểu nút tab: thường và đang chọn
  const NUT_THUONG = "border-slate-300 bg-white text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300".split(" ");
  const NUT_CHON = "border-violet-400 bg-[#8b5cf6] text-white shadow-lg shadow-violet-500/30".split(" ");

  let bieuDoHienTai = null;
  let tenHienTai = "psqiLoai";

  const laNenToi = () => document.documentElement.classList.contains("dark");
  const mauChu = () => (laNenToi() ? MAU.chuToi : MAU.chuSang);
  const mauLuoi = () => (laNenToi() ? MAU.luoiToi : MAU.luoiSang);

  // Số kiểu Việt Nam: dấu phẩy thập phân
  const so = (x, le = 2) => Number(x).toLocaleString("vi-VN", { maximumFractionDigits: le });
  const pt = (x) => `${so(x, 1)}%`;

  // Tách nhãn dài thành nhiều dòng để không bị đè trên điện thoại
  function tachDong(nhan, toiDa = 14) {
    const dong = [];
    let hienTai = "";
    nhan.split(" ").forEach((tu) => {
      const thu = hienTai ? `${hienTai} ${tu}` : tu;
      if (thu.length > toiDa && hienTai) {
        dong.push(hienTai);
        hienTai = tu;
      } else {
        hienTai = thu;
      }
    });
    if (hienTai) dong.push(hienTai);
    return dong;
  }

  // Plugin nhỏ: ghi số ngay trên/đầu mỗi cột
  const ghiSoTrenCot = {
    id: "ghiSoTrenCot",
    afterDatasetsDraw(chart, _args, opts) {
      if (chart.config.type !== "bar") return;
      const { ctx } = chart;
      const ngang = chart.options.indexAxis === "y";
      ctx.save();
      ctx.fillStyle = mauChu();
      ctx.font = `600 12px ${FONT}`;
      chart.data.datasets.forEach((ds, i) => {
        const meta = chart.getDatasetMeta(i);
        if (meta.hidden) return;
        meta.data.forEach((cot, j) => {
          const nhan = opts.dinhDang ? opts.dinhDang(ds.data[j]) : so(ds.data[j]);
          if (ngang) {
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillText(nhan, cot.x + 6, cot.y);
          } else {
            ctx.textAlign = "center";
            ctx.textBaseline = "bottom";
            ctx.fillText(nhan, cot.x, cot.y - 4);
          }
        });
      });
      ctx.restore();
    }
  };

  function tuyChonChung() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      layout: { padding: { top: 20, right: 24 } },
      plugins: {
        legend: { labels: { color: mauChu(), font: { family: FONT }, usePointStyle: true } },
        tooltip: {
          titleFont: { family: FONT },
          bodyFont: { family: FONT },
          padding: 10,
          cornerRadius: 10
        }
      }
    };
  }

  function truc(phanTram = false, them = {}) {
    return {
      ticks: {
        color: mauChu(),
        font: { family: FONT },
        callback: (v) => (phanTram ? pt(v) : so(v))
      },
      grid: { color: mauLuoi() },
      border: { color: mauLuoi() },
      ...them
    };
  }

  function trucNhan(danhSach) {
    return {
      ticks: {
        color: mauChu(),
        autoSkip: false,
        font: { family: FONT, size: 11 },
        callback: (v) => tachDong(danhSach[v])
      },
      grid: { display: false },
      border: { color: mauLuoi() }
    };
  }

  // ---------- 6 cấu hình biểu đồ ----------
  const CAU_HINH = {
    psqiLoai() {
      const tong = DATA.psqiLoai.giaTri.reduce((a, b) => a + b, 0);
      return {
        type: "doughnut",
        data: {
          labels: DATA.psqiLoai.nhan,
          datasets: [{
            data: DATA.psqiLoai.giaTri,
            backgroundColor: [MAU.hong, MAU.xanhNgoc],
            borderColor: laNenToi() ? "#141a3a" : "#ffffff",
            borderWidth: 3,
            hoverOffset: 10
          }]
        },
        options: {
          ...tuyChonChung(),
          cutout: "62%",
          plugins: {
            ...tuyChonChung().plugins,
            legend: { position: "bottom", labels: { color: mauChu(), font: { family: FONT }, usePointStyle: true, padding: 18 } },
            tooltip: {
              ...tuyChonChung().plugins.tooltip,
              callbacks: { label: (c) => ` ${c.label}: ${c.raw} người (${pt((c.raw / tong) * 100)})` }
            }
          }
        }
      };
    },

    psqiThanhPhan() {
      return {
        type: "bar",
        data: {
          labels: DATA.psqiThanhPhan.nhan,
          datasets: [{
            data: DATA.psqiThanhPhan.giaTri,
            backgroundColor: MAU.tim,
            borderRadius: 6,
            maxBarThickness: 28
          }]
        },
        options: {
          ...tuyChonChung(),
          indexAxis: "y",
          plugins: {
            ...tuyChonChung().plugins,
            legend: { display: false },
            ghiSoTrenCot: { dinhDang: (v) => so(v) },
            tooltip: { ...tuyChonChung().plugins.tooltip, callbacks: { label: (c) => ` Điểm trung bình: ${so(c.raw)} / 3` } }
          },
          scales: {
            x: truc(false, { min: 0, max: 3 }),
            y: { ticks: { color: mauChu(), font: { family: FONT, size: 11 }, autoSkip: false, callback: (v) => tachDong(DATA.psqiThanhPhan.nhan[v], 18) }, grid: { display: false }, border: { color: mauLuoi() } }
          }
        }
      };
    },

    soSanh() {
      return {
        type: "bar",
        data: {
          labels: DATA.soSanh.nhan,
          datasets: [
            { label: "Ngủ kém", data: DATA.soSanh.nguKem, backgroundColor: MAU.hong, borderRadius: 6, maxBarThickness: 44 },
            { label: "Ngủ tốt", data: DATA.soSanh.nguTot, backgroundColor: MAU.xanhNgoc, borderRadius: 6, maxBarThickness: 44 }
          ]
        },
        options: {
          ...tuyChonChung(),
          plugins: {
            ...tuyChonChung().plugins,
            ghiSoTrenCot: { dinhDang: pt },
            tooltip: { ...tuyChonChung().plugins.tooltip, callbacks: { label: (c) => ` ${c.dataset.label}: ${pt(c.raw)}` } }
          },
          scales: { x: trucNhan(DATA.soSanh.nhan), y: truc(true, { min: 0, max: 100 }) }
        }
      };
    },

    dienThoai() {
      return {
        type: "bar",
        data: {
          labels: DATA.dienThoai.nhan,
          datasets: [{
            data: DATA.dienThoai.tyLeNguKem,
            backgroundColor: [MAU.xanhNgoc, MAU.hong, MAU.hong],
            borderRadius: 8,
            maxBarThickness: 72
          }]
        },
        options: {
          ...tuyChonChung(),
          plugins: {
            ...tuyChonChung().plugins,
            legend: { display: false },
            ghiSoTrenCot: { dinhDang: pt },
            tooltip: {
              ...tuyChonChung().plugins.tooltip,
              callbacks: {
                label: (c) => ` Tỷ lệ ngủ kém: ${pt(c.raw)}`,
                afterLabel: (c) => ` Số người trong nhóm: ${DATA.dienThoai.soNguoi[c.dataIndex]}`
              }
            }
          },
          scales: { x: trucNhan(DATA.dienThoai.nhan), y: truc(true, { min: 0, max: 100 }) }
        }
      };
    },

    khoa() {
      const tong = DATA.khoa.giaTri.reduce((a, b) => a + b, 0);
      return {
        type: "doughnut",
        data: {
          labels: DATA.khoa.nhan,
          datasets: [{
            data: DATA.khoa.giaTri,
            backgroundColor: [MAU.tim, "#8b5cf6", "#c084fc", MAU.hong, "#fb7185", MAU.vang],
            borderColor: laNenToi() ? "#141a3a" : "#ffffff",
            borderWidth: 3,
            hoverOffset: 10
          }]
        },
        options: {
          ...tuyChonChung(),
          cutout: "58%",
          plugins: {
            ...tuyChonChung().plugins,
            legend: { position: "bottom", labels: { color: mauChu(), font: { family: FONT, size: 11 }, usePointStyle: true, padding: 14 } },
            tooltip: {
              ...tuyChonChung().plugins.tooltip,
              callbacks: { label: (c) => ` ${c.label}: ${c.raw} người (${pt((c.raw / tong) * 100)})` }
            }
          }
        }
      };
    },

    gioNgu() {
      return {
        type: "bar",
        data: {
          labels: DATA.gioNgu.nhan,
          datasets: [{
            data: DATA.gioNgu.giaTri,
            backgroundColor: [MAU.tim, MAU.tim, MAU.timDam, MAU.timDam, MAU.timDam],
            borderRadius: 8,
            maxBarThickness: 64
          }]
        },
        options: {
          ...tuyChonChung(),
          plugins: {
            ...tuyChonChung().plugins,
            legend: { display: false },
            ghiSoTrenCot: { dinhDang: (v) => so(v) },
            tooltip: { ...tuyChonChung().plugins.tooltip, callbacks: { label: (c) => ` ${c.raw} người` } }
          },
          scales: { x: trucNhan(DATA.gioNgu.nhan), y: truc(false, { min: 0, suggestedMax: 30 }) }
        }
      };
    }
  };

  // ---------- Điều khiển tab ----------
  function toMauNut(ten) {
    document.querySelectorAll(".tab-bieu-do").forEach((nut) => {
      const chon = nut.dataset.bieuDo === ten;
      nut.classList.remove(...NUT_THUONG, ...NUT_CHON);
      nut.classList.add(...(chon ? NUT_CHON : NUT_THUONG));
      nut.setAttribute("aria-pressed", String(chon));
    });
  }

  function veBieuDo(ten) {
    const canvas = document.getElementById("bieuDo");
    const nhanXet = document.querySelector("#nhanXet span");
    if (!canvas || !CAU_HINH[ten]) return;

    if (bieuDoHienTai) bieuDoHienTai.destroy();

    // Biểu đồ 7 thành phần cần cao hơn để đủ chỗ cho nhãn
    canvas.parentElement.style.height = ten === "psqiThanhPhan" ? "440px" : "";

    Chart.defaults.font.family = FONT;
    Chart.defaults.color = mauChu();
    bieuDoHienTai = new Chart(canvas, { ...CAU_HINH[ten](), plugins: [ghiSoTrenCot] });
    tenHienTai = ten;

    if (nhanXet) nhanXet.textContent = DATA.nhanXet[ten];
    toMauNut(ten);
  }

  function khoiTao() {
    if (typeof Chart === "undefined" || typeof DATA === "undefined") {
      console.error("Thiếu Chart.js hoặc data.js – kiểm tra thứ tự thẻ <script>.");
      return;
    }
    if (!document.getElementById("bieuDo")) return;

    document.querySelectorAll(".tab-bieu-do").forEach((nut) => {
      nut.addEventListener("click", () => veBieuDo(nut.dataset.bieuDo));
    });
    veBieuDo("psqiLoai");

    // Đổi sáng/tối thì vẽ lại để đổi màu chữ và lưới
    new MutationObserver(() => veBieuDo(tenHienTai)).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", khoiTao, { once: true });
  } else {
    khoiTao();
  }
})();
