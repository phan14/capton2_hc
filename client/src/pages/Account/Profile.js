import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { updateFullName } from "../../redux/actions/auth";
import userApi from "../../api/userApi";
import styles from "./Account.module.css";

export default function Profile() {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.auth);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const res = await userApi.getById(currentUser.userId);
        const data = res.data;
        console.log(data);
        setProfile({
          _id: data._id,
          email: data.email,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          birthday: data.birthday,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser?.userId) {
      fetchDataUser();
    }
  }, [currentUser]);

  const formik = useFormik({
    initialValues: {
      fullName: profile.fullName ? profile.fullName : "",
      phoneNumber: profile.phoneNumber ? profile.phoneNumber : "",
      gender: profile && profile.gender,
      birthday: profile.birthday ? profile.birthday : "",
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
      fullName: Yup.string().required("This field cannot be left blank!"),
      phoneNumber: Yup.string()
        .required("This field cannot be left blank!")
        .test("VALID", "Invalid phone number!", (value) => {
          const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
          return regex.test(value);
        }),
      gender: Yup.number().required("This field cannot be left blank!"),
      birthday: Yup.string().required("This field cannot be left blank!"),
    }),
    onSubmit: async () => {
      console.log("kiem tra", formik.values);
      const { fullName, gender, phoneNumber, birthday } = formik.values;
      try {
        const result = await userApi.updateById(profile._id, {
          fullName,
          gender,
          phoneNumber,
          birthday,
        });
        dispatch(updateFullName({ fullName: result.data.fullName }));
        toast.success("Update successful!", { autoClose: 2000 });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="">
      <form onSubmit={formik.handleSubmit}>
        <div className={`form-group ${styles.formGroup}`}>
          <label className={styles.formLabel}>Email</label>
          <input
            type="email"
            name="email"
            className={`form-control ${styles.formControl}`}
            placeholder="Email"
            value={profile && profile.email ? profile.email : ""}
            readOnly
          />
        </div>
        <div className={`form-group ${styles.formGroup}`}>
          <label className={styles.formLabel}>Fulname</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className={`form-control ${styles.formControl} ${
              formik.errors.fullName ? "is-invalid" : "is-valid"
            }`}
            placeholder="Fullname"
            value={formik.values.fullName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.fullName && (
            <Form.Control.Feedback type="invalid" className={styles.feedback}>
              {formik.errors.fullName}
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
          />
          {formik.errors.phoneNumber && (
            <Form.Control.Feedback type="invalid" className={styles.feedback}>
              {formik.errors.phoneNumber}
            </Form.Control.Feedback>
          )}
        </div>

        <div className={`form-group ${styles.formGroup}`}>
          <label className={styles.formLabel}>Sex</label>
          <div className={styles.radioItem}>
            <input
              type="radio"
              name="gender"
              className="form-radio"
              value="0"
              checked={parseInt(formik.values.gender) === 0}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />{" "}
            Men
          </div>
          <div className={styles.radioItem}>
            <input
              type="radio"
              name="gender"
              className="form-radio"
              value="1"
              checked={parseInt(formik.values.gender) === 1}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />{" "}
            Girl
          </div>
        </div>

        <div className={`form-group ${styles.formGroup}`}>
          <label className={styles.formLabel}>Date of birth</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            className={`form-control ${styles.formControl} ${
              formik.errors.birthday ? "is-invalid" : "is-valid"
            }`}
            value={formik.values.birthday}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {formik.errors.birthday && (
            <Form.Control.Feedback type="invalid" className={styles.feedback}>
              {formik.errors.birthday}
            </Form.Control.Feedback>
          )}
        </div>

        <button
          type="submit"
          className={`bookstore-btn ${styles.submitBtn}`}
          disabled={
            formik.errors.fullName ||
            formik.errors.phoneNumber ||
            formik.errors.birthday
          }
        >
          Update
        </button>
      </form>
    </div>
  );
}
