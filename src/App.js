import React, { useState } from 'react';
import './App.css';
import './assets/fonts/FuturaBT-Medium.ttf';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from 'src/pages/Home';
import { toastOptions } from 'src/utils/toastOptions';
import { Toaster } from 'react-hot-toast';
import Navbar from 'src/layout/Navbar';
import Sidebar from 'src/layout/Sidebar';
import Resources from 'src/pages/Resources';
import Browse from 'src/pages/Browse';
import Create from 'src/pages/Create';
import Map from 'src/pages/Map';
import NotFound from 'src/pages/NotFound';
import Profile from 'src/pages/Profile';
import TokenDetail from './pages/ActivateListing';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const MainLayout = ({ children, ...rest }) => {
    return (
      <>
        <Sidebar isOpen={isOpen} toggle={toggle} />
        <Navbar toggle={toggle} />
        {children}
      </>
    );
  };

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <MainLayout>
            <Home />
          </MainLayout>
        </Route>
        <Route path="/browse" exact>
          <MainLayout>
            <Browse />
          </MainLayout>
        </Route>
        <Route path="/resources" exact>
          <MainLayout>
            <Resources />
          </MainLayout>
        </Route>
        <Route path="/create" exact>
          <MainLayout>
            <Create />
          </MainLayout>
        </Route>
        <Route path="/map" exact>
          <MainLayout>
            <Map />
          </MainLayout>
        </Route>
        <Route path="/profile" exact>
          <MainLayout>
            <Profile />
          </MainLayout>
        </Route>
        <Route path="/activate-listing/:tokenId" exact>
          <MainLayout>
            <TokenDetail />
          </MainLayout>
        </Route>
        <Route component={NotFound} />
      </Switch>
      <Toaster position="top-right" toastOptions={toastOptions} />
    </Router>
  );
}

export default App;
