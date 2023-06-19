import { useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import { loginSlice } from "../../store/reducers/LoginSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { userInfoSlice } from "../../store/reducers/UserInfoSlice";
import userIMG from "../../image/user-login.png";
import passwordIMG from "../../image/password.png";
import entryIMG from "../../image/entry.png";

export default function LoginPage() {
  const { login } = loginSlice.actions;
  const { writeInfo } = userInfoSlice.actions;
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    console.log(form);
  };

  const loginUser = async () => {
    if (form.email === "" || form.password === "") {
      return alert("Заповніть усі поля");
    }
    try {
      const res = await axios.post<{
        message: string;
        userID: string;
        budget: Number;
        Totalexpenses: Number;
        Totalincomes: Number;
        Incomes: Array<Number>;
        Expenses: Array<Number>;
      }>(
        "http://localhost:5000/login",
        { ...form },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.message === "User correct") {
        dispatch(
          writeInfo({
            email: form.email,
            userID: res.data.userID,
            budget: res.data.budget,
            Totalexpenses: res.data.Totalexpenses,
            Totalincomes: res.data.Totalincomes,
            Incomes: res.data.Incomes,
            Expenses: res.data.Expenses,
          })
        );
        dispatch(login(true));
      }
    } catch (error: any) {
      if (error.response.data.message === "This email does not exist") {
        alert("Цей емейл не зареєстрований");
      }
      if (error.response.data.message === "Password does not match") {
        alert("Пароль не вірний");
      }
    }
  };

  return (
    <div className="login-page">
      <h1 className="heading">Вхід</h1>
      <form className="form-login" action="">
        <div className="image-input-container">
          <img className="login-img" src={userIMG} alt="User logo" />
          <input
            type="text"
            className="input"
            name="email"
            placeholder="Email"
            onChange={changeHandler}
          />
        </div>
        <div className="image-input-container">
          <img className="login-img" src={passwordIMG} alt="Password logo" />
          <input
            type="text"
            className="input"
            name="password"
            placeholder="Password"
            onChange={changeHandler}
          />
        </div>
      </form>
      <Link to="/registration" className="text-relocate">
        Не маєте акаунту
      </Link>
      <button className="btn-login" onClick={loginUser}>
        <img className="login-img" src={entryIMG} alt="Entry logo" />
        <span>Увійти</span>
      </button>
    </div>
  );
}
