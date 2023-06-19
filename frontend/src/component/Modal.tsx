import React, { useState } from "react";
import { useAppSelector } from "../hooks/redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { modalSlice } from "../store/reducers/ModalSlice";
import { userInfoSlice } from "../store/reducers/UserInfoSlice";

const Modal = () => {
  const { showModal } = useAppSelector((state) => state.ModalReducer);
  const { userID } = useAppSelector((state) => state.UserInfoReducer);
  const dispatch = useDispatch();
  const { close } = modalSlice.actions;
  const { editBudget } = userInfoSlice.actions;

  const [amount, setAmount] = useState("");
  const ModalClass = ["modal"];

  if (showModal) {
    ModalClass.push("modal-active");
  }

  const addNewAmountBudget = async () => {
    if (amount === "") {
      return alert("Заповніть поля коректно");
    }
    try {
      const res = await axios.post<{
        message: string;
      }>(
        "http://localhost:5000/changebudget",
        { userID, amount },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.message === "Budget field updated successfully") {
        alert("Бюджет оновлений");
      }
    } catch (error: any) {
      if (error.response.data.message === "Budget field updated successfully") {
        alert("Бюджет оновлений");
      }
    }
    dispatch(editBudget(Number(amount)));
    dispatch(close(false));
    setAmount("");
  };

  const CloseModal = () => {
    dispatch(close(false));
    setAmount("");
  };

  return (
    <div className={ModalClass.join(" ")}>
      <div className="modal-content">
        <input
          type="number"
          required
          placeholder="Змінити суму поточного бюджету"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addNewAmountBudget}>Підтвердити</button>
        <button onClick={CloseModal}>Закрити вікно</button>
      </div>
    </div>
  );
};

export default Modal;
