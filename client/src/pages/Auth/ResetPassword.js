import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import authApi from "../../api/authApi";
import styles from "./Auth.module.css";
function ResetPassword() {
  const params = useParams();
  const navigate = useNavigate();

  const { token } = params;

  const [tokenValue, setTokenValue] = useState("");

  useEffect(() => {
    if (token) setTokenValue(token);
  }, [token]);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      password: Yup.string().required("Không được bỏ trống trường này!"),
      confirmPassword: Yup.string()
        .required("Không được bỏ trống trường này!")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp!"),
    }),
    onSubmit: async () => {
      const { password } = formik.values;
      try {
        const res = await authApi.resetPassword({
          password,
          token: tokenValue,
        });
        if (!res.error) {
          alert("Đổi mật khẩu thành công");
          navigate({ pathname: "/dang-nhap" });
          return;
        } else {
          alert(res.message);
        }
      } catch (error) {
        alert(error);
      }
    },
  });

  return (
    <div className="h-screen ">
      <div className="px-10 py-10 ">
        <Link to={"/home"} className="text-red-600 text-xl font-semibold mt-4">
          SISS.com.vn
        </Link>
      </div>
      <div className=" h-full w-full flex justify-center  ">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-y-4 w-[650px]">
            <div className="text-2xl font-medium ">Reset your password</div>
            <div className={`form-group ${styles.formGroup}`}>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control  border-[#656ED3] border-2 rounded-full px-3 py-2 outline-none${
                  styles.formControl
                } ${formik.errors.password ? "is-invalid" : ""}`}
                autoComplete="on"
                placeholder="Mật khẩu"
                value={formik.values.password}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.password && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.password}
                </Form.Control.Feedback>
              )}
            </div>
            <div className={`form-group ${styles.formGroup}`}>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`form-control  border-[#656ED3] border-2 rounded-full px-3 py-2 outline-none ${
                  styles.formControl
                } ${formik.errors.confirmPassword ? "is-invalid" : ""}`}
                autoComplete="on"
                placeholder="Xác nhận mật khẩu"
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.errors.confirmPassword && (
                <Form.Control.Feedback type="invalid">
                  {formik.errors.confirmPassword}
                </Form.Control.Feedback>
              )}
            </div>
            <button className={`bookstore-btn ${styles.submitBtn}`}>
              Đổi mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
