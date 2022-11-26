import React from "react";
import { Link } from "react-router-dom";
import logo from "./Assets/logo.png";
import "./Footer.css";
const Footer = () => {
  return (
    <div>
      <div style={{ backgroundColor: "#ed1164", color: "#ffffff" }}>
        <div className="Footer flex space__around pz__15">
          {/* Footer 1st part */}
          <div className="footer1st">
            <img
              src={logo}
              style={{
                borderRadius: "5px",
                backgroundColor: "#fff",
                width: "150px",
                height: "70px",
                padding: "0px 15px 0 10px",
                objectFit: "contain",
                cursor: "pointer",
              }}
            />
            <div className="location flex py__10">
              <strong>Gọi mua:</strong>
              <a href="tel:1900866874">1900.866.874</a>
              <span>(7:30 - 22:00)</span>
            </div>

            <div className="location flex py__10">
              <strong>Khiếu nại:</strong>
              <a href="tel:1900866894">1900.866.894</a>
              <span>(8:00- 21:30)</span>
            </div>

            <div className="location flex py__10">
              <strong>Kết nối với chúng tôi</strong>
            </div>
            <div className="icon-group">
              <a href="https://www.facebook.com/avakidscom/" target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="33"
                  fill="currentColor"
                  class="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                </svg>
              </a>

              <a
                href="https://www.youtube.com/channel/UCtK1MgkVcy-sVUM2eskT2EQ"
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="33"
                  height="33"
                  fill="currentColor"
                  class="bi bi-youtube"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                </svg>
              </a>
            </div>
          </div>
          {/* Footer 2nd part */}
          <div className="mobile">
            <div className="footer__2nd__part">
              <h5>Tài khoản</h5>
              <Link to="/login">
                <h3>Đăng nhập</h3>
              </Link>
              <Link to="/login">
                <h3>Đăng ký</h3>
              </Link>
              <Link to="/password/forgot">
                <h3>Quên mật khẩu</h3>
              </Link>
            </div>
            {/* Footer 3rd part */}
            <div className="footer__2nd__part">
              <h5>Theo dõi</h5>
              <Link to="/facebook.com">
                <h3>Facebook</h3>
              </Link>
              <Link to="/youtube.com">
                <h3>Youtube</h3>
              </Link>
              <Link to="/instagram.com">
                <h3>Zalo</h3>
              </Link>
            </div>
            {/* Footer 4th part */}
            <div className="footer__3rd__part">
              <h5>Công ty</h5>
              <a href="https://www.avakids.com/gioi-thieu" target="_blank">
                <h3>Giới thiệu</h3>
              </a>
              <a
                href="https://www.avakids.com/bao-mat-thong-tin"
                target="_blank"
              >
                <h3>Chính sách</h3>
              </a>
              <a href="https://www.avakids.com/quy-nu-cuoi" target="_blank">
                <h3>Quỹ nụ cười</h3>
              </a>
            </div>
            {/* Footer 5th part */}
            <div className="footer__4th__part">
              <h5>Luật</h5>
              <Link to="/faq">
                <h3>FAQ</h3>
              </Link>
              <Link to="/contact">
                <h3>Liên Lạc</h3>
              </Link>
              <Link to="/support">
                <h3>Phản hồi</h3>
              </Link>
            </div>
          </div>
        </div>
        <div style={{width : "75%", margin : "0 auto", padding : "0 0"}}>
        <p className="copyright">
          © 2018. Công ty cổ phần Thế Giới Di Động. GPDKKD: 0303217354 do sở KH
          & ĐT TP.HCM cấp ngày 02/01/2007.<br></br> Địa chỉ: 128 Trần Quang Khải, P. Tân
          Định, Q.1, TP.Hồ Chí Minh. Điện thoại: 028 38125960. Email:
          cskh@avakids.com. Chịu trách nhiệm nội dung: Huỳnh Văn Tốt.
        </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
