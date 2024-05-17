import {useContext, useEffect} from 'react';
import useInput from '../../hooks/use-input';
import styles from './Form.module.css';
import UserContext from '../../store/auth-context';
import useHttp from '../../hooks/use-http';
import {authUser} from '../../utils/server-api';
import {loginValidator, passwordValidator} from '../../utils/input-validation';
import Modal from '../../UI/Modal';
import Loader from '../../UI/Loader';

const FormLogin = props => {
  const {formLoginVisibleHandler, loginHandler, setUserHandler, credentials} =
    useContext(UserContext);

  const {sendHttpRequest, data: user, error, status} = useHttp(authUser);

  useEffect(() => {
    if (status === 'completed' && !error) {
      setUserHandler(user.id, user.username, user.email);
      loginHandler(user);
      formLoginVisibleHandler();
    }
  }, [
    status,
    user,
    error,
    loginHandler,
    setUserHandler,
    formLoginVisibleHandler,
  ]);

  const {
    inputValue: inputLogin,
    isValueValid: isLoginValid,
    hasInputError: hasInputLoginError,
    changeInputHandler: changeInputLoginHandler,
    blurInputHandler: blurInputLoginHandler,
  } = useInput(loginValidator, credentials.login);

  const {
    inputValue: inputPassword,
    isValueValid: isPasswordValid,
    hasInputError: hasInputPasswordError,
    changeInputHandler: changeInputPasswordHandler,
    blurInputHandler: blurInputPasswordHandler,
  } = useInput(passwordValidator, credentials.password);

  const inputLoginClassName = hasInputLoginError
    ? `${styles['form-control']} ${styles.invalid}`
    : styles['form-control'];

  const inputPasswordClassName = hasInputPasswordError
    ? `${styles['form-control']} ${styles.invalid}`
    : styles['form-control'];

  const isFormValid = isLoginValid && isPasswordValid;

  const submitHandler = event => {
    event.preventDefault();
    blurInputLoginHandler();
    blurInputPasswordHandler();
    if (!isFormValid) return;
    const login = inputLogin;
    const password = inputPassword;
    // console.log(`the form has been sent with ${login} ${password}`);
    sendHttpRequest({login, password});
  };

  return (
    <>
      <form onSubmit={submitHandler} noValidate>
        <div className={styles['control-group']}>
          <div className={inputLoginClassName}>
            <label htmlFor='login'>User Name</label>
            <input
              type='text'
              id='login'
              onChange={changeInputLoginHandler}
              onBlur={blurInputLoginHandler}
              value={inputLogin}
            />
            {hasInputLoginError && (
              <p className={styles['error-text']}>The wrong User Name</p>
            )}
          </div>
        </div>
        <div className={inputPasswordClassName}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            onChange={changeInputPasswordHandler}
            onBlur={blurInputPasswordHandler}
            value={inputPassword}
          />
          {hasInputPasswordError && (
            <p className={styles['error-text']}>The wrong Password</p>
          )}
        </div>
        <div className={styles['form-actions']}>
          <button type='button' onClick={formLoginVisibleHandler}>
            Cancel
          </button>
          <button type='submit'>Login</button>
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

export default FormLogin;
