// import logo from './logo.svg';
import './App.css';
import { Switch, Route, HashRouter } from 'react-router-dom';

import LoginScreen from './components/loginScreen'
import AllServiceProviders from './components/allServiceProviders'
import AddServiceProviders from './components/addServiceProviders'
import Navbar from './components/navbar';
import '././components/global/globalStyles.css'
import { UserContext, UserContextProvider } from './components/context/user1Context';
import { useContext } from 'react';
import axios from 'axios';
import HomeScreen from './components/home';


function App() {
  const {token} = useContext(UserContext)

  axios.defaults.timeout = 3000;
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  // axios.interceptors.response.use(response => response, error => {
  //   const status = error.response ? error.response.status : null
  
  //   if (status === 403) {
  //     // will loop if refreshToken returns 401
  //     // return refreshToken(store).then(_ => {
  //     //   error.config.headers['Authorization'] = 'Bearer ' + store.state.auth.token;
  //     //   error.config.baseURL = undefined;
  //     //   return Axios.request(error.config);
  //     // })
  //     // // Would be nice to catch an error here, which would work, if the interceptor is omitted
  //     // .catch(err => err);
  //     console.log('refreshing token')
  //     console.log('hiiiiii')
  //     return Promise.reject(error);

  //   }
  
  //   return Promise.reject(error);
  // });

  // axios.interceptors.request.use(
  //   request => {
  //     console.log(request)
  //     return request
  //   },
  //   error => {
  //     return Promise.reject(error)
  //   }
  // )

  return (
    <HashRouter>
      <Navbar />
      <Switch>
      <Route exact path='/' component={HomeScreen} />

          <Route exact path='/admin' component={LoginScreen} />
          <Route exact path='/admin/service-providers/add' component={AddServiceProviders} />
          <Route exact path='/admin/service-providers' component={AllServiceProviders} />          
      </Switch>
    </HashRouter>
  );
}

export default App;
