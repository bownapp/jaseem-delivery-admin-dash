// import logo from './logo.svg';
import './App.css';
import { Switch, Route, HashRouter } from 'react-router-dom';

import LoginScreen from './components/loginScreen'
import AllServiceProviders from './components/allServiceProviders'
import AddServiceProviders from './components/addServiceProviders'
import Navbar from './components/navbar';
import '././components/global/globalStyles.css'
import { UserContextProvider } from './components/context/user1Context';

function App() {
  return (
    <HashRouter>
      <UserContextProvider>
      <Navbar />
      <Switch>
          <Route exact path='/' component={LoginScreen} />

          <Route exact path='/service-providers/add' component={AddServiceProviders} />

          <Route exact path='/service-providers' component={AllServiceProviders} />
          
      </Switch>
      </UserContextProvider>
    </HashRouter>
  );
}

export default App;
