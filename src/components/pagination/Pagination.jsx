import {useContext, useEffect} from 'react';
import styles from './Pagination.module.css';
import EmailContext from '../../store/email-context';

const Pagination = ({totalAmountOfEmails}) => {
  const {pageNumber, setPageNumber, emailLimitOnPage, setEmailLimitOnPage} =
    useContext(EmailContext);

  const amountOfPages = Math.ceil(totalAmountOfEmails / emailLimitOnPage);
  const pages = Array.from({length: amountOfPages}, (_, ind) => ind + 1);

  useEffect(() => {
    if (amountOfPages > 0 && pageNumber > amountOfPages) {
      setPageNumber(amountOfPages);
    }
  }, [amountOfPages, pageNumber, setPageNumber]);

  const choosePageHandler = event => {
    setPageNumber(+event.target.textContent);
  };

  const changeAmountHandler = event => {
    const newLimit = +event.target.value || emailLimitOnPage;
    setEmailLimitOnPage(newLimit);
  };

  const pageElements = pages.map(item => (
    <button
      key={item}
      className={`${styles.page} ${item === pageNumber ? styles.active : ''}`}
      type='button'
      onClick={choosePageHandler}
    >
      {item}
    </button>
  ));

  return (
    <div className={styles.pagination}>
      <div>
        <label htmlFor='amount'>Number of emails on a page</label>
        <input
          id='amount'
          type='number'
          min='1'
          max='100'
          step='1'
          name='amount'
          value={emailLimitOnPage}
          onChange={changeAmountHandler}
        />
      </div>
      <div className={styles.pages}>{pageElements}</div>
    </div>
  );
};

export default Pagination;
