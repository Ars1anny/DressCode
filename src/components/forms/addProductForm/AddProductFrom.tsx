import React from "react";
import css from "./addProduct.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../customInput/CustomInput";
import { useCreateProductMutation } from "../../../redux/api/productApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface FormValues {
    productName: string;
    quantity: number;
    price: number;
    photoUrl: string;
}

interface ProductFormProps {
    closeModal: () => void
}

const ProductForm: React.FC<ProductFormProps> = ({ closeModal }) => {
    const notify = () => toast('Товар успешно добавлен!');
    const [createProduct] = useCreateProductMutation();

    const formik = useFormik<FormValues>({
        initialValues: {
            productName: "",
            quantity: 0,
            price: 0,
            photoUrl: ""
        },
        validationSchema: Yup.object({
            productName: Yup.string().required("Обязательное поле"),
            quantity: Yup.number().required("Обязательное поле").positive("Должно быть положительным числом"),
            price: Yup.number().required("Обязательное поле").positive("Должно быть положительным числом"),
            photoUrl: Yup.string().required("Обязательное поле").url("Некорректный URL")
        }),
        onSubmit: async (values: any) => {
            try {
                await createProduct(values);
                closeModal();
                // Успешно отправлено
            } catch (error) {
                console.error("Ошибка при отправке формы:", error);
                // Обработка ошибки
            }
        }
    });

    return (
        <div>
            <h3 className={css.title}>Добавить товар</h3>
            <form onSubmit={formik.handleSubmit}>
                <label className={css.label}>Название продукта</label>
                <Input className={css.input}
                    type="text" 
                    name="productName"
                    placeholder="Название продукта"
                    width="300px"
                    value={formik.values.productName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.productName && formik.errors.productName && (
                    <div style={{ color: "red", fontFamily: 'monospace' }}>{formik.errors.productName}</div>
                )}

                <label className={css.label}>Количество</label>
                <Input className={css.input}
                    type="number"
                    name="quantity"
                    placeholder="Количество"
                    width="300px"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.quantity && formik.errors.quantity && (
                    <div style={{ color: "red", fontFamily: 'monospace'  }}>{formik.errors.quantity}</div>
                )}

                <label className={css.label}>Стоимость</label>
                <Input className={css.input}
                    type="number"
                    name="price"
                    placeholder="Стоимость"
                    width="300px"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.price && formik.errors.price && (
                    <div style={{ color: "red", fontFamily: 'monospace'  }}>{formik.errors.price}</div>
                )}

                <label className={css.label}>URL</label>
                <Input className={css.input}
                    type="text"
                    name="photoUrl"
                    placeholder="URL-ссылка"
                    width="300px"
                    value={formik.values.photoUrl}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.photoUrl && formik.errors.photoUrl && (
                    <div style={{ color: "red", fontFamily: 'monospace'  }}>{formik.errors.photoUrl}</div>
                )}

                <button className={css.button} onClick={notify} type="submit">Добавить</button>
            </form>
            <ToastContainer/>
        </div>
    );
};

export default ProductForm;
