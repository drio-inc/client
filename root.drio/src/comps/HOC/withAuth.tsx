import { useRouter } from "next/router";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";

import axios from "axios";
import showAlert from "@ui/Alert";
import { getToken } from "@/utils/token";
import { useEffect, useState } from "react";
import { logout } from "@/state/slices/authSlice";
import { setRecursiveRows } from "@/state/slices/orgUnitSlice";
import { useGetAccountByIdQuery } from "@/api/resources/accounts";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

function withAuth(OriginalComponent: React.FC) {
  function AuthenticatedComponent() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [skip, setSkip] = useState(true);
    const [loading, setLoading] = useState(true);
    const { user } = useAppSelector((state) => state.auth);

    const {
      error,
      data: account,
      isUninitialized,
    } = useGetAccountByIdQuery(
      {
        id: user?.account_id ?? "",
        recurse: true,
      },
      {
        skip,
      }
    );

    const url = process.env.API_URL;

    useEffect(() => {
      async function validateToken() {
        try {
          const res = await axios.get(`${url}/resources/validate`, {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          });

          if (res.status === 200) {
            setSkip(false);
            if (account) dispatch(setRecursiveRows(account.organization_units));

            setLoading(false);
            return;
          }
        } catch (error: any) {
          if (error?.response?.status === 401) {
            dispatch(logout());
            router.push("/login");
          } else {
            showAlert(
              "Network error occured. Please refresh the page and try again.",
              "error"
            );
          }
        }
      }

      validateToken();
    }, [account, dispatch, isUninitialized, router, url]);

    if (loading) return <StaticLoader />;

    return <OriginalComponent />;
  }

  return AuthenticatedComponent;
}

export default withAuth;
