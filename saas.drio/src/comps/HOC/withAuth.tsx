import { useRouter } from "next/router";
import StaticLoader from "@/comps/ui/Loader/StaticLoader";

import axios from "axios";
import { getToken } from "@/utils/token";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks/useStoreTypes";

function withAuth(OriginalComponent: React.FC) {
  function AuthenticatedComponent() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    // const url = `/api`;
    const url = process.env.API_URL;

    // useEffect(() => {
    //   async function validateToken() {
    //     try {
    //       const res = await axios.get(`${url}/resources/validate`, {
    //         headers: {
    //           Authorization: `Bearer ${getToken()}`,
    //         },
    //       });

    //       if (res.status === 200) {
    //         setLoading(false);
    //         return;
    //       } else {
    //         setLoading(false);
    //         router.push("/login");
    //       }
    //     } catch (error) {
    //       setLoading(false);
    //       router.push("/login");
    //     }
    //   }

    //   validateToken();
    // }, [dispatch, router, url]);

    // if (loading) return <StaticLoader />;

    return <OriginalComponent />;
  }

  return AuthenticatedComponent;
}

export default withAuth;
