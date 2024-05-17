import styles from './Form.module.css';
import useInput from '../../hooks/use-input';
import {useContext, useEffect} from 'react';
import UserContext from '../../store/auth-context';
import EmailContext from '../../store/email-context';
import useHttp from '../../hooks/use-http';
import {addEmail} from '../../utils/server-api';
import Modal from '../../UI/Modal';
import Loader from '../../UI/Loader';
import {
  emailValidator,
  subjectValidator,
  messageValidator,
} from '../../utils/input-validation';

const FormEmail = () => {
  const {user, credentials} = useContext(UserContext);

  const {formEmailVisibleHandler, refreshEmails} = useContext(EmailContext);

  const {sendHttpRequest, data: email, error, status} = useHttp(addEmail);

  useEffect(() => {
    if (status === 'completed' && !error) {
      formEmailVisibleHandler();
      refreshEmails();
    }
  }, [status, email, error, formEmailVisibleHandler, refreshEmails]);

  const {
    inputValue: inputRecipientEmail,
    isValueValid: isRecipientEmailValid,
    hasInputError: hasInputRecipientEmailError,
    changeInputHandler: changeInputRecipientEmailHandler,
    blurInputHandler: blurInputRecipientEmailHandler,
  } = useInput(emailValidator);

  const {
    inputValue: inputSubject,
    isValueValid: isSubjectValid,
    hasInputError: hasInputSubjectError,
    changeInputHandler: changeInputSubjectHandler,
    blurInputHandler: blurInputSubjectHandler,
  } = useInput(subjectValidator);

  const {
    inputValue: inputMessage,
    isValueValid: isMessageValid,
    hasInputError: hasInputMessageError,
    changeInputHandler: changeInputMessageHandler,
    blurInputHandler: blurInputMessageHandler,
  } = useInput(messageValidator);

  const inputRecipientEmailClassName = hasInputRecipientEmailError
    ? `${styles['form-control']} ${styles.invalid}`
    : styles['form-control'];

  const inputSubjectClassName = hasInputSubjectError
    ? `${styles['form-control']} ${styles.invalid}`
    : styles['form-control'];

  const inputMessageClassName = hasInputMessageError
    ? `${styles['form-control']} ${styles.invalid}`
    : styles['form-control'];

  const isFormValid = isRecipientEmailValid && isSubjectValid && isMessageValid;

  const submitHandler = event => {
    event.preventDefault();
    blurInputRecipientEmailHandler();
    blurInputSubjectHandler();
    blurInputMessageHandler();
    if (!isFormValid) return;
    const recipient = inputRecipientEmail;
    const subject = inputSubject;
    const message = inputMessage;
    // console.log(
    //   `the form has been sent with ${recipient} ${subject} ${message}`
    // );
    sendHttpRequest({
      emailData: {sender: user.id, recipient, subject, message},
      login: credentials.login,
      password: credentials.password,
    });
  };

  return (
    <>
      <form onSubmit={submitHandler} noValidate>
        <div className={styles['control-group']}>
          <div className={styles['form-control']}>
            <label htmlFor='senderEmail'>Sender</label>
            <input readOnly type='email' id='senderEmail' value={user.email} />
          </div>

          <div className={inputRecipientEmailClassName}>
            <label htmlFor='email'>Recipient</label>
            <input
              type='email'
              id='email'
              onChange={changeInputRecipientEmailHandler}
              onBlur={blurInputRecipientEmailHandler}
              value={inputRecipientEmail}
            />
            {hasInputRecipientEmailError && (
              <p className={styles['error-text']}>The wrong Email</p>
            )}
          </div>
          <div required className={inputSubjectClassName}>
            <label htmlFor='subject'>Subject</label>
            <input
              type='text'
              id='subject'
              onChange={changeInputSubjectHandler}
              onBlur={blurInputSubjectHandler}
              value={inputSubject}
            />
            {hasInputSubjectError && (
              <p className={styles['error-text']}>The wrong Subject</p>
            )}
          </div>
        </div>
        <div required className={inputMessageClassName}>
          <label htmlFor='message'>Message</label>
          <input
            type='text'
            id='message'
            onChange={changeInputMessageHandler}
            onBlur={blurInputMessageHandler}
            value={inputMessage}
          />
          {hasInputMessageError && (
            <p className={styles['error-text']}>The wrong Message</p>
          )}
        </div>
        <div className={styles['form-actions']}>
          <button type='button' onClick={formEmailVisibleHandler}>
            Cancel
          </button>
          <button type='submit'> Send</button>
        </div>
      </form>
      {status === 'pending' && <Loader />}
      {error && (
        <Modal>
          <p>{error}</p>
        </Modal>
      )}
    </>
  );
};

export default FormEmail;