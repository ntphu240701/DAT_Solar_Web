import React, { Suspense, useEffect, useState } from 'react';
import './index.scss';

import Alert, { alertDispatch } from './component/Alert/Alert';
import Navigation from './component/Navigation/Navigation';
import Sidenar from './component/Sidenar/Sidenar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClockLoader } from "react-spinners";
import Login from './component/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import axios from 'axios';
import { host } from './component/Lang/Contant';
import adminslice from "./component/Redux/adminslice";

const Home = React.lazy(() => import('./component/Home/Home'));
const Project = React.lazy(() => import('./component/Project/Project'));
const Device = React.lazy(() => import('./component/Device/Device'));
const Warn = React.lazy(() => import('./component/Warn/Warn'));
const Report = React.lazy(() => import('./component/Report/Report'));
const Analytics = React.lazy(() => import('./component/Analytics/Analytics'));
const User = React.lazy(() => import('./component/User/User'));
const Role = React.lazy(() => import('./component/Role/Role'));
const GroupRole = React.lazy(() => import('./component/GroupRole/GroupRole'));
const Log = React.lazy(() => import('./component/Log/Log'));
const Language = React.lazy(() => import('./component/Language/Language'));
const Contact = React.lazy(() => import('./component/Contact/Contact'));




function App() {
  const [loading, setLoading] = useState(true);
  const status = useSelector((state) => state.admin.status)
  const dataLang = useIntl();
  const rootDispatch = useDispatch()


  useEffect(() => {
    const checkAuth = async () => {
      await axios.get(host.AUTH + window.location.pathname, {

        headers: {
          token: JSON.parse(localStorage.getItem('token')) || JSON.parse(sessionStorage.getItem('token'))
        },
        withCredentials: true
      }
      ).then(
        function (res) {
          if (res.data.status) {
            console.log(res.data)
            rootDispatch(adminslice.actions.setstatus(res.data.status))
            rootDispatch(adminslice.actions.setusr(res.data.user))
          } else {
            setLoading(false)
          }
        }
      )
    }

    checkAuth();
  }, [])

  return (
    <>
      <Router>
        <Alert />
        {status
          ? <>
            <Navigation />
            <div className="DAT_App">
              <Sidenar />
              <div className='DAT_App_Content' >
                <Routes>
                  <Route exact path='/' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={true} /></div>}><Home /></Suspense>} />
                  <Route exact path='/Project' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={true} /></div>}><Project /></Suspense>} />
                  <Route exact path='/Device' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={true} /></div>}><Device /></Suspense>} />
                  <Route exact path='/Warn' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={true} /></div>}><Warn /></Suspense>} />
                  <Route exact path='/Report' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={true} /></div>}><Report /></Suspense>} />
                  <Route exact path='/Analytics' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={true} /></div>}><Analytics /></Suspense>} />
                  <Route exact path='/User' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={true} /></div>}><User /></Suspense>} />
                  <Route exact path='/Role' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={true} /></div>}><Role /></Suspense>} />
                  <Route exact path='/GroupRole' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={true} /></div>}><GroupRole /></Suspense>} />
                  <Route exact path='/Log' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={true} /></div>}><Log /></Suspense>} />
                  <Route exact path='/Language' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={true} /></div>}><Language /></Suspense>} />
                  <Route exact path='/Contact' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={true} /></div>}><Contact /></Suspense>} />
                  <Route path='/Login' element={<Navigate to="/" />} />
                  <Route path='/Logout' element={<Navigate to="/Login" />} />
                </Routes>

              </div>
            </div>
          </>
          : <Login />
        }
      </Router>
    </>

  );
}

export default App;
