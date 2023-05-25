import { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import authApi from "../../api/authApi";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";
function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [sentEmail, setSentEmail] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmitResetPassword = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await authApi.forgotPassword({ email });
      setLoading(false);
      setSentEmail(true);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="h-screen ">
      <div className="px-10 py-10 ">
        <Link to={"/"} className="text-red-600 text-xl font-semibold mt-4">
          SCIS.com.vn
        </Link>
      </div>
      <div className=" h-full w-full flex justify-center">
        <div className={`w-[40%]  ${sentEmail ? styles.sent : ""}`}>
          {!sentEmail && (
            <form onSubmit={handleSubmitResetPassword}>
              <div className="flex flex-col gap-y-4">
                <div className="text-2xl font-medium ">Reset your password</div>
                <p className={styles.info}>
                  Enter your account as a verified email. We will send you a
                  link to recover your password.
                </p>

                <div className={`form-group ${styles.formGroup}`}>
                  <input
                    required
                    type="email"
                    name="email"
                    className="form-control border-[#656ED3] border-2 rounded-full px-3 py-2 outline-none"
                    placeholder="Nhập Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {loading && (
                  <div className="row">
                    <Spinner
                      style={{ margin: "0 auto" }}
                      animation="border"
                      variant="success"
                    />
                  </div>
                )}
                <button className={`bookstore-btn ${styles.submitBtn}`}>
                  Gửi
                </button>
              </div>
            </form>
          )}
          {sentEmail && (
            <div>
              <p>
                Please check email <b>{email}</b> for the password reset link.
                It may take a few minutes, check even in the spam folder.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
