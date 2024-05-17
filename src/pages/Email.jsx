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

// const DUMMY_EMAILS = [
//   {id: 1, recipient: 'email1@com', subject: 'topic1'},
//   {id: 2, recipient: 'email2@com', subject: 'topic2'},
//   {id: 3, recipient: 'email3@com', subject: 'topic3'},
//   {id: 4, recipient: 'email4@com', subject: 'topic3'},
// ];

const Email = props => {
  const {
    isFormEmailVisible,
    formEmailVisibleHandler,
    shouldRefreshEmails,
    setShouldRefreshEmails,
    emailLimitOnPage,
  } = useContext(EmailContext);

  const {credentials} = useContext(UserContext);

  const {sendHttpRequest, data, error, status} = useHttp(getEmails);
  const emails = data ? data.results.toReversed() : [];
  console.log(data);

  console.log(emails);

  useEffect(() => {
    if (shouldRefreshEmails) {
      sendHttpRequest({
        login: credentials.login,
        password: credentials.password,
        limit: emailLimitOnPage,
      });
      setShouldRefreshEmails(false);
    }
  }, [shouldRefreshEmails]);

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
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>recipient</th>
                <th>subject</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
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
