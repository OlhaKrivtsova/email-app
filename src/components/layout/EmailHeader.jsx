import {useContext} from 'react';
import styles from './Header.module.css';
import UserContext from '../../store/auth-context';
import Container from '../../UI/Container';

const EmailHeader = props => {
  const {logoutHandler, user} = useContext(UserContext);

  return (
    <header className={styles['main-header']}>
      <div>
        User name: {user.login} Email: {user.email}
      </div>
      <nav className={styles.nav}>
        <button onClick={logoutHandler}>Logout</button>
      </nav>
    </header>
  );
};

export default EmailHeader;
