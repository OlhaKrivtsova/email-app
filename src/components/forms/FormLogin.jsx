import {useContext, useEffect} from 'react';
import useInput from '../../hooks/use-input';
import styles from './Form.module.css';
import UserContext from '../../store/auth-context';
import useHttp from '../../hooks/use-http';
import {authUser} from '../../utils/server-api';

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
  }, [status, user, error, loginHandler, setUserHandler]);

  const {
    inputValue: inputLogin,
    isValueValid: isLoginValid,
    hasInputError: hasInputLoginError,
    changeInputHandler: changeInputLoginHandler,
    blurInputHandler: blurInputLoginHandler,
    resetInputState: resetInputLoginState,
  } = useInput(val => val.trim() !== '', credentials.login);

  const {
    inputValue: inputPassword,
    isValueValid: isPasswordValid,
    hasInputError: hasInputPasswordError,
    changeInputHandler: changeInputPasswordHandler,
    blurInputHandler: blurInputPasswordHandler,
    resetInputState: resetInputPasswordState,
  } = useInput(val => val.trim() !== '', credentials.password);

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

    resetInputLoginState();
    resetInputPasswordState();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles['control-group']}>
        <div className={inputLoginClassName}>
          <label htmlFor='login'>Enter login</label>
          <input
            type='text'
            id='login'
            onChange={changeInputLoginHandler}
            onBlur={blurInputLoginHandler}
            value={inputLogin}
          />
          {hasInputLoginError && (
            <p className={styles['error-text']}>Login should not be empty</p>
          )}
        </div>
      </div>
      <div required className={inputPasswordClassName}>
        <label htmlFor='password'>Enter password</label>
        <input
          type='password'
          id='password'
          onChange={changeInputPasswordHandler}
          onBlur={blurInputPasswordHandler}
          value={inputPassword}
        />
        {hasInputPasswordError && (
          <p className={styles['error-text']}>Password should not be empty</p>
        )}
      </div>
      <div className={styles['form-actions']}>
        <button type='button' onClick={formLoginVisibleHandler}>
          Cancel
        </button>
        <button type='submit'>Login</button>
      </div>
    </form>
  );
};

export default FormLogin;
