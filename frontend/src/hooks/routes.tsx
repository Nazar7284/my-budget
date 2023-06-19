import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import MainPage from "../pages/MainPage/MainPage";
import IncomesPage from "../pages/IncomesPage/IncomesPage";
import ExpensesPage from "../pages/ExpensesPage/ExpensesPage";
import { ILogin } from "../models/models";

export const useRoutes = ({ isLogin }: ILogin) => {
  if (isLogin) {
    return (
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/incomes" element={<IncomesPage />} />
        <Route path="*" element={<Navigate to="/main" />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registration" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
// import { Routes, Route } from "react-router-dom";
// import {
//   ILogin,
//   privateroutesArray,
//   publicroutesArray,
// } from "../models/models";

// export const useRoutes = ({ isLogin }: ILogin) => {
//   if (isLogin) {
//     return (
//       <Routes>
//         {privateroutesArray.map((route) => (
//           <Route
//             path={route.path}
//             element={<route.element />}
//             key={route.path}
//           />
//         ))}
//       </Routes>
//     );
//   }
//   return (
//     <Routes>
//       {publicroutesArray.map((route) => (
//         <Route path={route.path} element={<route.element />} key={route.path} />
//       ))}
//     </Routes>
//   );
// };
