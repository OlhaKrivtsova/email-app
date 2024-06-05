import styles from './Header.module.css';
import {useContext} from 'react';
import UserContext from '../../store/auth-context';
import Button from '../UI/Button';

const HomeHeader = () => {
  const {formSignUpVisibleHandler, formLoginVisibleHandler} =
    useContext(UserContext);

  return (
    <header className={styles['main-header']}>
      <div className={styles.logo}>Email App</div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Button type='button' onClick={formLoginVisibleHandler}>
              Login
            </Button>
          </li>
          <li>
            <Button type='button' onClick={formSignUpVisibleHandler}>
              Sign up
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HomeHeader;
