import { Badge, Table } from "react-bootstrap";
import OrderProgress from "../OrderProgress"
import moment from "moment";
import format from "../../helper/format";
import { useSelector } from "react-redux";

export default function OrderDetail({ data }) {

  const { role } = useSelector(state => state.auth)

  return (
    <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
      <div>
        <div className="d-flex">
          <div>
            <h4>Sics</h4>
            <p>C2.SE13</p>
          </div>
          <div style={{ marginLeft: "auto", minWidth: 330 }}>
            <p>
              Oder: <b>#{data?._id}</b>
            </p>
            <p>
              {" "}
              Purchase date:{" "}
              <b>
                {moment(data?.createdAt).format("DD-MM-yyyy HH:mm:ss")}
              </b>
            </p>
            <p>
              Account: <b>{data?.user?._id}</b>
            </p>
            <p>
              Customer name: <b>{data?.user?.fullName}</b>
            </p>
          </div>
        </div>
        <hr />
        <h5>Information line</h5>
        <div className="d-flex">
          <div>
            <p>
              Customer name: <b>{data?.delivery?.fullName}</b>
            </p>
            <p>
              Address: <b>{data?.delivery?.address}</b>
            </p>
          </div>
          <div style={{ marginLeft: "auto", minWidth: 330 }}>
            <p>
              Email: <b>{data?.delivery?.email}</b>
            </p>
            <p>
              Phone: <b>{data?.delivery?.phoneNumber}</b>
            </p>
          </div>
        </div>
        <hr />
        <div>
          <span>
            Payment methods: <b>{data?.method?.text}</b>{" "}
          </span>
          {data?.method?.code !== 0 && (
            <Badge
              className="ms-2"
              bg={data?.paymentStatus?.code === 2 ? "success" : "danger"}
            >
              {data?.paymentStatus?.text}
            </Badge>
          )}
        </div>
        <hr />
        <p>
          Status: <b>{data?.orderStatus.text}</b>
        </p>
        <OrderProgress current={data?.orderStatus?.code} />
        {data?.tracking && data?.tracking?.length > 0 && (
          <div className="mt-4">
            <p>Tracking:</p>
            {data?.tracking.map(item => {
              return (
                <div key={item?._id} className="d-flex align-items-center mb-2">
                  <p style={{ width: 200, fontWeight: "bold" }}>{moment(item?.time).format("DD-MM-yyyy HH:mm:ss")}</p>
                  <div>
                    <p>{item?.status}</p>
                    {role >= 2 && <p>Thực hiện: {item?.user?.fullName}</p>}
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {data?.voucher && data?.voucher?.code && (
          <>
            <hr />
            <p>
              Voucher: <b>{data?.voucher?.code}</b>
            </p>
            <p>
              Reduced form:{" "}
              <b>
                {data?.voucher?.by === "amount"
                  ? "Fixed level"
                  : "Percent"}
              </b>
            </p>
            <p>
              Giảm:{" "}
              <b>
                {data?.voucher.by === "amount"
                  ? format.formatPrice(data?.voucher?.value)
                  : `${data?.voucher?.value}%`}
              </b>
            </p>
          </>
        )}
      </div>
      <hr />
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Code</th>
            <th colSpan={2}>Product</th>
            <th>Amount</th>
            <th>Price</th>
            <th>To money</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.products &&
            data?.products?.length > 0 ? (
            data?.products.map((items, index) => {
              return (
                <tr key={items._id}>
                  <td>{index + 1}</td>
                  <td>{items?.product?._id}</td>
                  <td>{items?.product?.name}</td>
                  <td>
                    <img src={items?.product?.imageUrl} alt="" />
                  </td>
                  <td>{items?.quantity}</td>
                  <td>{format.formatPrice(items?.price)}</td>
                  <td>{format.formatPrice(items?.totalItem)}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Không có</td>
            </tr>
          )}
          <tr>
            <td colSpan={4}></td>
            <td colSpan={3} className="text-start">
              <p className="d-flex justify-content-between">
                <label>Provisional:</label>{" "}
                <b className="price">
                  {format.formatPrice(data?.cost?.subTotal)}
                </b>
              </p>
              <p className="d-flex justify-content-between">
                <label>Transport fee:</label>{" "}
                <b className="price">
                  +{format.formatPrice(data?.cost?.shippingFee)}
                </b>
              </p>
              <p className="d-flex justify-content-between">
                <label>Discount:</label>{" "}
                <b className="price">
                  -{format.formatPrice(data?.cost?.discount)}
                </b>
              </p>
              <p className="d-flex justify-content-between">
                <label>Total:</label>{" "}
                <b className="price">
                  {format.formatPrice(data?.cost.total)}
                </b>
              </p>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
