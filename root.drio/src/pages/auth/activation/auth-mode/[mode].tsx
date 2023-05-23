import OAuth from "@/comps/Auth/OAuth";
import LdapAuth from "@/comps/Auth/LdapAuth";
import GoogleAuth from "@/comps/Auth/GoogleAuth";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

const Mode = () => {
  const { authMode } = useAppSelector((state) => state.auth);

  if (authMode === "oauth") return <OAuth />;
  if (authMode === "ldap") return <LdapAuth />;
  if (authMode === "google") return <GoogleAuth />;

  return null;
};

export default Mode;
