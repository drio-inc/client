import Loader from "@/comps/ui/Loader";
import { useRouter } from "next/router";
import { useAppSelector } from "@/hooks/useStoreTypes";

import axios from "axios";
import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/useStoreTypes";
import { logOut, setAuthenticated } from "@/state/slices/authSlice";

function withAuth(OriginalComponent: React.FC) {
  function AuthenticatedComponent() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    useEffect(() => {
      async function validateToken() {
        try {
          const res = await axios.get(`/api/resources/validate`);
          if (res.status === 200) {
            dispatch(setAuthenticated(true));
            return;
          }

          dispatch(logOut());
          router.push("/login");
        } catch (error) {
          dispatch(logOut());
          router.push("/login");
        }
      }

      validateToken();
    }, [dispatch, router]);

    if (!isAuthenticated) {
      return <Loader />;
    }

    return <OriginalComponent />;
  }

  return AuthenticatedComponent;
}

export default withAuth;
