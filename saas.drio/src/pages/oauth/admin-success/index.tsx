import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { useAppDispatch } from "@/hooks/useStoreTypes";
import { setToken, setUser } from "@/state/slices/authSlice";

const OAuthSuccessPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isInitialRender = useRef(true);

  useEffect(() => {
    async function successCallback() {
      try {
        const res = await axios.get(`${process.env.API_URL}/oauth/admin-success`, {
          withCredentials: true,
        });

        if (res.status == 200) {
          if (res.data.token) {
            dispatch(setToken(res.data.token));
            window.localStorage.setItem("token", res.data.token);

            dispatch(
              setUser({
                username: "saas-admin@drio.ai",
              })
            );

            router.push("/accounts");
          }
        }
      } catch (error) {
        console.error("Failed to get tokens for the user", error);
        setTimeout(() => (window.location.href = "/login"), 5000);
      }
    }

    if (isInitialRender.current) {
      isInitialRender.current = false;
      successCallback();
    }
  }, []);
  return (
    <main className="h-screen flex items-center justify-center">
      <h1>Successfully authenticated user. Redirecting to dashboard...</h1>
    </main>
  );
};

export default OAuthSuccessPage;
