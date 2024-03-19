import React from "react";
import css from './loginForm.module.css'
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../customInput/CustomInput";
import { useLoginMutation } from "../../../redux/api/loginApi";


const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [login] = useLoginMutation();


    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Некорректный email").required("Обязательное поле"),
            password: Yup.string().required("Обязательное поле")
        }),
        onSubmit: async (values) => {
            const result = await login({ email: values.email, password: values.password });
            if ("data" in result) {
                const { token } = result.data;
                localStorage.setItem("token", token);
                localStorage.setItem("isAuth", "true");
                navigate('/');
            }

        }
    });

    return (
        <div>
            <div className={css.container}>
            <h3 className={css.title}>Вход</h3>
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
                {formik.touched.email && formik.errors.email ? (
                    <div style={{ color: "red", fontFamily: 'monospace' }}>{formik.errors.email}</div>
                    ) : null
                }

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
                {
                    formik.touched.password && formik.errors.password ? (
                        <div style={{ color: "red", fontFamily: 'monospace' }}>{formik.errors.password}</div>
                        ) : null
                    }

                <Link className={css.link} to="/registration">У меня нет аккаунта</Link>
                <div>
                    <button className={css.button}>Войти</button>
                </div>
            </form >
            </div>
        </div >
    );
};

export default LoginForm;
