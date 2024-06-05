import {useContext} from 'react';
import styles from './Header.module.css';
import UserContext from '../../store/auth-context';
import Button from '../UI/Button';

const EmailHeader = () => {
  const {logoutHandler, user} = useContext(UserContext);

  return (
    <header className={styles['main-header']}>
      <div className={styles.logo}>
        <span>User name: {user.username}</span>
        <span>Email: {user.email}</span>
      </div>
      <nav className={styles.nav}>
        <Button onClick={logoutHandler}>Logout</Button>
      </nav>
    </header>
  );
};

export default EmailHeader;
