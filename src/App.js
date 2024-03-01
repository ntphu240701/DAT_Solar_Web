import React, { Suspense, useEffect, useState } from 'react';
import './index.scss';

import Alert, { alertDispatch } from './component/Alert/Alert';
import Navigation from './component/Navigation/Navigation';
import Sidenar, { sidenar } from './component/Sidenar/Sidenar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClockLoader, PacmanLoader } from "react-spinners";
import Login from './component/Login/Login';
import Verify from "./component/Verify/Verify";
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
//import axios from 'axios';
import { host } from './component/Lang/Contant';
import adminslice from "./component/Redux/adminslice";
import { callApi } from './component/Api/Api';
import { signal } from '@preact/signals-react';

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
const Rule = React.lazy(() => import('./component/Rule/Rule'));
const Notif = React.lazy(() => import('./component/Notif/Notif'));

export const Token = signal({
  token: '',
  date: ''
});

export const userInfor = signal({
  usrid: '',
  name: '',
  phone: '',
  addr: '',
  ruleid: '2',
  partnerid: '1',
  package: 'Limited',
  type: 'user'
});

export const ruleInfor = signal({
  ruleid: '',
  name: '',
  setting: {},
});


export const partnerInfor = signal({
  partnerid: '',
  name: '',
  phone: '',
  mail: '',
  businessname: '',
  businessmodel: '',
  businesstype: '',
  area: '',
});


function App() {
  const [loading, setLoading] = useState(true);
  const status = useSelector((state) => state.admin.status)
  const dataLang = useIntl();
  const rootDispatch = useDispatch()
  const [data, setData] = useState({
    I0622B066940: {
      '14390-1': '50',
      '14391-1': '10',
      '14392-1': '50',
      '14393-1': '10',
      '14394-1': '50',
      '14395-1': '10',
      '14396-1': '50',
      '14397-1': '10',
      '14398-1': '50',
      '14399-1': '10',
      '14400-1': '50',
      '14401-1': '10',
      '14402-1': '50',
      '14403-1': '10',
      '14404-1': '50',
      '14405-1': '10',
      '14406-1': '50',
      '14407-1': '10',
      '14408-1': '50',
      '14409-1': '10',
      '14410-1': '50',
      '14411-1': '10',
      '14412-1': '50',
      '14413-1': '10',
    }
  })


  useEffect(() => {
    const generateOTP = () => {
      let digits =
        '0123456789abcdefghijklmnopqrstuvwxyz';
      let OTP = '';
      for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
    }
    const checkAuth = async () => {

      if (window.location.pathname !== '/Verify' && window.location.pathname !== '/VerifyRegister') {
        let inf = await callApi('get', host.AUTH + '/Inf')
        //console.log(inf)
        if (inf.status) {

          rootDispatch(adminslice.actions.setstatus(inf.status))
          rootDispatch(adminslice.actions.setusr(inf.data.usr))
          rootDispatch(adminslice.actions.setlang(inf.data.lang))
          rootDispatch(adminslice.actions.setmail(inf.data.mail))
          userInfor.value = {
            usrid: inf.data.usrid,
            name: inf.data.name,
            phone: inf.data.phone,
            addr: inf.data.addr,
            ruleid: inf.data.ruleid,
            partnerid: inf.data.partnerid,
            package: inf.data.package,
            type: inf.data.type
          }
          setLoading(false)
        } else {
          setLoading(false)
        }
      }

    }
    const checkRule = async (id) => {
      const data = await callApi('post', host.AUTH + '/Rule', { ruleid: id })

      if (data.status) {
        console.log("Rule", data.data)
        ruleInfor.value = {
          ruleid: data.data.ruleid,
          name: data.data.name,
          setting: data.data.setting
        }
      }
    }

    const checkPartner = async (id) => {
      const data = await callApi('post', host.AUTH + '/Partner', { partnerid: id })

      if (data.status) {
        console.log("Partner", data.data)
        partnerInfor.value = {
          partnerid: data.data.partnerid,
          name: data.data.name,
          phone: data.data.phone,
          mail: data.data.mail,
          businessname: data.data.businessname,
          businessmodel: data.data.businessmodel,
          businesstype: data.data.businesstype,
          area: data.data.area,
        }

      }
    }
    const checkToken = async () => {
      const d = await callApi('get', host.DATA + '/getToken')

      if (d.status) {
        console.log("Token", d.data)
        Token.value = {
          token: d.data.token,
          date: d.data.date
        }
      }

    }

    const checkApi = async () => {
      // const d = await callApi('post', host.DATA + '/addLogger', {plantid:'3', sn:'T0623A000169', name:'LOGGER 02', type:'L01'})
      //const d = await callApi('post', host.DATA + '/namePlant', { id: '3', name: 'SOLAR 001' })
      // const d = await callApi('post', host.AUTH + '/getInf', { usr: 'solar_master' })
      //let data = await callApi('post', host.DATA + '/getPlant', { usr: 'solar_master' })
      //let d = await callApi('post', host.DATA + '/getLogger', { plantid: '3' })
      //let data = await callApi('post', host.DATA + '/addPlant', { usr: 'solar_master', name: 'solar 03', company:'DAT', addr: '123, đường 1, phường 2, quận 3', long: '10.123', lat: '106.123', contact: 'hoang', phone: '0928382825', business: 'DAT Group', type: 'industry', mode: 'solar', griddate: '02/20/2024', capacity:'123', angle: '123', currency: '123', price: '123', production: '123', power: '123'})
      //let data = await callApi('post', host.DATA + '/dropPlant', {plantid: '4', usr: 'solar_master' })
      //let data = await callApi('post', host.DATA + '/editPlant', {plantid: '3', usr: 'solar_master', name: 'solar 03', company:'Công ty Cổ Phần Tập Đoàn DAT', addr: '12 Đường Đông Hưng Thuận 10, Phường Đông Hưng Thuận, Quận 12, TP.HCM	', long: '10.8357066', lat: '106.6271617', contact: 'hoang', phone: '0928382825', business: 'DAT Group', type: 'industry', mode: 'solar', griddate: '02/20/2024', capacity:'500', angle: '0', currency: 'vnd', price: '1000', production: '500', power: '50'})
      // console.log(d)
      //console.log(eval(d[0].data.pro_1))
    }
    checkAuth();
    if (status) {
      checkRule(userInfor.value.ruleid)
      checkPartner(userInfor.value.partnerid)
      checkToken();
      console.log("Inf", userInfor.value)
    }
    checkApi();
  }, [status])

  return (
    <>
      <Router>
        <Alert />
        {loading
          ? (window.location.pathname === '/Verify' || window.location.pathname === '/VerifyRegister') ? <Verify path={window.location.pathname} /> : <div className="DAT_Loading"><PacmanLoader color='#007bff' size={40} loading={loading} /></div>
          : <>
            {status
              ? <>
                <Navigation />
                <div className="DAT_App">
                  <Sidenar />
                  <div className='DAT_App_Content' >
                    <Routes>
                      <Route exact path='/' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={loading} /></div>}><Home /></Suspense>} />
                      <Route path='/Project' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={loading} /></div>}><Project /></Suspense>} />
                      <Route path='/Device' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={loading} /></div>}><Device /></Suspense>} />
                      <Route path='/Warn' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={loading} /></div>}><Warn /></Suspense>} />
                      <Route path='/Report' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={loading} /></div>}><Report /></Suspense>} />
                      <Route path='/Analytics' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={loading} /></div>}><Analytics /></Suspense>} />
                      <Route path='/User' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={loading} /></div>}><User /></Suspense>} />
                      <Route path='/Role' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={loading} /></div>}><Role /></Suspense>} />
                      <Route path='/GroupRole' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={loading} /></div>}><GroupRole /></Suspense>} />
                      <Route path='/Log' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={loading} /></div>}><Log /></Suspense>} />
                      <Route path='/Language' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={loading} /></div>}><Language /></Suspense>} />
                      <Route path='/Contact' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={loading} /></div>}><Contact /></Suspense>} />
                      <Route path='/Rule' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={loading} /></div>}><Rule /></Suspense>} />
                      <Route path='/Notif' element={<Suspense fallback={<div className="DAT_Loading"><ClockLoader color='#007bff' size={50} loading={loading} /></div>}><Notif /></Suspense>} />
                      <Route path='/Login' element={<Navigate to="/" />} />
                      <Route path='/Logout' element={<Navigate to="/Login" />} />
                    </Routes>

                  </div>
                </div>
              </>
              : <Login />
            }
          </>
        }


      </Router>
    </>

  );
}

export default App;
