import { useDispatch, useSelector } from "react-redux";
import "./header.css";
import { useState } from "react";
import { logoutUser } from "../../redux/ApiCalls/authApiCall";

const Header = () => {
  const [drobDown, setDropDown] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="header">
      <div className="header-container">
        <div className="logo-header">To Do</div>
        <div
          className="auth-user-header"
          onClick={() => setDropDown(!drobDown)}
        >
          <div className="user-name">{user?.name}</div>
          <div className="user-image">{user?.name.trim().slice(0, 1)}</div>
          {drobDown && (
            <div className="drobDown">
              <div className="logout" onClick={() => dispatch(logoutUser())}>
                logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
