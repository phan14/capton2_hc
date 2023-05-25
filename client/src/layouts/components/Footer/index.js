import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { IoPaperPlane, IoLogoFacebook, IoLogoYoutube, IoLogoInstagram } from "react-icons/io5";

import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col xl={3} xs={12}>
            <div className={styles.footerGroup}>
              <Link to='/'><h1 className={`${styles.bookstoreHighlight} me-5`}>Siss</h1></Link>
              <p>Khu phố 6, phường Linh Trung, TP Thủ Đức, TP HCM</p>
              <p>Siss@gmail.com</p>
            </div>
          </Col>
          <Col xl={6} xs={12}>
            <div className={styles.footerGroup}>
              <Row>
                <Col xl={4} xs={6}>
                  {/* <div className={styles.footerBoxLink}>
                    <p className={styles.title}>SẢN PHẨM</p>
                    <Link to="/san-pham/the-loai/van-hoc">Văn học</Link>
                    <Link to="/san-pham/the-loai/tam-ly-ky-nang-song">Tâm lý - Kỹ năng sống</Link>
                    <Link to="/san-pham/the-loai/cong-nghe-thong-tin">Công nghệ thông tin</Link>
                    <Link to="/san-pham/the-loai/kinh-te">Kinh tế</Link>
                    <Link to="/san-pham/the-loai/sach-giao-khoa">Sách giáo khoa</Link>
                  </div> */}
                </Col>
                <Col xl={4} xs={4} className={styles.cateList}>
                  <div className={styles.footerBoxLink}>
                    <p className={styles.title}>CATEGORY</p>
                    <Link to="/">Home</Link>
                    <Link to="/">Introduction</Link>
                    <Link to="/lien-he">Contact</Link>
                    <Link to="/">Product catalog</Link>
                  </div>
                </Col>
                <Col xl={4} xs={6}>
                  <div className={styles.footerBoxLink}>
                    <p className={styles.title}>Policy</p>
                    <Link to="/">Return Policy</Link>
                    <Link to="/">Shipping Policy</Link>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col xl={3} xs={12}>
            <div className={styles.footerGroup}>
              <p className={styles.title}>SIGN UP</p>
              <p>Sign up to receive the latest information from us.</p>
              <div className={`form-group ${styles.formGroup}`}>
                <input type="text" className="form-control" placeholder="Email..." />
                <button className={`bookstore-btn ${styles.subscribeBtn}`}><IoPaperPlane /></button>
              </div>
              <div className={styles.boxSocial}>
                <button className={`bookstore-btn ${styles.bookstoreBtn}`}><IoLogoFacebook /></button>
                <button className={`bookstore-btn ${styles.bookstoreBtn}`}><IoLogoYoutube /></button>
                <button className={`bookstore-btn ${styles.bookstoreBtn}`}><IoLogoInstagram /></button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
