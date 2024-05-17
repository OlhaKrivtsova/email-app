import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.centered}>
      <div className={styles['lds-hourglass']}></div>
    </div>
  );
};

export default Loader;
