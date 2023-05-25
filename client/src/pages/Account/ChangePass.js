import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form } from "react-bootstrap"
import { toast } from 'react-toastify';
import userApi from "../../api/userApi"
import styles from "./Account.module.css"
import authApi from "../../api/authApi";
import bcrypt from 'bcryptjs';

export default function Profile() {

  const currentUser = useSelector((state) => state.auth)
  const [oldPass, setOldPass] = useState();
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const res = await userApi.getById(currentUser.userId)
        const data = res.data
        setOldPass(data.password)
      } catch (error) {
        console.log(error)
      }
    }

    if (currentUser?.userId) {
      fetchDataUser()
    }
  }, [oldPass,currentUser])


  const formik = useFormik({
    initialValues: {
        oldpass: '',
        newpass: '',
        cfpass: '',
    },
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
    validationSchema: Yup.object({
        oldpass: Yup.string()
        .required('Old password is not empty')
        .min(6, 'Your old password must be at least 6 characters'),
    newpass: Yup.string()
        .required('New password is not empty')
        .min(6, 'Your new password has at least 6 characters'),
    cfpass: Yup.string()
        .required('Confirm password is not empty')
        .oneOf([Yup.ref('newpass'), null], 'Passwords must match'),
    }),
    onSubmit: async () => {
        const { oldpass, newpass} = formik.values
        bcrypt.compare(oldpass, oldPass, async(err, result) => {
            if (err) {
              console.error('Error comparing passwords:', err);
              return;
            }
          
            if (result) {
                try {
                    await authApi.resetPassword({token: token, password: newpass})
                    .then(()=>{
                        toast.success('Change Password Successful!', { autoClose: 2000 })
                        setOldPass('');
                        formik.resetForm();
                    }).catch(()=>{
                        toast.success('Change Password Fail!', { autoClose: 2000 })
                        setOldPass('');
                    });

                } catch (error) {
                    console.log(error)
                }
            } else {
                formik.setErrors({
                    oldpass: 'Current password is not correct',
                })
            }
          });
    }

    
});

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={`form-group ${styles.formGroup}`}>
        <label className={styles.formLabel}>Current Password</label>
        <input
          type="password"
          name="oldpass"
          className={`form-control ${styles.formControl}`}
          placeholder="Current Password"
          value={formik.values.oldpass}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {
            formik.errors.oldpass && formik.touched.oldpass ? (
                <p className="text-red-400 text-[13px] pl-[150px] pt-[5px]">{formik.errors.oldpass}</p>
            ) : null
        }
      </div>
      <div className={`form-group ${styles.formGroup}`}>
        <label className={styles.formLabel}>New Password</label>
        <input
          type="password"
          name="newpass"
          className={`form-control ${styles.formControl}`}
          placeholder="New Password"
          value={formik.values.newpass}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {
            formik.errors.newpass && formik.touched.newpass ? (
                <p className="text-red-400 text-[13px] pl-[150px] pt-[5px]">{formik.errors.newpass}</p>
            ) : null
        }
      </div>
      <div className={`form-group ${styles.formGroup}`}>
        <label className={styles.formLabel}>Confirm</label>
        <input
          type="password"
          name="cfpass"
          className={`form-control ${styles.formControl}`}
          placeholder="Confirm Password"
          value={formik.values.cfpass}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {
            formik.errors.cfpass && formik.touched.cfpass ? (
                <p className="text-red-400 text-[13px] pl-[150px] pt-[5px]">{formik.errors.cfpass}</p>
            ) : null
        }
      </div>

      <button type="submit" className={`bookstore-btn ${styles.submitBtn}`} 
      disabled={formik.errors.oldpass || formik.errors.newpass || formik.errors.cfpass} >
        Update
      </button>
    </form>
  );
}
