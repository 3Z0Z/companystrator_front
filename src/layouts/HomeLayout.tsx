import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function HomeLayout() {
  return (
    <>
      <Header />
      <section className="px-10 mt-5">
        <Outlet/>
      </section>
    </>
  )
}
