import axios from "axios";
import React, { useEffect, useRef } from "react";

const OAuthFailurePage = () => {
  const isInitialRender = useRef(true);

  useEffect(() => {
    async function failureCallback() {
      try {
        const res = await axios.get(`${process.env.API_URL}/oauth/admin-failure`, {
          withCredentials: true,
        });

        console.log("Failed to authenticate user. Redirecting to login...", res.data);
      } catch (error) {
        console.error("Failed to get error message", error);
      }

      setTimeout(() => (window.location.href = "/login"), 5000);
    }

    if (isInitialRender.current) {
      isInitialRender.current = false;
      failureCallback();
    }
  }, []);

  return (
    <main className="h-screen flex items-center justify-center">
      <h1>Failed to authenticate user. Redirecting to login...</h1>
    </main>
  );
};

export default OAuthFailurePage;
