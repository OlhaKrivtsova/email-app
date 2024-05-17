import styles from './Email.module.css';

import {useContext, useEffect} from 'react';
import FormEmail from '../components/forms/FormEmail';
import EmailHeader from '../components/layout/EmailHeader';
import EmailContext from '../store/email-context';
import {getEmails} from '../utils/server-api';
import useHttp from '../hooks/use-http';
import UserContext from '../store/auth-context';
import Container from '../UI/Container';
import Modal from '../UI/Modal';
import Loader from '../UI/Loader';
import Pagination from '../components/pagination/Pagination';

const Email = () => {
  const {
    isFormEmailVisible,
    formEmailVisibleHandler,
    shouldRefreshEmails,
    emailLimitOnPage,
    setTotalAmountOfEmails,
    pageNumber,
  } = useContext(EmailContext);

  const {credentials} = useContext(UserContext);

  const {sendHttpRequest, data, error, status} = useHttp(getEmails);
  const emails = data ? data.results : [];

  useEffect(() => {
    if (data) setTotalAmountOfEmails(data.count);
  }, [data, setTotalAmountOfEmails]);

  useEffect(() => {
    const firstRecord = (pageNumber - 1) * emailLimitOnPage;

    sendHttpRequest({
      login: credentials.login,
      password: credentials.password,
      limit: emailLimitOnPage,
      offset: firstRecord,
    });
  }, [
    shouldRefreshEmails,
    credentials,
    emailLimitOnPage,
    pageNumber,
    sendHttpRequest,
  ]);

  const rows = emails.map(item => (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.recipient}</td>
      <td>{item.subject}</td>
    </tr>
  ));
  return (
    <>
      <EmailHeader />
      <section>
        <Container>
          <button onClick={formEmailVisibleHandler}>Send Email</button>
          {isFormEmailVisible && <FormEmail />}
          <br />
          <table className={styles.table}>
            <thead>
              <tr>
                <th>id</th>
                <th>recipient</th>
                <th>subject</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
          <Pagination />
        </Container>
        {status === 'pending' && <Loader />}
        {error && (
          <Modal>
            <p>{error}</p>
          </Modal>
        )}
      </section>
    </>
  );
};

export default Email;
