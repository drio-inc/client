import Link from "next/link";
import { useRouter } from "next/router";
import { HiSearch } from "react-icons/hi";

import Button from "../Button";
import { useLogoutMutation } from "@/api/auth";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";
import { logout as stateLogout } from "@/state/slices/authSlice";

export default function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout, { isLoading }] = useLogoutMutation();
  const { user } = useAppSelector((state) => state.auth);
  const { pageTitles } = useAppSelector((state) => state.ui);

  const handleLogout = async () => {
    try {
      const res = await logout().unwrap();
      if (res.message === "Logout successful") {
        dispatch(stateLogout());
        router.push("/login");
        router.reload();
      }
    } catch (error) {
      router.push("/login");
      router.reload();
    }
  };

  const path = router.pathname
    .split("/")
    [router.pathname.split("/").length - 1].replace(/-/g, " ");

  return (
    <nav className="shadow-sm h-24">
      <div className="flex items-center justify-between md:px-8 px-4 h-full">
        <Link
          className="text-gray-700 text-3xl capitalize hidden md:inline-block font-bold"
          href={router.pathname}
        >
          {pageTitles[path] ?? path}
        </Link>
        <div className="flex items-center">
          {user && <span className="mr-3">{user.userName}</span>}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-center">
              <HiSearch className="text-gray-400 inline-flex h-full absolute items-center justify-center w-8 pl-2 py-2" />
              <input
                placeholder="Search"
                className="pl-10 transition-colors ease-in-out duration-200 border py-2 px-3 my-1 rounded-md focus:outline-none shadow-sm"
              />
            </div>
          </form>
          <Button
            intent={"primary"}
            isLoading={isLoading}
            className="text-sm mx-2"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
