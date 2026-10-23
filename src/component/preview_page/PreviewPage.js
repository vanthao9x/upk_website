import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./PreviewPage.module.css";

const PreviewPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { title, url, code } = location.state || {}; // Nhận dữ liệu từ state

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);

    // Theo dõi thay đổi kích thước màn hình
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 992);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const select = () => {
        navigate("/contact", { state: { code: code, url: url } });
    };

    if (!url) {
        return <p>Không tìm thấy đường dẫn!</p>;
    }

    return (
        <div className={styles.container}>
            {/* Chỉ hiển thị header trên desktop */}
            {!isMobile && (
                <div className={styles.header}>
                    <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className={styles.logo} />
                    <h2>CHỦ ĐỀ: {title}</h2>
                    {code && <h3> Mã: {code}</h3>}
                    <h4 className={styles.phone}>📞 Hotline: 038 58 555 33</h4>

                    <div className={styles.facebook}>
                        <a href="https://www.facebook.com/profile.php?id=100065047388603" target="_blank"
                           rel="noopener noreferrer">
                            <img src={`${process.env.PUBLIC_URL}/Facebook_Logo_(2019).png`} alt="Facebook"
                                 className={styles.fbIcon} />
                            <span>Thiết kế website siêu rẻ Đà Nẵng</span>
                        </a>
                    </div>

                    <button className={styles.selectButton} onClick={select}>Chọn mẫu này</button>
                    <button className={styles.backButton} onClick={() => navigate(-1)}>Quay lại</button>
                </div>
            )}

            {/* Nút mở sidebar trên mobile */}
            {isMobile && (
                <button className={styles.menuButton} onClick={() => setIsSidebarOpen(true)}>
                    ☰
                </button>
            )}

            {/* Sidebar (chỉ hiển thị trên mobile) */}
            {isMobile && (
                <div className={`${styles.sidebar} ${isSidebarOpen ? styles.show : ""}`}>
                    <button className={styles.closeBtn} onClick={() => setIsSidebarOpen(false)}>&times;</button>

                    <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Logo" className={styles.logo} />
                    <h2>CHỦ ĐỀ: {title}</h2>
                    {code && <h3> Mã: {code}</h3>}
                    <h4 className={styles.phone}>📞 Hotline: 038 58 555 33</h4>

                    <div className={styles.facebook}>
                        <a href="https://www.facebook.com/profile.php?id=100065047388603" target="_blank"
                           rel="noopener noreferrer">
                            <img src={`${process.env.PUBLIC_URL}/Facebook_Logo_(2019).png`} alt="Facebook"
                                 className={styles.fbIcon} />
                            <span>Thiết kế website siêu rẻ Đà Nẵng</span>
                        </a>
                    </div>

                    <button className={styles.selectButton} onClick={select}>Chọn mẫu này</button>
                    <button className={styles.backButton} onClick={() => navigate(-1)}>Quay lại</button>
                </div>
            )}

            {/* Overlay khi mở sidebar */}
            {isSidebarOpen && <div className={styles.overlay} onClick={() => setIsSidebarOpen(false)}></div>}

            {/* Nội dung chính */}
            <iframe src={url} title={title} className={styles.iframe} />
        </div>
    );
};

export default PreviewPage;
