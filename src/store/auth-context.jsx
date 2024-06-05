import {createContext, useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import EmailContext from './email-context';

const getDataFromLocalStorage = () => {
  const login = localStorage.getItem('login');
  const password = localStorage.getItem('password');
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);

  const saveUser = user
    ? {id: user.id, username: user.username, email: user.email}
    : {id: 0, username: '', email: ''};
  const saveCredentials = login ? {login, password} : {login: '', password: ''};
  console.log(saveUser);
  console.log(saveCredentials);

  return {initialUser: saveUser, initialCredentials: saveCredentials};
};

const {initialUser, initialCredentials} = getDataFromLocalStorage();

const UserContext = createContext({
  isFormSignUpVisible: false,
  isFormLoginVisible: false,
  credentials: {login: '', password: ''},
  user: {
    id: 0,
    username: '',
    email: '',
  },

  signUpHandler(login, password, user) {},
  logoutHandler() {},
  formSignUpVisibleHandler() {},
  formLoginVisibleHandler() {},
  setUserHandler(id, login, password) {},
});

export const UserContextProvider = props => {
  const [credentials, setCredentials] = useState(initialCredentials);
  const [isFormSignUpVisible, setIsFormSignUpVisible] = useState(false);
  const [isFormLoginVisible, setIsFormLoginVisible] = useState(false);
  const [user, setUser] = useState(initialUser);

  const {formEmailVisibleHandler, isFormEmailVisible} =
    useContext(EmailContext);

  const navigate = useNavigate();

  const setUserHandler = (id, username, email) => {
    console.log({id, username, email});

    setUser({id, username, email});
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
        // loginHandler,
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
