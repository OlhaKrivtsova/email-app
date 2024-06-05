import styles from './Email.module.css';

import {useContext, useEffect} from 'react';
import FormEmail from '../components/forms/FormEmail';
import EmailHeader from '../components/layout/EmailHeader';
import EmailContext from '../store/email-context';
import {getEmails} from '../utils/server-api';
import useHttp from '../hooks/use-http';
import UserContext from '../store/auth-context';
import Container from '../components/UI/Container';
import Modal from '../components/UI/Modal';
import Loader from '../components/UI/Loader';
import Pagination from '../components/Pagination/Pagination';
import Button from '../components/UI/Button';

const Email = () => {
  const {
    isFormEmailVisible,
    formEmailVisibleHandler,
    shouldRefreshEmails,
    emailLimitOnPage,
    pageNumber,
  } = useContext(EmailContext);

  const {credentials} = useContext(UserContext);

  const {sendHttpRequest, data, error, status} = useHttp(getEmails);
  const emails = data ? data.results : [];
  const totalAmountOfEmails = data === null ? null : data.count;

  useEffect(() => {
    const controller = {isIgnore: false};
    const firstRecord = (pageNumber - 1) * emailLimitOnPage;
    sendHttpRequest(
      {
        login: credentials.login,
        password: credentials.password,
        limit: emailLimitOnPage,
        offset: firstRecord,
      },
      controller
    );
    return () => (controller.isIgnore = true);
  }, [
    shouldRefreshEmails,
    credentials,
    emailLimitOnPage,
    pageNumber,
    sendHttpRequest,
  ]);

  const rows =
    totalAmountOfEmails !== 0 ? (
      emails.map(item => (
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.recipient}</td>
          <td>{item.subject}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={3}>There is no email yet</td>
      </tr>
    );
  return (
    <>
      <EmailHeader />
      <section>
        <Container>
          <Button className={styles.button} onClick={formEmailVisibleHandler}>
            Send Email
          </Button>
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
          <Pagination totalAmountOfEmails={totalAmountOfEmails} />
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
