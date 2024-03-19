import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css'; // импортируем стили из модульного CSS файла

const NotFound: React.FC = () => {
    return (
        <div className={styles.notFoundContainer}>
           <img className={styles.error} src="https://cdn-icons-png.flaticon.com/128/5545/5545083.png" alt="404" />
            <Link className={styles.link} to="/">Вернуться на главную</Link>
        </div>
    );
};

export default NotFound;
