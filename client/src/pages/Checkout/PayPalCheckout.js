import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import orderApi from "../../api/orderApi"

export default function PayPalCheckout() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const orderId = searchParams.get("orderId")
  const resultCode = searchParams.get("resultCode")

  useEffect(() => {

    const verify = async () => {
      try {
        await orderApi.verifyPayPal({ paymentId: orderId })
        navigate({ pathname: '/don-hang' })
      } catch (error) {
        console.log(error)
      }
    }
    verify()

  }, [orderId, resultCode, navigate])

  return <h1>Đang xử lý...</h1>
}