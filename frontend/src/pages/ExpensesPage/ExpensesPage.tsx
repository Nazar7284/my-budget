import React, { ChangeEvent, FormEvent, useState } from "react";
import Navigation from "../../component/Navigation";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { FormState } from "../../models/models";
import { userInfoSlice } from "../../store/reducers/UserInfoSlice";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

function ExpensesPage() {
  const { userID, Transport, Foodstuff, Rest, Gift, Clothes, OtherExpense } =
    useAppSelector((state) => state.UserInfoReducer);
  const { updateExpenseAndBudget } = userInfoSlice.actions;
  const dispatch = useAppDispatch();
  const [form, setForm] = useState<FormState>({
    owner: userID,
    title: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
  });

  const changeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const addExpense = async (e: FormEvent) => {
    e.preventDefault();
    if (form.title === "" || form.amount === "" || form.category === "") {
      return alert("Заповніть усі поля");
    }
    console.log("expense");
    try {
      const res = await axios.post<{
        message: string;
        Totalexpenses: Number;
        budget: Number;
        AmountOfCategory: { [key: string]: number };
      }>(
        "http://localhost:5000/expenses",
        { ...form },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.message === "Expense added") {
        console.log(res.data.AmountOfCategory.Transport);
        console.log(res.data.AmountOfCategory);
        dispatch(
          updateExpenseAndBudget({
            Totalexpenses: res.data.Totalexpenses,
            budget: res.data.budget,
            Transport: res.data.AmountOfCategory.transport,
            Foodstuff: res.data.AmountOfCategory.foodstuff,
            Rest: res.data.AmountOfCategory.rest,
            Gift: res.data.AmountOfCategory.gift,
            Clothes: res.data.AmountOfCategory.clothes,
            OtherExpense: res.data.AmountOfCategory.otherexpense,
          })
        );
        alert("Витрату добавлено");
      }
    } catch (error: any) {
      alert(error.response.data.message);
    }
    setForm({
      ...form,
      title: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
    });
  };
  const data = {
    labels: [
      "Транспорт",
      "Продукти",
      "Відпочинок",
      "Подарунки",
      "Одяг",
      "Інше",
    ],
    datasets: [
      {
        label: "Сума транзакцій у цій категорії",
        data: [Transport, Foodstuff, Rest, Gift, Clothes, OtherExpense],
        backgroundColor: [
          "rgb(255, 0, 0)",
          "rgb(0, 0, 255)",
          "rgb(0, 255, 0)",
          "rgb(255, 255, 0)",
          "rgb(255, 192, 203)",
          "rgb(128, 0, 128)",
        ],
        borderColor: ["rgb(0,0,0)", "rgb(0,0,0)", "rgb(0,0,0)", "rgb(0,0,0)"],
        borderWidth: 4,
        hoverOffset: 10,
        spacing: 50,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "black",
        },
      },
    },
  };

  return (
    <div className="expenses-page">
      <Navigation />
      <div className="expenses-page-details">
        <h1 className="heading-page">Сторінка витрат</h1>
        <div className="expense-page-info">
          <div>
            <form action="">
              <input
                type="text"
                name="title"
                required
                placeholder="Назва витрати"
                onChange={changeHandler}
                value={form.title}
                className="input-expense-title"
              />
              <input
                type="number"
                name="amount"
                required
                placeholder="Сума витрати"
                value={form.amount}
                onChange={changeHandler}
                className="input-expense-amount"
              />
              <select
                onChange={changeHandler}
                name="category"
                required
                className="select"
              >
                <option value="" selected disabled hidden>
                  Виберіть категорію
                </option>
                <option value="transport">Транспорт</option>
                <option value="foodstuff">Продукти</option>
                <option value="rest">Відпочинок</option>
                <option value="gift">Подарунки</option>
                <option value="clothes">Одяг</option>
                <option value="other">Інше</option>
              </select>
              <input
                type="date"
                name="date"
                className="input-expense-date"
                required
                value={form.date}
                onChange={changeHandler}
              />
              <button className="submit-expense" onClick={addExpense}>
                Додати витрату
              </button>
            </form>
          </div>
          <div className="chart-doughnut">
            <Doughnut data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpensesPage;
