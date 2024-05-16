import styles from './Header.module.css';
import {useContext} from 'react';
import UserContext from '../../store/auth-context';

const HomeHeader = props => {
  const {formSignUpVisibleHandler, formLoginVisibleHandler} =
    useContext(UserContext);

  return (
    <header className={styles['main-header']}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <button type='button' onClick={formLoginVisibleHandler}>
              Login
            </button>
          </li>
          <li>
            <button type='button' onClick={formSignUpVisibleHandler}>
              Sign up
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HomeHeader;
