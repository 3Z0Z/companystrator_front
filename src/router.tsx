import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomeLayout from "./layouts/HomeLayout";
import CompaniesList from "./pages/CompaniesList";

export default function Router() {
  return <BrowserRouter>
    <Routes>
      <Route element={<HomeLayout/>}>
        <Route path="/" element={<CompaniesList/>} index />
      </Route>
    </Routes>
  </BrowserRouter>;
}
