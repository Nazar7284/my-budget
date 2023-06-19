import Modal from "../../component/Modal";
import Navigation from "../../component/Navigation";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { modalSlice } from "../../store/reducers/ModalSlice";
import "./MainPage.css";
import { Line } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

export default function MainPage() {
  const { show } = modalSlice.actions;
  const dispatch = useAppDispatch();
  const { budget, Totalexpenses, Totalincomes, Incomes, Expenses } =
    useAppSelector((state) => state.UserInfoReducer);

  const changeBudget = () => {
    dispatch(show(true));
  };

  console.log(Expenses);

  const data = {
    labels: Incomes.map((income: any) =>
      new Date(income.date).toLocaleDateString("uk-UA")
    ),
    datasets: [
      {
        label: "Income",
        data: Incomes.map((elem: any) => {
          return elem.amount;
        }),
        backgroundColor: "green",
        tension: 0.2,
      },
      {
        label: "Expenses",
        data: Expenses.map((elem: any) => {
          return elem.amount;
        }),

        backgroundColor: "red",
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="main-page">
      <Navigation />
      <div className="main-page-details">
        <div className="money-general">
          <div className="balance">
            <h2>{`${budget}`}</h2>
            <h3>Поточний баланс</h3>
            <button className="edit-budget" onClick={changeBudget}>
              Змінити
            </button>
          </div>
          <div className="expenses">
            <h2>{`${Totalexpenses}`}</h2>
            <h3>Загальна сума витрат</h3>
          </div>
          <div className="incomes">
            <h2>{`${Totalincomes}`}</h2>
            <h3>Загальна сума надходжень</h3>
          </div>
        </div>
        <div className="chart-line">
          <Line data={data} />
        </div>
      </div>
      <Modal />
    </div>
  );
}
