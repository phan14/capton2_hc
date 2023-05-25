
import { useCallback, useEffect, useState } from "react";
import { Badge, Button, Col, Modal, Row, Spinner, Table } from "react-bootstrap";
import { FaEye, FaSearch } from "react-icons/fa";
import {MdOutlineShoppingCartCheckout,MdBlock,MdCheck} from "react-icons/md"
import {AiFillLock,AiFillUnlock} from "react-icons/ai"

import moment from "moment";
import format from "../../../helper/format";

import PaginationBookStore from "../../../components/PaginationBookStore";
import OrderDetail from "../../../components/OrderDetail";
import steps from "../../../components/OrderProgress/enum";
import userApi from "../../../api/userApi"
import orderApi from "../../../api/orderApi"

export default function CustomerList() {
  const [customerData, setCustomerData] = useState({})
  const [orderList, setOrderList] = useState([])
  const [orderDetail, setOrderDetail] = useState({})

  const [page, setPage] = useState(1)

  const [showModal, setShowModal] = useState(false)
  const [showOrderDetailModal, setShowOrderDetailModal] = useState(false)


  const [loading, setLoading] = useState(false)

  const [searchInput, setSearchInput] = useState("")
  const [searchString, setSearchString] = useState("")
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const query = {
          "$or": [
            { fullName: { "$regex": searchString, "$options": "$i" } },
            { email: { "$regex": searchString, "$options": "$i" } },
            { phoneNumber: { "$regex": searchString, "$options": "$i" } },
          ],
          role: 1
        }
        const { data, pagination } = await userApi.getAll({
          page,
          limit: 10,
          query:{role: 1}
        });
        setLoading(false);
        setCustomerData({ list: data, totalPage: pagination.totalPage });
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, [page, searchString, rerender]);

  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);

  const getOrderHistory = async (userId) => {
    try {
      const { data } = await orderApi.getAll({
        userId,
        limit: 10,
      })
      setOrderList(data)
      setShowModal(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleGetOrderDetail = async (orderId) => {
    try {
      const { data } = await orderApi.getById(orderId, {});
      setOrderDetail(data);
      setShowOrderDetailModal(true);
    } catch (error) {
      console.log(error)

    }
  }
  const handleBlock = async ({ _id: userId, status }) =>{
    const newStatus = status === 1 ? 2 :1;
    try {
      if(status !== 0){
        await userApi.updateStatus(userId, { status: newStatus });
        alert("Success!");
        setRerender(!rerender);
      }else{
        alert("Unverified account!");
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Row>
      <Modal size="lg" dialogClassName="modal-w1100" show={showOrderDetailModal} onHide={() => setShowOrderDetailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Bill <Badge bg="secondary">{orderDetail?._id}</Badge>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showModal && orderDetail && (
            <OrderDetail data={orderDetail} />
          )}
        </Modal.Body>
      </Modal>
      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)} dialogClassName="modal-w1100">
        <Modal.Header closeButton>
          <Modal.Title>Transaction history</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
            <Table hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Delivery Information</th>
                  <th>Order date</th>
                  <th>Total amount</th>
                  <th>Status</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7}>
                      <Spinner animation="border" variant="success" />
                    </td>
                  </tr>
                ) : orderList && orderList.length > 0 ? (
                  orderList.map((item, index) => {
                    return (
                      <tr key={item?._id}>
                        <td>{(1 && page - 1) * 10 + (index + 1)}</td>
                        <td className="text-start">
                          <p>Receiver: <b>{item?.delivery?.fullName}</b></p>
                          <p>Email: <b>{item?.delivery?.email}</b></p>
                          <p>Phone: <b>{item?.delivery?.phoneNumber}</b></p>
                          <p>Address: <b>{item?.delivery?.address}</b> </p>
                        </td>
                        <td>
                          <p>{moment(item?.createdAt).format('DD-MM-yyyy HH:mm:ss')}</p>
                          {moment(item.createdAt).isSame(moment(), 'day') && (
                            <span style={{ backgroundColor: "#ff709e" }} className="badge">{moment(item?.createdAt).fromNow()}</span>
                          )}
                        </td>
                        <td className="price fw-bold">
                          {format.formatPrice(item?.cost?.total)}
                        </td>
                        <td><span className="badge" style={{ backgroundColor: steps?.[item?.orderStatus?.code]?.color }}>{item?.orderStatus?.text}</span></td>
                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleGetOrderDetail(item?._id)}
                          >
                            <FaEye />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6}>No orders yet!</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
      <Col xl={12}>
        <div className="admin-content-wrapper">
          <div className="admin-content-header">List of customers</div>
          <div className="admin-content-action">
            <div className="d-flex">
              <input className="form-control search" placeholder="Seacher name, email, phone" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
              <Button type="button" style={{ color: "white" }} variant="info"
                onClick={() => {
                  setSearchString(searchInput)
                  setPage(1)
                }}
              >
                <FaSearch />
              </Button>
            </div>
          </div>
          <div className="admin-content-body">
            <Table hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Customers</th>
                  <th>Account</th>
                  <th>Status</th>
                  <th colSpan="2">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5}>
                      <Spinner animation="border" variant="success" />
                    </td>
                  </tr>
                ) : customerData?.list && customerData?.list?.length > 0 ? (
                  customerData.list.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <td>{(1 && page - 1) * 10 + (index + 1)}</td>
                        <td className="text-start">
                          <div className="d-flex align-items-center">
                            <img className="avatar" src={item?.avatar?.url} alt="" />
                            <div >
                              <p>Họ tên: <b>{item?.fullName}</b></p>
                              <p>Email: <b>{item?.email}</b></p>
                              <p>Điện thoại: <b>{item?.phoneNumber}</b></p>
                            </div>
                          </div>
                        </td>
                        <td><p>{item?.serviceId ? item?.service : "Account SCIS"}</p></td>
                        <td><Badge bg={item?.status === 1 ? "success" : "danger"}>{item?.status === 1 ? "Verified" : item?.status===0 ? "Not verified" : "Locked"}</Badge></td>
                        <td>
                          <Button variant="" className="border-black" onClick={() => getOrderHistory(item?._id)}>
                            <MdOutlineShoppingCartCheckout/>
                          </Button>
                          <Button className={ item?.status === 1 || item?.status === 0 ? "bg-red-500" : "bg-green-500"} variant="" onClick={() => handleBlock(item)}>
                            {item?.status === 1 || item?.status === 0 ? <AiFillLock/> : <AiFillUnlock/>}
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6}>Không có khách hàng nào!</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div className="admin-content-pagination">
              <Row>
                <Col xl={12}>
                  {customerData.totalPage > 1 ? (
                    <PaginationBookStore
                      totalPage={customerData.totalPage}
                      currentPage={page}
                      onChangePage={handleChangePage}
                    />
                  ) : null}
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}
