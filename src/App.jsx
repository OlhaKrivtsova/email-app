import {Routes, Route} from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Email from './pages/Email';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* <Route path='*' element={<NotFound />} /> */}
        <Route index element={<Home />} />
        <Route path='email' element={<Email />} />
      </Route>
    </Routes>
  );
}

export default App;
