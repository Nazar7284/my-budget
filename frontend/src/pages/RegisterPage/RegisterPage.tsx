import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userIMG from "../../image/user-login.png";
import passwordIMG from "../../image/password.png";
import addUserIMG from "../../image/add-user.png";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    console.log(form);
  };

  const registerUser = async () => {
    if (form.email === "" || form.password === "") {
      return alert("Заповніть усі поля");
    }
    if (form.email.length < 8) {
      return alert("Email повинен складатись з мінімум 8 символів");
    }
    if (form.password.length < 6) {
      return alert("Пароль повинен складатись з мінімум 6 символів");
    }
    try {
      const res = await axios.post<{ message: string }>(
        "http://localhost:5000/registration",
        { ...form },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.message === "User added") {
        navigate("/login");
      }
    } catch (error: any) {
      if (error.response.data.message === "This email is using") {
        alert("Цей Email зайнятий");
      }
    }
  };

  return (
    <div className="register-page">
      <h1 className="heading">Реєстрація акаунту</h1>
      <form className="form-register" onSubmit={(e) => e.preventDefault()}>
        <div className="image-input-container">
          <img className="register-img" src={userIMG} alt="User logo" />
          <input
            type="text"
            className="input"
            name="email"
            placeholder="Email"
            onChange={changeHandler}
          />
        </div>
        <div className="image-input-container">
          <img className="register-img" src={passwordIMG} alt="" />
          <input
            type="text"
            className="input"
            name="password"
            placeholder="Password"
            onChange={changeHandler}
          />
        </div>
      </form>
      <Link to="/login" className="text-relocate">
        Вже маєте акаунт
      </Link>
      <button className="btn-register" onClick={registerUser}>
        <img className="register-img" src={addUserIMG} alt="Register logo" />
        <span>Зареєструватися</span>
      </button>
    </div>
  );
}
