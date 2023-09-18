import { useRouter } from "next/router";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";

import axios from "axios";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useStoreTypes";

function withAuth(OriginalComponent: React.FC) {
  function AuthenticatedComponent() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const { user } = useAppSelector((state) => state.auth);

    const {
      data: account,
      error,
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

    // const url = `/api`;
    const url = process.env.API_URL;

    useEffect(() => {
      async function validateToken() {
        try {
          const res = await axios.get(`${url}/resources/validate`, {
            withCredentials: true,
          });

          if (res.status === 200) {
            setLoading(false);
            return;
          } else {
            setLoading(false);
            router.push("/login");
          }
        } catch (error) {
          console.log(error);

          setLoading(false);
          router.push("/login");
        }
      }

      validateToken();
    }, [dispatch, router, url]);

    if (loading) {
      return <StaticLoader />;
    }

    return <OriginalComponent />;
  }

  return AuthenticatedComponent;
}

export default withAuth;
