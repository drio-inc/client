import Link from "next/link";
import { useRouter } from "next/router";
import { HiSearch } from "react-icons/hi";

import Button from "../Button";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { logOut } from "@/state/slices/authSlice";

export default function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logOut());
    router.push("/login");
  };

  return (
    <nav className="p-2 shadow-sm">
      <div className="flex items-center justify-between md:px-8 px-4">
        <Link
          className="text-gray-600 text-sm capitalize hidden md:inline-block font-medium"
          href={router.pathname}
        >
          {router.pathname.split("/")[router.pathname.split("/").length - 1]}
        </Link>
        <div className="flex items-center">
          {user && <span className="mr-3">{user.role}</span>}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-center">
              <HiSearch className="text-gray-400 inline-flex z-10 h-full absolute items-center justify-center w-8 pl-2 py-2" />
              <input
                placeholder="Search"
                className="pl-10 transition-colors ease-in-out duration-200 border py-2 px-3 my-1 rounded-md focus:outline-none shadow-sm"
              />
            </div>
          </form>
          <Button
            intent={"primary"}
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
