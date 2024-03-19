import React, { useEffect } from "react"
import css from './home.module.css'
import { useNavigate } from "react-router";
import { useGetProductsQuery } from "../../redux/api/productApi";
import { useState } from 'react';
import Modal from "../../components/modal/Modal";
import AddProductForm from "../../components/forms/addProductForm/AddProductFrom";
import { useToggleFavoriteProductMutation } from "../../redux/api/favoriteProductsApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




interface HomeProps {

}



const Home: React.FC<HomeProps> = () => {
    const navigate = useNavigate();
    const notify = () => toast('Товар добавлен в «Избранное»');
    const { data: products = [], refetch } = useGetProductsQuery();
    const [toogleFavoriteProduct] = useToggleFavoriteProductMutation();

    const [isOpen, setIsOpen] = useState(false);


    const handleCloseModal = () => {
        setIsOpen(!isOpen);
    };

    const handleFavoriteProducts = () => {
        navigate('/favorites-products');
    }



    useEffect(() => {
        const isAuth = localStorage.getItem("isAuth");
        if (isAuth !== "true") {
            navigate("/login")
        }
        refetch();
    }, [navigate])


    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("isAuth")
        navigate("/login")
    }


    return <div>
        <div className={css.optionsBox}>
        <span className={css.options} onClick={handleCloseModal}>+ Добавить</span>
        <span className={css.options} onClick={handleFavoriteProducts}>Избранное</span>
        <span  className={css.options} onClick={logout}>Выйти</span>
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
            <AddProductForm closeModal={handleCloseModal} />
        </Modal>

        </div>
        <div className={css.productsField}>
        {products.map((el: any) => {
            return <div className={css.container}>
                <div className={css.box}>
                <h3 className={css.title}>{el.productName}</h3>
                <img className={css.photo} src={el.photoUrl} alt={el.productName} />
                <p className={css.quantity}>Осталось:{el.quantity}</p>
                <p className={css.price}>{el.price}c</p>
                <button className={css.button} onClick={() => { toogleFavoriteProduct(el._id)}}>
                    <img className={css.heart} onClick={notify} src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png" alt="favorite" />
                </button>
                </div>
                <ToastContainer/>
            </div>
        })}
        </div>
    </div>
}

export default Home;

