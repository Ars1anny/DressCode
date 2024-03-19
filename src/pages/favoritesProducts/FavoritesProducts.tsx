import React from "react"
import css from './favorites.module.css'
import { useNavigate } from "react-router";
import { useGetFavoriteProductsQuery } from "../../redux/api/favoriteProductsApi";

const FavotiresProducts: React.FC = () => {
    const symvol = '< ';
    const navigate = useNavigate();
    const { data: products = [] } = useGetFavoriteProductsQuery();

    const handleBackToHome = () => {
        navigate('/');
    }

    return <div>
        <button className={css.back} onClick={handleBackToHome}>{symvol}Вернуться</button>
     <div className={css.productsField}>
        {products.map((el: any) => {
            const { productName } = el.product
            const { price } = el.product
            const { photoUrl } = el.product
            const { quantity } = el.product
            
            return <div>
                <div className={css.container}>
                    <div className={css.box}>
                <h2 className={css.title}>{productName}</h2>
                <img className={css.photo} src={photoUrl} alt={productName} />
                <p className={css.quantity}>Осталось:{quantity}</p>
                <p className={css.price}>{price}с</p>
                    </div>
                </div>
            </div>
        })}    
        </div>
    </div>
    }

export default FavotiresProducts;