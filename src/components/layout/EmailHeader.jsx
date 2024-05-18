import {useContext} from 'react';
import styles from './Header.module.css';
import UserContext from '../../store/auth-context';

const EmailHeader = () => {
  const {logoutHandler, user} = useContext(UserContext);

  return (
    <header className={styles['main-header']}>
      <div className={styles.logo}>
        <span>User name: {user.login}</span>
        <span>Email: {user.email}</span>
      </div>
      <nav className={styles.nav}>
        <button onClick={logoutHandler}>Logout</button>
      </nav>
    </header>
  );
};

export default EmailHeader;
