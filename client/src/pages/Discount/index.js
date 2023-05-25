import { useEffect, useState } from "react";
import { Breadcrumb, Container, NavLink } from "react-bootstrap";
import Loading from "../../components/Loading";
import DiscountItem from "../../components/Shop/DiscountItem";
import voucherApi from "../../api/voucherApi";

export default function Discount() {
  const [voucherData, setVoucherData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await voucherApi.getAll({
          valid: true,
          limit: 20,
          sortByDate: "desc",
        });
        setLoading(false);
        setVoucherData(res.data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen pt-24 pb-20 px-20">
      <Container>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={NavLink} linkProps={{ to: "/" }}>
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item
            active
            linkAs={NavLink}
            linkProps={{ to: "/khuyen-mai" }}
          >
            Provisional
          </Breadcrumb.Item>
        </Breadcrumb>
        {loading ? (
          <Loading />
        ) : voucherData && voucherData.length > 0 ? (
          voucherData.map((item) => <DiscountItem key={item._id} item={item} />)
        ) : (
          <p>There are currently no discount codes available!</p>
        )}
      </Container>
    </div>
  );
}
