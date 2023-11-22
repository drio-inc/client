import { useRouter } from "next/router";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";

import axios from "axios";
import { getToken } from "@/utils/token";
import { useEffect, useState } from "react";
import { logout } from "@/state/slices/authSlice";
import { useAppDispatch } from "@/hooks/useStoreTypes";

function withAuth(OriginalComponent: React.FC) {
  function AuthenticatedComponent() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    const url = process.env.API_URL;

    const handleAuthenticationFailure = (statusCode: number, error?: any) => {
      setLoading(false);

      if (statusCode === 401) {
        console.error("Authentication failed (401):", error);
        dispatch(logout());
        router.push("/login");
      } else if (axios.isAxiosError(error)) {
        // Handle other network errors
        console.error("Network error:", error.message);
        // You can choose to retry or perform any other action based on your requirements.
      } else {
        // Handle other non-network errors
        console.error("Non-network error:", error);
        // You can choose to redirect to a specific error page or perform any other action.
      }
    };

    useEffect(() => {
      async function validateToken() {
        try {
          const res = await axios.get(`${url}/resources/validate`, {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          });

          if (res.status === 200) {
            setLoading(false);
            return;
          }
        } catch (error) {
          setLoading(false);
          router.push("/login");
        }
      }

      validateToken();
    }, [dispatch, router, url]);

    if (loading) return <StaticLoader />;

    return <OriginalComponent />;
  }

  return AuthenticatedComponent;
}

export default withAuth;
