import React from "react";
import css from './registrationForm.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../customInput/CustomInput";
import { useCreateUserMutation } from "../../../redux/api/usersApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm: React.FC = () => {
    const navigate = useNavigate();
    const notify = () => toast('Вы успешно зарегистрировались!');
    const [createUser] = useCreateUserMutation();

    const formik = useFormik({
        initialValues: {
            email: "",
            userName: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Некорректный email").required("Обязательное поле"),
            userName: Yup.string().required("Обязательное поле"),
            password: Yup.string().required("Обязательное поле")
        }),
        onSubmit: async (values) => {
            const { email, userName, password } = values;
            const result = await createUser({ email, userName, password });
            if (result) {
                navigate("/login");
            }
        }
    });

    return (
        <div>
            <div className={css.container}>
            <h3 className={css.title}>Регистрация</h3>
            <form onSubmit={formik.handleSubmit}>
            <label className={css.label}>Эл.почта</label>
                <Input className={css.input}
                    type="email"
                    name="email"
                    placeholder="Эл.почта"
                    width="300px"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                    <div style={{ color: "red", fontFamily: 'monospace' }}>{formik.errors.email}</div>
                )}

                <label className={css.label}>Имя пользователя</label>
                <Input className={css.input}
                type="text"
                    name="userName"
                    placeholder="Имя пользователя"
                    width="300px"
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.userName && formik.errors.userName && (
                    <div style={{ color: "red", fontFamily: 'monospace' }}>{formik.errors.userName}</div>
                )}

                <label className={css.label}>Пароль</label>
                <Input className={css.input}
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    width="300px"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    />
                {formik.touched.password && formik.errors.password && (
                    <div style={{ color: "red", fontFamily: 'monospace' }}>{formik.errors.password}</div>
                    )}

                <Link className={css.link} to="/login">Уже есть аккаунт</Link>
                <div>
                    <button className={css.button} onClick={notify}>Зарегистрироваться</button>
                </div>
            </form>
            </div>
            <ToastContainer/>
        </div>
    );
};

export default RegistrationForm;
