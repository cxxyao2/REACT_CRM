import { useEffect } from "react";
import auth from "../../services/authservice";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../store/reducers/auth";

const LogoutForm = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth.logout();
    dispatch(userLogout);
    window.location = "/";
  }, []);

  return null;
};

export default LogoutForm;
