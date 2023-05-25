import { Container, Row, Col } from "react-bootstrap";
import BookItem from "../../components/Shop/BookItem";
import bookApi from "../../api/bookApi";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Loading from "../../components/Loading";
import BookOrigin from "../../components/Shop/BookItem/BookOrigin";

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await bookApi.getAll({ page: 1, limit: 40 });
        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" h-full pt-20 px-20 pb-10 ">
      <Container>
        <div className={styles.booksList}>
          <div className={styles.title}>
            <h2 className={styles.titleHeading}>Custom NFC Card</h2>
          </div>
          <Row className={styles.row}>
            {/* card origin  */}
            {books && books.length > 0 ? (
              books.map((book) => (
                <Col xl={3} xs={8} key={book._id}>
                  <BookOrigin data={book} />
                </Col>
              ))
            ) : (
              <Loading />
            )}
          </Row>
          <div>
            <div className={styles.title}>
              <h2 className={styles.titleHeading}>Latest product</h2>
            </div>
            <Row className={styles.row}>
              {books && books.length > 0 ? (
                books.map((book) => (
                  <Col xl={3} xs={8} key={book._id}>
                    <BookItem data={book} />
                  </Col>
                ))
              ) : (
                <Loading />
              )}
            </Row>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Home;
