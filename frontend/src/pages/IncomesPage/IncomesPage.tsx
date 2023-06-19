import React, { useState, ChangeEvent, FormEvent } from "react";
import Navigation from "../../component/Navigation";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { FormState } from "../../models/models";
import { userInfoSlice } from "../../store/reducers/UserInfoSlice";
import { Doughnut } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement,
  LinearScale,
  PointElement,
  Title,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function IncomesPage() {
  const { userID, Salary, Investment, Freelance, Other } = useAppSelector(
    (state) => state.UserInfoReducer
  );
  const { updateIncomeAndBudget } = userInfoSlice.actions;
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
    console.log(form);
  };

  const addIncome = async (e: FormEvent) => {
    e.preventDefault();
    if (form.title === "" || form.amount === "" || form.category === "") {
      console.log(form.title, form.amount, form.category);
      return alert("Заповніть усі поля");
    }
    console.log("income");
    try {
      const res = await axios.post<{
        message: string;
        Totalincomes: Number;
        budget: Number;
        AmountOfCategory: { [key: string]: number };
      }>(
        "http://localhost:5000/incomes",
        { ...form },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.message === "Income added") {
        console.log(res.data.AmountOfCategory);
        dispatch(
          updateIncomeAndBudget({
            Totalincomes: res.data.Totalincomes,
            budget: res.data.budget,
            salary: res.data.AmountOfCategory.salary,
            investment: res.data.AmountOfCategory.investment,
            freelance: res.data.AmountOfCategory.freelance,
            other: res.data.AmountOfCategory.other,
          })
        );
        // alert("Надходження добавлено");
      }
    } catch (error: any) {
      alert(error.response.data.message);
    }
    console.log(Salary, Investment, Freelance, Other);
    setForm({
      ...form,
      title: "",
      amount: "",
      category: "",
      date: "",
    });
  };

  // const data = {
  //   labels: ["Зарплата", "Інвестиції", "Фріланс", "Інше"],
  //   datasets: [
  //     {
  //       label: "# of votes",
  //       data: [100, 200, 300, 100],
  //       backgroundColor: [
  //         "rgb(85, 99, 132)",
  //         "rgb(255, 99, 132)",
  //         "rgb(54, 162, 235)",
  //         "rgb(255, 205, 86)",
  //       ],
  //       hoverOffset: 4,
  //       spacing: 50,
  //     },
  //   ],
  // };

  const data = {
    labels: ["Зарплата", "Інвестиції", "Фріланс", "Інше"],
    datasets: [
      {
        label: "Сума транзакцій у цій категорії",
        data: [Salary, Investment, Freelance, Other],
        backgroundColor: [
          "rgb(120, 120, 120)",
          "rgb(240, 128, 128)",
          "rgb(90, 200, 250)",
          "rgb(255, 204, 102)",
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
    <div className="incomes-page">
      <Navigation />
      <div className="incomes-page-details">
        <h1 className="heading-page">Сторінка надходжень</h1>
        <div className="income-page-info">
          <div>
            <form>
              <input
                type="text"
                name="title"
                required
                placeholder="Назва надходження"
                onChange={changeHandler}
                value={form.title}
                className="input-income-title"
              />
              <input
                type="number"
                name="amount"
                required
                placeholder="Сума надходження"
                value={form.amount}
                onChange={changeHandler}
                className="input-income-amount"
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
                <option value="salary">Зарплата</option>
                <option value="investment">Інвестиції</option>
                <option value="freelance">Фріланс</option>
                <option value="other">Інше</option>
              </select>
              <input
                type="date"
                name="date"
                className="input-income-date"
                required
                value={form.date}
                onChange={changeHandler}
              />
              <button className="submit-income" onClick={addIncome}>
                Додати надходження
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

export default IncomesPage;
