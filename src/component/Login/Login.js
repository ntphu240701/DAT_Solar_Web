import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { alertDispatch } from "../Alert/Alert";
import { useDispatch } from "react-redux";
import adminslice from "../Redux/adminslice";
import "./Login.scss";
import { CiUser } from "react-icons/ci";
import { MdPassword } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
function Login(props) {
  const dataLang = useIntl();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [savepwd, setSavepwd] = useState(false);
  const rootDispatch = useDispatch();
  const [showpass, setShowpass] = useState(false);
  //const status = useSelector((state) => state.admin.status)

  useEffect(function () {
    rootDispatch(adminslice.actions.setlang("vi"));
  }, []);

  const handleLogin = function (e) {
    if (user === "admin" && pass === "abc123") {
      rootDispatch(adminslice.actions.setstatus(true));
    }
  };

  const loginState = function (e) {};

  return (
    <div className="DAT_Login">
      <form className="DAT_Login_Form" onSubmit={handleLogin}>
        <p>DAT GROUP</p>
        <div className="DAT_Login_Form-input">
          <CiUser color="gray" size={24} />
          <input
            type="text"
            placeholder={dataLang.formatMessage({ id: "username" })}
            required
            minLength="4"
            value={user}
            onChange={(e) => {
              setUser(e.target.value.trim().toLocaleLowerCase());
            }}
            autoComplete="on"
          />
        </div>
        <div className="DAT_Login_Form-input">
          <MdPassword color="gray" size={24} />
          <input
            type={showpass ? "text" : "password"}
            placeholder={dataLang.formatMessage({ id: "password" })}
            required
            minLength="4"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value.trim());
            }}
            autoComplete="on"
          />
          {showpass ? (
            <FaRegEye
              color="gray"
              size={24}
              onClick={() => setShowpass(!showpass)}
            />
          ) : (
            <FaRegEyeSlash
              color="gray"
              size={24}
              onClick={() => setShowpass(!showpass)}
            />
          )}
        </div>

        <div className="DAT_Login_Form-box">
          <input
            id="savepwd"
            type="checkbox"
            checked={savepwd}
            onChange={(e) => setSavepwd(e.target.checked)}
          />
          <label htmlFor="savepwd" />
          Lưu đăng nhập
        </div>

        <button>{dataLang.formatMessage({ id: "login" })}</button>

        <div className="DAT_Login_Form-footer">
          <span>Tạo tài khoản</span>
          <span>Quên mật khẩu</span>
        </div>
      </form>
    </div>
  );
}

export default Login;
