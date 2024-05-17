import styles from './CloseIcon.module.css';
import icons from '../../assets/icons.svg';

const CloseIcon = ({className = ''}) => {
  return (
    <svg className={[className, styles.icon].join(' ')}>
      <use href={`${icons}#icon-close`}></use>
    </svg>
  );
};

export default CloseIcon;
