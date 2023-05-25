import { Container, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import OAuth2Login from "react-simple-oauth2-login";

import authApi from "../../api/authApi";
import { login } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import login2 from "../../assets/images/login2.png";

import styles from "./Auth.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const responseSuccessGoogle = async (response) => {
    try {
      const accessToken = response?.access_token;
      const { token, user } = await authApi.loginWithGoogle(accessToken);
      console.log(token, user);
      localStorage.setItem("accessToken", token);
      const { email, fullName, phoneNumber, userId, avatar, role } = user;
      dispatch(login({ email, fullName, phoneNumber, avatar, userId, role }));
      navigate({ pathname: "/home" });
    } catch (error) {
      console.log(error);
    }
  };

  const responseFailureGoogle = (response) => {
    console.log(response);
  };

  const responseSuccessFacebook = async (response) => {
    const accessToken = response.access_token;
    // Lay Profile Facebook thong qua AccessToken

    const result = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${accessToken}`
    );
    const data = await result.json();
    console.log(data);
    const { email, id, name } = data;
    localStorage.setItem("data", data);
    const avatarFB = data?.picture?.data.url;

    const { token, user } = await authApi.loginWithFacebook({
      email,
      id,
      name,
      avatar: avatarFB,
    });
    localStorage.setItem("accessToken", token);
    const { userId, role, phoneNumber, avatar } = user;
    dispatch(
      login({ email, fullName: name, phoneNumber, avatar, userId, role })
    );
    navigate({ pathname: "/home" });
  };

  const responseFailureFacebook = (response) => {
    console.log(response);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate({ pathname: "/home" });
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await authApi.login({ email, password });
      setLoading(false);

      // Nhan token tu server
      const { token, user } = res;
      localStorage.setItem("accessToken", token);
      const { fullName, phoneNumber, userId, avatar, role } = user;
      dispatch(login({ email, fullName, phoneNumber, avatar, userId, role }));
      navigate({ pathname: "/home" });
    } catch (error) {
      setLoading(false);
      console.log(error.response.data.error);
      if (error.response.data.error === 2) {
        setShowModal(true);
      }
      console.log(error);
    }
  };

  const handleSendEmail = async () => {
    try {
      const { error } = await authApi.requestActiveAccount({ email });
      if (!error) {
        alert("Please check your email to activate your account!");
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className={styles.loginPage}>
        <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Thông báo</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tài khoản của bạn chưa được xác minh.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Hủy
            </Button>
            <Button variant="danger" onClick={handleSendEmail}>
              Gửi lại Email
            </Button>
          </Modal.Footer>
        </Modal>
        <Container>
          <div className="flex h-screen flex-col justify-between mt-[20px] lg:flex-row xl:mt-0 md:items-center">
            <div className=" w-[640px] flex flex-col gap-y-3 2xl:ml-10 xs:ml-0 xs:w-[460px] lg:w-[630px] lg:mr-2 justify-center">
              <Link
                to={"/home"}
                className="text-red-600 text-xl font-semibold mt-4"
              >
                SCIS.com.vn
              </Link>
              <div className="ml-10 flex flex-col gap-y-4">
                <div className="text-3xl font-bold mt-10 mb-4">
                  Login to your Scis
                </div>
              </div>
              <form className="form-login" onSubmit={handleLogin}>
                <div className={`form-group ${styles.formGroup}`}>
                  <input
                    required
                    type="text"
                    name="email"
                    className="border-[#656ED3] border-2 rounded-full px-4 py-2 outline-none form-control "
                    placeholder="Email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className={`form-group ${styles.formGroup}`}>
                  <input
                    required
                    type="password"
                    name="password"
                    className="border-[#656ED3] border-2 rounded-full px-4 py-2 outline-none form-control mb-4"
                    autoComplete="on"
                    placeholder="Mật khẩu..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Link
                  className={` ${styles.forgotPassword}`}
                  to="/quen-mat-khau"
                >
                  Forgot password
                </Link>
                <button
                  className={`bookstore-btn ${styles.submitBtn}`}
                  disabled={loading}
                >
                  {loading ? "Log in..." : "log in"}
                </button>
              </form>
              <p style={{ textAlign: "center" }}>
                Don't have an account?{" "}
                <Link to="/dang-ki" style={{ color: "#0074da" }}>
                  Sign up
                </Link>
              </p>
              <p
                className="py-2"
                style={{ color: "#ccc", textAlign: "center" }}
              >
                OR
              </p>

              <div className="flex justify-around items-center">
                <div className={styles.boxLoginThirdParty}>
                  <img
                    src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png"
                    alt=""
                  />
                  <OAuth2Login
                    className="bookstore-btn"
                    buttonText="Login with Google"
                    authorizationUrl="https://accounts.google.com/o/oauth2/auth"
                    responseType="token"
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    redirectUri={process.env.REACT_APP_REDIRECT_LOGIN_GOOGLE}
                    scope="email profile"
                    onSuccess={responseSuccessGoogle}
                    onFailure={responseFailureGoogle}
                  ></OAuth2Login>
                </div>

                <div className={styles.boxLoginThirdParty}>
                  <img
                    src="https://cdn.pixabay.com/photo/2015/05/17/10/51/facebook-770688_1280.png"
                    alt=""
                  />
                  <OAuth2Login
                    className="bookstore-btn"
                    buttonText="Login with Facebook"
                    authorizationUrl="https://www.facebook.com/dialog/oauth"
                    responseType="token"
                    clientId="990086591697823"
                    redirectUri={process.env.REACT_APP_REDIRECT_LOGIN_FACEBOOK}
                    scope="public_profile"
                    onSuccess={responseSuccessFacebook}
                    onFailure={responseFailureFacebook}
                  ></OAuth2Login>
                </div>
              </div>
            </div>
            <div className="hidden lg:block mt-6">
              <img
                src={login2}
                alt=""
                className="h-screen object-cover w-[640px] "
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Login;
