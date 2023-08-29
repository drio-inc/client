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

    useEffect(() => {
      async function validateToken() {
        try {
          const res = await axios.get(
            `${process.env.API_URL}/resources/validate`
          );
          if (res.status === 200) {
            setLoading(false);
            return;
          }

          setLoading(false);
          router.push("/login");
        } catch (error) {
          setLoading(false);
          router.push("/login");
        }
      }

      validateToken();
    }, [dispatch, router]);

    if (loading) {
      return <StaticLoader />;
    }

    return <OriginalComponent />;
  }

  return AuthenticatedComponent;
}

export default withAuth;
