import img from "../image/user.png";
import { Link } from "react-router-dom";
import { loginSlice } from "../store/reducers/LoginSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";

function Navigation() {
  const { login } = loginSlice.actions;
  const dispatch = useAppDispatch();
  const { email } = useAppSelector((state) => state.UserInfoReducer);
  return (
    <div className="user">
      <div>
        <img src={img} alt="user_photo" />
      </div>
      <div>
        <h2>Еmail користувача</h2>
      </div>
      <div className="user-details">
        <h3>{email}</h3>
      </div>
      <div className="user-menu">
        <Link to={"/main"} className="link-text">
          Головна
        </Link>
        <Link to={"/incomes"} className="link-text">
          Надходження
        </Link>
        <Link to={"/expenses"} className="link-text">
          Витрати
        </Link>
      </div>
      <div>
        <button onClick={() => dispatch(login(false))} className="btn-sign-out">
          Вийти
        </button>
      </div>
    </div>
  );
}

export default Navigation;
