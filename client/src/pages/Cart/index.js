import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Breadcrumb,
  NavLink,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import CartItem from "../../components/Shop/CartItem";

import format from "../../helper/format";
import styles from "./Cart.module.css";

import userApi from "../../api/userApi";
import voucherApi from "../../api/voucherApi";
import { updateVoucher } from "../../redux/actions/cart";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartData = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.auth);
  const { voucher } = cartData;
  const [voucherInput, setVoucherInput] = useState(voucher?.code || "");

  useEffect(() => {
    setVoucherInput(voucher?.code || "");
  }, [voucher]);

  useEffect(() => {
    const addToCart = async () => {
      try {
        const { list } = cartData;
        const newList = list.map((item) => {
          return { product: item?.product._id, quantity: item?.quantity };
        });
        await userApi.updateCart(currentUser.userId, { cart: newList });
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser && currentUser.userId) {
      addToCart();
    } else {
      navigate({ pathname: "/" });
    }
  }, [cartData, currentUser, navigate]);

  const handleNavigateToCheckout = (e) => {
    if (!currentUser.userId) {
      e.preventDefault();
      alert("You need to login to make payments!");
    }
  };

  const handleApplyVoucher = async () => {
    try {
      if (!voucherInput) {
        dispatch(
          updateVoucher({
            _id: "",
            code: "",
            value: 0,
            by: "",
            minimum: 0,
          })
        );
        return;
      }
      if (voucherInput === cartData?.voucher?.code) return;
      const { data: voucherData } = await voucherApi.getByCode(voucherInput);
      const { minimum, _id, value, by, start, end } = voucherData;

      if (!_id) {
        toast.info("This voucher does not exist!", { autoClose: 2000 });
        dispatch(
          updateVoucher({
            _id: "",
            code: "",
            value: 0,
            by: "",
          })
        );
        return;
      }
      if (cartData.subTotal < minimum) {
        toast.info(
          `Minimum order value required${format.formatPrice(
            minimum
          )} to apply!`,
          { autoClose: 2000 }
        );
        return;
      }
      const now = new Date();
      if (!(now >= new Date(start) && now <= new Date(end))) {
        toast.info("Time is not right!");
        return;
      }

      dispatch(
        updateVoucher({
          _id: _id,
          code: voucherInput,
          value: value,
          by: by,
          minimum: minimum,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen pt-20 px-20">
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={NavLink} linkProps={{ to: "/" }}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item
            active
            linkAs={NavLink}
            linkProps={{ to: "/gio-hang" }}
          >
            Cart
          </Breadcrumb.Item>
        </Breadcrumb>
        {cartData.list.length > 0 ? (
          <Row>
            <Col xl={9}>
              <div className={styles.cartLeft}>
                <Table hover style={{ backgroundColor: "white" }}>
                  <thead
                    style={{
                      backgroundColor: "#343a40",
                      color: "#ECF0F1",
                      textAlign: "center",
                    }}
                  >
                    <tr>
                      <th>Product</th>
                      <th>Unit Price</th>
                      <th>Amount</th>
                      <th>To money</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData.list.map((item) => (
                      <CartItem
                        key={item.product._id}
                        productId={item.product._id}
                        name={item.product.name}
                        imageUrl={item.product.imageUrl}
                        price={item.product.price}
                        quantity={item.quantity}
                        totalPriceItem={item.totalPriceItem}
                      ></CartItem>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
            <Col xl={3}>
              <div className={styles.cartRight}>
                <div className={styles.voucher}>
                  <div className={styles.voucherGroup}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter vocher code"
                      value={voucherInput}
                      onChange={(e) => setVoucherInput(e.target.value)}
                    />
                    <button type="button" onClick={handleApplyVoucher}>
                      Apply
                    </button>
                  </div>
                </div>
                <div className={styles.cartInfo}>
                  <div
                    className="d-flex justify-content-between p-2"
                    style={{ borderBottom: "1px solid #ece9e9" }}
                  >
                    <p>Provisional</p>
                    <p>{format.formatPrice(cartData.subTotal)}</p>
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center p-2"
                    style={{ borderBottom: "1px solid #ece9e9" }}
                  >
                    <p>Discount</p>
                    {cartData?.voucher?.code && (
                      <p className={styles.voucherCode}>
                        {cartData?.voucher?.code}
                      </p>
                    )}
                    <p>-{format.formatPrice(cartData.discount)}</p>
                  </div>
                  <div
                    className="d-flex justify-content-between p-2"
                    style={{ borderBottom: "1px solid #ece9e9" }}
                  >
                    <p>Total </p>
                    <p>{format.formatPrice(cartData.total)}</p>
                  </div>
                </div>
                <Link to="/thanh-toan" onClick={handleNavigateToCheckout}>
                  <button className={styles.btnCheckout}>Make a payment</button>
                </Link>
              </div>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col xl={12}>
              <div className={styles.empty}>
                <img
                  src="https://www.hanoicomputer.vn/template/july_2021/images/tk-shopping-img.png"
                  alt=""
                />
                <p>There are no products in your cart!</p>
                <Link to="/" className={`bookstore-btn ${styles.backHome}`}>
                  Continue shopping
                </Link>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Cart;
