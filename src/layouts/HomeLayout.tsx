import { Outlet } from "react-router-dom";

import Header from "../components/HeaderComponent";
import { useAuthStorage } from "../store";
import { useEffect } from "react";
import { refreshTokenService } from "../services/AuthService";

export default function HomeLayout() {
  const { token, renewTime, setToken, clearAuth } = useAuthStorage();

  useEffect(() => {
    if (!token || !renewTime) return;
    const timeToRenew = renewTime * 1000 - Date.now() - 60 * 1000;
    if (timeToRenew <= 0) {
      renewToken();
    } else {
      const timeOutId = setTimeout(() => {
        renewToken();
      }, timeToRenew);
      return () => clearTimeout(timeOutId);
    }
  }, [ token, renewTime ] );

  const renewToken = async () => {
    try {
      const newToken = await refreshTokenService();
      setToken(newToken.access_token);
    } catch(error) {
      console.log("Error renewing token: ", error);
      clearAuth();
    }
  }

  return (
    <>
      <Header />
      <section className="px-10 mt-5">
        <Outlet />
      </section>
    </>
  )
}
