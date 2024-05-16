import styles from './Form.module.css';
import useInput from '../../hooks/use-input';
import {useContext, useEffect} from 'react';
import UserContext from '../../store/auth-context';
import useHttp from '../../hooks/use-http';
import {addUser} from '../../utils/server-api';

const FormSignUp = props => {
  const {formSignUpVisibleHandler, signUpHandler, setUserHandler} =
    useContext(UserContext);

  const {sendHttpRequest, data: user, error, status} = useHttp(addUser);

  useEffect(() => {
    if (status === 'completed' && !error) {
      setUserHandler(user.id, user.username, user.email);
      signUpHandler(inputLogin, inputPassword, user);
      formSignUpVisibleHandler();
      resetInputLoginState();
      resetInputEmailState();
      resetInputPasswordState();
    }
  }, [status, user, error, setUserHandler, signUpHandler]);

  const {
    inputValue: inputLogin,
    isValueValid: isLoginValid,
    hasInputError: hasInputLoginError,
    changeInputHandler: changeInputLoginHandler,
    blurInputHandler: blurInputLoginHandler,
    resetInputState: resetInputLoginState,
  } = useInput(val => val.trim() !== '');

  const {
    inputValue: inputEmail,
    isValueValid: isEmailValid,
    hasInputError: hasInputEmailError,
    changeInputHandler: changeInputEmailHandler,
    blurInputHandler: blurInputEmailHandler,
    resetInputState: resetInputEmailState,
  } = useInput(val => val.includes('@'));

  const {
    inputValue: inputPassword,
    isValueValid: isPasswordValid,
    hasInputError: hasInputPasswordError,
    changeInputHandler: changeInputPasswordHandler,
    blurInputHandler: blurInputPasswordHandler,
    resetInputState: resetInputPasswordState,
  } = useInput(val => val.trim() !== '');

  const inputLoginClassName = hasInputLoginError
    ? `${styles['form-control']} ${styles.invalid}`
    : styles['form-control'];

  const inputEmailClassName = hasInputEmailError
    ? `${styles['form-control']} ${styles.invalid}`
    : styles['form-control'];

  const inputPasswordClassName = hasInputPasswordError
    ? `${styles['form-control']} ${styles.invalid}`
    : styles['form-control'];

  const isFormValid = isLoginValid && isEmailValid && isPasswordValid;

  const submitHandler = event => {
    event.preventDefault();
    blurInputLoginHandler();
    blurInputEmailHandler();
    blurInputPasswordHandler();
    if (!isFormValid) return;
    const login = inputLogin;
    const email = inputEmail;
    const password = inputPassword;
    console.log(`the form has been sent with ${login} ${email} ${password}`);
    sendHttpRequest({username: login, email: email, password: password});
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
        <div required className={inputEmailClassName}>
          <label htmlFor='email'>Enter Email</label>
          <input
            type='email'
            id='email'
            onChange={changeInputEmailHandler}
            onBlur={blurInputEmailHandler}
            value={inputEmail}
          />
          {hasInputEmailError && (
            <p className={styles['error-text']}>Email should not be empty</p>
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
        <button type='button' onClick={formSignUpVisibleHandler}>
          Cancel
        </button>
        <button type='submit'> Sign Up</button>
      </div>
    </form>
  );
};

export default FormSignUp;
