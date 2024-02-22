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
import { callApi } from './component/Api/Api';

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

      let res = await callApi('get', host.AUTH + window.location.pathname)
      if (res.status) {
        console.log(res)
        rootDispatch(adminslice.actions.setstatus(res.status))
        rootDispatch(adminslice.actions.setusr(res.user))
      } else {
        setLoading(false)
      }
    }

    const checkApi = async () => {
      let data = await callApi('post', host.AUTH + '/getInf', { usr: 'solar_master' })
      //let data = await callApi('post', host.DATA + '/getPlant', { usr: 'solar_master' })
      //let data = await callApi('post', host.DATA + '/getLogger', { plantid: '1' })
      //let data = await callApi('post', host.DATA + '/addPlant', { usr: 'solar_master', name: 'solar 03', company:'DAT', addr: '123, đường 1, phường 2, quận 3', long: '10.123', lat: '106.123', contact: 'hoang', phone: '0928382825', business: 'DAT Group', type: 'industry', mode: 'solar', griddate: '02/20/2024', capacity:'123', angle: '123', currency: '123', price: '123', production: '123', power: '123'})
      //let data = await callApi('post', host.DATA + '/dropPlant', {plantid: '4', usr: 'solar_master' })
      //let data = await callApi('post', host.DATA + '/editPlant', {plantid: '3', usr: 'solar_master', name: 'solar 03', company:'Công ty Cổ Phần Tập Đoàn DAT', addr: '12 Đường Đông Hưng Thuận 10, Phường Đông Hưng Thuận, Quận 12, TP.HCM	', long: '10.8357066', lat: '106.6271617', contact: 'hoang', phone: '0928382825', business: 'DAT Group', type: 'industry', mode: 'solar', griddate: '02/20/2024', capacity:'500', angle: '0', currency: 'vnd', price: '1000', production: '500', power: '50'})
      console.log("hell",data)

    }

    rootDispatch(adminslice.actions.setstatus(true))

    // checkAuth();
    // checkApi();
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
