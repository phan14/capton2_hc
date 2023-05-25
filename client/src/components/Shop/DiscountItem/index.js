import React, { useState } from "react";
import { AiFillCopy, AiOutlineShoppingCart } from "react-icons/ai";
import moment from "moment";
import styles from "./DiscountItem.module.css";
import format from "../../../helper/format";
import logo from "../../../assets/images/logo.png";
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { updateVoucher } from "../../../redux/actions/cart";
import { useNavigate } from "react-router-dom";

const DiscountItem = ({ item }) => {
  const cartData = useSelector((state) => state.cart)
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const [copied, setCopied] = useState(false);

  const copyClipboard = (value) => {
    navigator.clipboard.writeText(value);
    if (!copied) alert("copied");
    setCopied(true);
  };

  const handleUseNow = async ({ code, minimum, _id, value, by, start, end }) => {
    try {
      if (cartData?.list.length <= 0) {
        toast.info("Your shopping cart is empty!", { autoClose: 2000 });
        return
      }
      if (!code) {
        dispatch(updateVoucher({
          _id: "",
          code: "",
          value: 0,
          by: "",
          minimum: 0,
        }));
        navigate({ pathname: '/gio-hang' })
        return;
      }
      if (code === cartData?.voucher?.code) {
        navigate({ pathname: '/gio-hang' })
        return
      };
      if (cartData.subTotal < minimum) {
        toast.info(
          `Minimum order value required ${format.formatPrice(
            minimum
          )} to apply!`,
          { autoClose: 2000 }
        );
        return;
      }
      const now = new Date()
      if (!(now >= new Date(start) && now <= new Date(end))) {
        toast.info("Time is not right!")
        return
      }
      dispatch(
        updateVoucher({
          _id: _id,
          code: code,
          value: value,
          by: by,
          minimum: minimum,
        })
      );
      navigate({ pathname: '/gio-hang' })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`d-flex ${styles.discount_item}`}>
      <div className={styles.discount_item_left}>
        <img
          // src={logo}
          alt="Siss" />
      </div>
      <div className={styles.discount_item_right}>
        <div>
          <div className={styles.info}>
            <h6>
              Off {item.by === "percent" ? (
                `${item.value}%`
              )
                : format.formatPrice(item.value)} Minimum application{" "}
              {format.formatPrice(item.minimum)}
            </h6>
            <p>
              To {moment(item?.start).format('DD-MM-yyyy')} From {moment(item?.end).format('DD-MM-yyyy')}
            </p>
          </div>
          <div className={styles.actions}>
            <button
              className={!copied ? "" : styles.unactive}
              onClick={() => copyClipboard(item.code)}
            >
              <AiFillCopy />
              {!copied ? "Copy" : "copied"}
            </button>
            <button onClick={() => handleUseNow(item)}>
              <AiOutlineShoppingCart />
              Use it now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscountItem;
