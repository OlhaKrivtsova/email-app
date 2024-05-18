import styles from './Form.module.css';
import useInput from '../../hooks/use-input';
import {useContext, useEffect} from 'react';
import UserContext from '../../store/auth-context';
import useHttp from '../../hooks/use-http';
import {addUser} from '../../utils/server-api';
import {
  emailValidator,
  loginValidator,
  passwordValidator,
} from '../../utils/input-validation';
import Modal from '../../UI/Modal';
import Loader from '../../UI/Loader';

const FormSignUp = () => {
  const {formSignUpVisibleHandler, signUpHandler, setUserHandler} =
    useContext(UserContext);

  const {sendHttpRequest, data: user, error, status} = useHttp(addUser);

  const {
    inputValue: inputLogin,
    isValueValid: isLoginValid,
    hasInputError: hasInputLoginError,
    changeInputHandler: changeInputLoginHandler,
    blurInputHandler: blurInputLoginHandler,
  } = useInput(loginValidator);

  const {
    inputValue: inputEmail,
    isValueValid: isEmailValid,
    hasInputError: hasInputEmailError,
    changeInputHandler: changeInputEmailHandler,
    blurInputHandler: blurInputEmailHandler,
  } = useInput(emailValidator);

  const {
    inputValue: inputPassword,
    isValueValid: isPasswordValid,
    hasInputError: hasInputPasswordError,
    changeInputHandler: changeInputPasswordHandler,
    blurInputHandler: blurInputPasswordHandler,
  } = useInput(passwordValidator);

  useEffect(() => {
    if (status === 'completed' && !error) {
      setUserHandler(user.id, user.username, user.email);
      signUpHandler(inputLogin, inputPassword, user);
      formSignUpVisibleHandler();
    }
  }, [
    status,
    user,
    error,
    inputLogin,
    inputPassword,
    setUserHandler,
    signUpHandler,
    formSignUpVisibleHandler,
  ]);

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
    <>
      <form className={styles.form} onSubmit={submitHandler} noValidate>
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
          <div className={inputEmailClassName}>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              onChange={changeInputEmailHandler}
              onBlur={blurInputEmailHandler}
              value={inputEmail}
            />
            {hasInputEmailError && (
              <p className={styles['error-text']}>The wrong Email</p>
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
          <button type='button' onClick={formSignUpVisibleHandler}>
            Cancel
          </button>
          <button type='submit'> Sign Up</button>
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

export default FormSignUp;
