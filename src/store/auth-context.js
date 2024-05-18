import {createContext, useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import EmailContext from './email-context';

const UserContext = createContext({
  isFormSignUpVisible: false,
  isFormLoginVisible: false,
  credentials: {login: '', password: ''},

  user: {
    id: 0,
    username: '',
    email: '',
  },

  loginHandler(login, password) {},
  signUpHandler(login, email, password) {},
  logoutHandler() {},
  formSignUpVisibleHandler() {},
  formLoginVisibleHandler() {},
  setUserHandler(id, login, password) {},
});

export const UserContextProvider = props => {
  const [credentials, setCredentials] = useState({login: '', password: ''});
  const [isFormSignUpVisible, setIsFormSignUpVisible] = useState(false);
  const [isFormLoginVisible, setIsFormLoginVisible] = useState(false);
  const [user, setUser] = useState({
    id: 0,
    username: '',
    email: '',
  });

  const {formEmailVisibleHandler, isFormEmailVisible} =
    useContext(EmailContext);

  const navigate = useNavigate();

  useEffect(() => {
    const login = localStorage.getItem('login');
    const password = localStorage.getItem('password');
    const user = localStorage.getItem('user');
    if (user) {
      const saveUser = JSON.parse(localStorage.getItem('user'));
      setUserHandler(saveUser.id, saveUser.username, saveUser.email);
    }
    if (login) {
      setCredentials({login, password});
    }
  }, []);

  const setUserHandler = (id, login, email) => {
    setUser({id, login, email});
  };

  const formSignUpVisibleHandler = () => {
    if (!isFormSignUpVisible) {
      setIsFormSignUpVisible(true);
      setIsFormLoginVisible(false);
    } else {
      setIsFormSignUpVisible(false);
    }
  };

  const formLoginVisibleHandler = () => {
    if (!isFormLoginVisible) {
      setIsFormLoginVisible(true);
      setIsFormSignUpVisible(false);
    } else {
      setIsFormLoginVisible(false);
    }
  };

  const loginHandler = user => {
    navigate('email');
    localStorage.setItem('user', JSON.stringify(user));
  };

  const signUpHandler = (login, password, user) => {
    navigate('email');
    localStorage.setItem('login', login);
    localStorage.setItem('password', password);
    localStorage.setItem('user', JSON.stringify(user));
    setCredentials({login, password});
  };

  const logoutHandler = () => {
    navigate('/');
    localStorage.removeItem('user');
    isFormEmailVisible && formEmailVisibleHandler();
  };

  return (
    <UserContext.Provider
      value={{
        isFormSignUpVisible,
        isFormLoginVisible,
        user,
        credentials,
        loginHandler,
        logoutHandler,
        signUpHandler,
        formSignUpVisibleHandler,
        formLoginVisibleHandler,
        setUserHandler,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
