import style from '@/components/header/header.module.css';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/auth/AuthContext';

const Header = () =>{
    const auth = useContext(AuthContext);

    const handleLogin = () =>{
        const validate = auth.signin('');
    }

    return (
        <div className={style.header}>
            <div className={style.logo}>
                <h1>Instant</h1>
                <h2>DO</h2>
                <h3>!</h3>
            </div>
            <div className={style.login}>
                <button onClick={handleLogin}>
                    <svg width="23px" height="28px" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.34375 13.7812L10.625 10.5L7.34375 7.21875" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M1.875 10.5H10.625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.625 3.625H15C15.1658 3.625 15.3247 3.69085 15.4419 3.80806C15.5592 3.92527 15.625 4.08424 15.625 4.25V16.75C15.625 16.9158 15.5592 17.0747 15.4419 17.1919C15.3247 17.3092 15.1658 17.375 15 17.375H10.625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Logar
                </button>
            </div>
        </div>
    )
}

export default Header;