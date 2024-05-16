import styles from './Layout.module.css';
import {Outlet} from 'react-router-dom';

const Layout = () => {
  return (
    <main className={styles.main}>
      <Outlet />
    </main>
  );
};

export default Layout;
