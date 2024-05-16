// import styles from './Home.module.css';

import {useContext} from 'react';
import FormSignUp from '../components/forms/FormSignUp';
import FormLogin from '../components/forms/FormLogin';
import HomeHeader from '../components/layout/HomeHeader';
import UserContext from '../store/auth-context';

const Home = props => {
  const {isFormSignUpVisible, isFormLoginVisible} = useContext(UserContext);

  return (
    <>
      <HomeHeader />
      <section>
        <div>Home pages</div>
        {isFormSignUpVisible && <FormSignUp />}
        {isFormLoginVisible && <FormLogin />}
      </section>
    </>
  );
};

export default Home;
