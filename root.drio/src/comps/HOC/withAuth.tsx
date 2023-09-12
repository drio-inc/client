import { useRouter } from "next/router";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";

import axios from "axios";
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
      data: account,
      error,
      isUninitialized,
    } = useGetAccountByIdQuery(user?.account_id ?? "", {
      skip,
    });

    // const url = `/api`;
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

            if (account) {
              dispatch(setRecursiveRows(account.organization_units));
            }

            setLoading(false);
            return;
          } else {
            setLoading(false);
            dispatch(logout());
            router.push("/login");
          }
        } catch (error) {
          setLoading(false);
          dispatch(logout());
          router.push("/login");
        }
      }

      validateToken();
    }, [account, dispatch, isUninitialized, router, url]);

    if (loading) {
      return <StaticLoader />;
    }

    return <OriginalComponent />;
  }

  return AuthenticatedComponent;
}

export default withAuth;
