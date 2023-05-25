import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Form,
  Modal,
  NavLink,
  Breadcrumb,
  Button,
  Badge,
} from "react-bootstrap";
import { FaCheck } from "react-icons/fa";

import PayItem from "../../components/Shop/PayItem";
import AddressSelect from "../../components/AddressSelect";
import PayPal from "../../components/PayPal";

import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import format from "../../helper/format";

import axios from "axios";
import orderApi from "../../api/orderApi";
import userApi from "../../api/userApi";

import methodData from "./methodData";

import { destroy } from "../../redux/actions/cart";
import styles from "./Payment.module.css";

export default function Checkout() {
  const [addressList, setAddressList] = useState([]);

  const cartData = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.auth);

  const [defaultAddress, setDefaultAddress] = useState("");
  const [newAddress, setNewAddress] = useState({});
  const [shippingAddress, setShippingAddress] = useState({});

  const [serviceList, setServiceList] = useState([]);
  const [serviceId, setServiceId] = useState("");

  const [showModalPayPal, setShowModalPayPal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingService, setLoadingService] = useState(false);

  const [shippingFee, setShippingFee] = useState(0);
  const [leadTime, setLeadTime] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!currentUser.userId || !token) {
      navigate({ pathname: "/" });
    }
  }, [navigate, currentUser, cartData]);

  useEffect(() => {
    // Call API lấy danh sách Address
    const fetchDataAddress = async () => {
      try {
        const { data } = await userApi.getAllAddressById(currentUser.userId);
        const addressData = data.address;
        if (addressData.length > 0) {
          const result = addressData.filter((item) => item?.isDefault === true);
          if (result.length > 0) {
            setDefaultAddress({
              ...result[0],
              fullAddress: result[0]?.address,
            });
            setNewAddress({ ...result[0], fullAddress: result[0]?.address });
          } else {
            setDefaultAddress({
              ...addressData[0],
              fullAddress: addressData[0]?.address,
            });
            setNewAddress({
              ...addressData[0],
              fullAddress: addressData[0]?.address,
            });
          }
        }
        setAddressList([
          ...addressData,
          { address: "Other Address", _id: "-1" },
        ]);
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.userId) {
      fetchDataAddress();
    }
  }, [currentUser]);

  const formik = useFormik({
    initialValues: {
      fullName: currentUser && currentUser.fullName ? currentUser.fullName : "",
      email: currentUser && currentUser.email ? currentUser.email : "",
      phoneNumber:
        currentUser && currentUser.phoneNumber ? currentUser.phoneNumber : "",
      address: defaultAddress,
      method: 0,
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      fullName: Yup.string().required("This field cannot be left blank!"),
      email: Yup.string()
        .email("Invalid email")
        .required("This field cannot be left blank!"),
      phoneNumber: Yup.string().required("This field cannot be left blank!"),
    }),
    onSubmit: async () => {
      const { email, fullName, phoneNumber, address, method } = formik.values;
      const { list } = cartData;
      const products = list.map((item) => {
        return {
          product: item?.product._id,
          imageUrl: item?.product?.imageUrl,
          name: item?.product?.name,
          quantity: item?.quantity,
          price: item?.product.price,
          totalItem: item?.totalPriceItem,
        };
      });

      if (address?._id === "-1" && shippingAddress?.address === "") {
        return alert("Please complete all information!");
      }
      if (shippingAddress?.fullAddress === "") {
        return;
      }
      const paymentId = uuidv4();
      const body = {
        userId: currentUser && currentUser.userId ? currentUser.userId : "",
        products,
        delivery: {
          fullName,
          email,
          phoneNumber,
          address: shippingAddress?.fullAddress,
        },
        voucherId: cartData?.voucher?._id,
        cost: {
          subTotal: cartData?.subTotal,
          shippingFee: shippingFee,
          discount: cartData?.discount,
          total: cartData?.total + shippingFee,
        },
        method: {
          code: +method,
          text: methodData.find((item) => item?.value === +method)?.name,
        },
        paymentId,
      };
      switch (+method) {
        case 0: {
          try {
            setLoading(true);
            await orderApi.create(body);
            await userApi.updateCart(currentUser?.userId, { cart: [] });
            toast.success("Order successfully!", { autoClose: 2000 });
            setLoading(false);
            dispatch(destroy());
            navigate({ pathname: "/don-hang" });
          } catch (error) {
            setLoading(false);
          }
          break;
        }
        case 1: {
          try {
            setLoading(true);
            const { payUrl } = await orderApi.getPayUrlMoMo({
              amount: cartData?.total,
              paymentId,
            });
            await orderApi.create(body);
            await userApi.updateCart(currentUser?.userId, { cart: [] });
            setLoading(false);
            window.location.href = payUrl;
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
          break;
        }
        case 2: {
          try {
            setShowModalPayPal(true);
            // alert("Tính năng đăng phát triển")
            const { payUrl } = await orderApi.getPayUrlPayPal({
              amount: cartData?.total,
              paymentId,
            });
            await orderApi.create(body);
            await userApi.updateCart(currentUser?.userId, { cart: [] });
            setLoading(false);
            window.location.href = payUrl;
          } catch (error) {
            setLoading(false);
            console.log(error);
          }
          break;
        }

        default: {
          break;
        }
      }
    },
  });

  const handleChangeAddress = useCallback((data) => {
    const {
      province: { provinceId, provinceName },
      district: { districtId, districtName },
      ward: { wardId, wardName },
      address,
    } = data;
    setNewAddress({
      address,
      fullAddress: `${address}, ${wardName}, ${districtName}, ${provinceName}`,
      provinceId,
      districtId,
      wardId,
    });
  }, []);

  const handleSuccess = useCallback(async () => {
    try {
      toast.success("Payment success!", { autoClose: 2000 });
      setShowModalPayPal(false);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChangeRadio = (e) => {
    const id = e.target.value;
    let address = {};
    if (id !== "-1") {
      address = addressList.find((item) => item?._id === id);
      setNewAddress({ ...address, fullAddress: address?.address });
    }
    formik.setFieldValue("address", {
      _id: id,
      ...address,
    });
  };

  useEffect(() => {
    const getService = async () => {
      try {
        setLoadingService(true);
        const { districtId } = shippingAddress;
        const result = await fetch(
          `https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services?to_district=${districtId}&from_district=${process.env.REACT_APP_GHN_FROM_DISTRICT_ID}&shop_id=${process.env.REACT_APP_GHN_SHOP_ID}`,
          {
            method: "GET",
            headers: {
              token: process.env.REACT_APP_GHN_TOKEN,
            },
          }
        );
        const { data } = await result.json();
        setServiceList(data || []);
        if (data) {
          setServiceId(data[0]?.service_id);
        }
        setLoadingService(false);
      } catch (error) {
        setLoadingService(false);
        console.log(error);
      }
    };
    if (shippingAddress && shippingAddress?.districtId) getService();
  }, [shippingAddress]);

  useEffect(() => {
    const getShippingFee = async () => {
      try {
        setLoading(true);
        const { districtId, wardId } = shippingAddress;
        const { data } = await axios.post(
          "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
          {
            service_id: serviceId,
            insurance_value: cartData?.total,
            coupon: null,
            from_district_id: +process.env.REACT_APP_GHN_FROM_DISTRICT_ID,
            to_ward_code: wardId,
            to_district_id: districtId,
            weight: 200,
            length: 30,
            width: 20,
            height: 5,
          },
          {
            headers: {
              token: process.env.REACT_APP_GHN_TOKEN,
              shopid: 3710396,
            },
          }
        );
        const { total: totalFee } = data?.data;
        if (totalFee) {
          setShippingFee(totalFee);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    const getLeadTime = async () => {
      try {
        setLoading(true);
        const { districtId, wardId } = shippingAddress;
        const { data } = await axios.post(
          "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/leadtime",
          {
            service_id: serviceId,
            from_district_id: +process.env.REACT_APP_GHN_FROM_DISTRICT_ID,
            from_ward_code: process.env.REACT_APP_GHN_FROM_WARD_CODE,
            to_ward_code: wardId,
            to_district_id: districtId,
          },
          {
            headers: {
              token: process.env.REACT_APP_GHN_TOKEN,
              shopid: 3710396,
            },
          }
        );

        if (data?.code === 200) {
          setLeadTime(data?.data?.leadtime);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    if (
      shippingAddress &&
      shippingAddress?.districtId &&
      serviceId &&
      loadingService === false
    ) {
      getShippingFee();
      getLeadTime();
    }
  }, [serviceId, shippingAddress, cartData, loadingService, dispatch]);

  return (
    <div className="pt-20 px-20 h-screen">
      <Modal
        size="lg"
        show={showModalPayPal}
        onHide={() => setShowModalPayPal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Pay</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PayPal
            amount={(cartData?.total / 23805).toFixed(2)}
            onSuccess={handleSuccess}
          />
        </Modal.Body>
      </Modal>
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={NavLink} linkProps={{ to: "/" }}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item
            active
            linkAs={NavLink}
            linkProps={{ to: "/thanh-toan" }}
          >
            Pay
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.payment_body}>
          <Row>
            <Col xl={7}>
              <div className={styles.payment_info}>
                <h4>DELIVERY INFORMATION</h4>
                <div className={`form-group ${styles.formGroup}`}>
                  <label className={styles.formLabel}>Full name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className={`form-control ${styles.formControl} ${
                      formik.errors.fullName ? "is-invalid" : "is-valid"
                    }`}
                    placeholder="Please accept the name"
                    value={formik.values.fullName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.fullName && (
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.feedback}
                    >
                      {formik.errors.fullName}
                    </Form.Control.Feedback>
                  )}
                </div>

                <div className={`form-group ${styles.formGroup}`}>
                  <label className={styles.formLabel}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`form-control ${styles.formControl} ${
                      formik.errors.email ? "is-invalid" : "is-valid"
                    }`}
                    placeholder="Email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email && (
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.feedback}
                    >
                      {formik.errors.email}
                    </Form.Control.Feedback>
                  )}
                </div>

                <div className={`form-group ${styles.formGroup}`}>
                  <label className={styles.formLabel}>Phone</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    className={`form-control ${styles.formControl} ${
                      formik.errors.phoneNumber ? "is-invalid" : "is-valid"
                    }`}
                    placeholder="Phone"
                    value={formik.values.phoneNumber}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    pattern="[0-9]{10}" // add phone number pattern to validate
                    title="Please enter a valid phone number with 10 digits" // add title attribute to show a tooltip message
                  />
                  {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.feedback}
                    >
                      {formik.errors.phoneNumber}
                    </Form.Control.Feedback>
                  )}

                  {/* {formik.errors.phoneNumber && (
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.feedback}
                    >
                      {formik.errors.phoneNumber}
                    </Form.Control.Feedback>
                  )} */}
                </div>
                <div>
                  <div className={styles.shippingAddress}>
                    <p>Delivery address: {shippingAddress?.fullAddress}</p>
                    {shippingAddress?.fullAddress && <FaCheck />}
                  </div>
                  {addressList && addressList?.length > 1 ? (
                    addressList.map((item) => (
                      <div key={item?._id} className="mb-2">
                        <input
                          type="radio"
                          name="address"
                          id={item?._id}
                          value={item?._id}
                          checked={item?._id === formik?.values?.address?._id}
                          onChange={handleChangeRadio}
                        />
                        <label htmlFor={item?._id}>{item?.address}</label>
                      </div>
                    ))
                  ) : (
                    <AddressSelect onChange={handleChangeAddress} />
                  )}
                </div>
                {formik.values?.address?._id === "-1" && (
                  <AddressSelect onChange={handleChangeAddress} />
                )}
                <Button
                  style={{ width: 250, marginTop: 15 }}
                  disabled={loading}
                  variant="danger"
                  type="button"
                  onClick={() => {
                    if (
                      formik.values?.address?._id === "-1" &&
                      newAddress?.address === ""
                    ) {
                      return alert("Please complete all information!");
                    }
                    if (newAddress?.loading && newAddress?.loading === true)
                      return;
                    setShippingAddress(newAddress);
                  }}
                >
                  Confirm the address
                </Button>
              </div>
            </Col>
            <Col xl={5}>
              <div className={styles.payment_form}>
                <h4>YOUR ORDER</h4>
                <div>
                  <p>
                    PRODUCTS<span className={styles.form_right1}>TOTAL</span>
                  </p>
                  {cartData?.list.map((item) => (
                    <PayItem
                      item={item?.product}
                      key={item?.product._id}
                      quantity={item?.quantity}
                      totalPriceItem={item?.totalPriceItem}
                    />
                  ))}
                  <p>
                    Provisional
                    <span className={styles.form_right}>
                      {format.formatPrice(cartData?.subTotal)}
                    </span>
                  </p>
                  <p>
                    Discount
                    <span className={styles.form_right}>
                      -{format.formatPrice(cartData?.discount)}
                    </span>
                  </p>
                  <p>
                    Transport fee
                    <span className={styles.form_right}>
                      +{format.formatPrice(shippingFee)}
                    </span>
                  </p>
                  <p>
                    Total
                    <span className={styles.form_right}>
                      {format.formatPrice(cartData?.total + shippingFee)}
                    </span>
                  </p>
                </div>
                {shippingAddress && shippingAddress?.districtId ? (
                  <>
                    <br></br>
                    {/* <h4>SHIPPING SERVICES</h4>
                    <div>
                      {serviceList && serviceList?.length > 0 ? serviceList.map(service => {
                        return (
                          <div key={service?.service_id}>
                            <input type="radio" name="service" value={service?.service_id} id={service?.service_id} checked={serviceId === service?.service_id}
                              onChange={(e) => setServiceId(+e.target.value)} />
                            <label htmlFor={service?.service_id}>{service?.short_name}</label>
                            <br />
                          </div>
                        )
                      }) : <h5>No shipping service found</h5>}
                    </div> */}
                    {leadTime && (
                      <p>
                        Estimated delivery time:{" "}
                        <Badge bg="danger">
                          {moment.unix(leadTime).format("DD-MM-yyy")}
                        </Badge>
                      </p>
                    )}
                  </>
                ) : null}
                <br></br>
                <h4>PAYMENT METHODS</h4>
                <div>
                  {methodData &&
                    methodData.map((method) => {
                      return (
                        <div key={method.value}>
                          <input
                            type="radio"
                            name="method"
                            value={method.value}
                            id={method.name}
                            checked={
                              parseInt(formik.values.method) === method.value
                            }
                            onChange={formik.handleChange}
                          />
                          <label htmlFor={method.name}>{method.name}</label>
                          {method.image && (
                            <label htmlFor={method.name}>
                              {" "}
                              <img
                                className="icon-method"
                                src={method.image}
                                alt=""
                              />
                            </label>
                          )}
                          <br />
                        </div>
                      );
                    })}
                </div>
                <button
                  type="button"
                  className="bookstore-btn"
                  onClick={formik.handleSubmit}
                  disabled={
                    loading ||
                    formik.errors.email ||
                    formik.errors.fullName ||
                    !formik.values.phoneNumber ||
                    !shippingAddress?.fullAddress
                  }
                >
                  {loading ? "ORDER ..." : "ORDER"}
                </button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}
