import styles from './Button.module.css';

const Button = ({children, className = '', type = 'button', ...props}) => {
  return (
    <button
      className={[className, styles.button].join(' ')}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
