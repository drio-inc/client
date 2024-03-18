import Link from "next/link";
import { useRouter } from "next/router";

import Button from "../Button";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

import { useLogoutMutation } from "@/api/auth";
import { logout as stateLogout } from "@/state/slices/authSlice";
import { useGetAccountByIdQuery } from "@/api/resources/accounts";

import {
  MdLogout,
  MdOutlineAccountCircle,
  MdOutlineNotifications,
  MdOutlinePeopleOutline,
} from "react-icons/md";
import { setShowSidebar } from "@/state/slices/uiSlice";

import { useEffect, useState } from "react";
import getAnomalies from "@/functions/getAnomalies";
import { mergedDDXData } from "@/functions/mergeDDXData";
import { setRows as setDDXRows } from "@/state/slices/DDXSlice";
import { mergedDataSourceData } from "@/functions/mergeDataSources";

import {
  readNotifications,
  setNotifications,
} from "@/state/slices/notificationSlice";

import { setRawRows, setRows } from "@/state/slices/anomaliesSlice";
import { setRows as setDataSourceRows } from "@/state/slices/dataSourceSlice";

export default function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout, result] = useLogoutMutation();
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { recursiveRows } = useAppSelector((state) => state.orgUnit);
  const { pageTitles, showSidebar } = useAppSelector((state) => state.ui);
  const { rows: dataSourceRows } = useAppSelector((state) => state.dataSource);

  const { notifications, isRead } = useAppSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(setDDXRows(mergedDDXData()));
    dispatch(setDataSourceRows(mergedDataSourceData()));
  }, [dispatch, recursiveRows]);

  useEffect(() => {
    setLoading(true);
    const dataSourceIds = dataSourceRows.map((row) => ({
      ou_id: row.ou_id,
      datasource_id: row.id,
      account_id: row.account_id,
    }));

    getAnomalies(dataSourceIds).then((payload) => {
      dispatch(setRows([...payload.data]));
      dispatch(setRawRows(payload.rawData));
      dispatch(setNotifications([...payload.data]));

      setLoading(false);
    });
  }, [dataSourceRows, dispatch]);

  const { data: account, isLoading } = useGetAccountByIdQuery({
    id: user?.account_id ?? "",
    recurse: false,
  });

  const handleLogout = async () => {
    try {
      const res = await logout().unwrap();
      if (res.message === "Logout successful") {
        dispatch(stateLogout());
        window.location.href = "/login";
      }
    } catch (error) {
      window.location.href = "/login";
    }
  };

  const path =
    router.pathname &&
    router.pathname
      ?.split("/")
      [router?.pathname?.split("/")?.length - 1]?.replace(/-/g, " ");

  return (
    <nav className="shadow-sm h-[4rem]">
      <div className="flex items-center justify-between md:px-8 px-4 h-full">
        <span className="text-gray-700 text-2xl capitalize hidden md:inline-block font-bold">
          {pageTitles[path] ?? path}
        </span>
        <div className="flex items-center">
          <span
            className="mr-3 cursor-pointer relative"
            onClick={() => {
              dispatch(readNotifications(true));
              dispatch(setShowSidebar(!showSidebar));
            }}
          >
            <MdOutlineNotifications className="w-8 h-8 text-[#1F2937]" />

            {!isRead && (
              <div className="absolute p-[9px] top-0 right-0 bg-drio-red rounded-full flex items-center justify-center w-3 h-3">
                <span className="text-[12px] text-white font-medium">
                  {notifications?.length ?? 0}
                </span>
              </div>
            )}
          </span>

          {user && !isLoading ? (
            <div className="text-[#4C566A] flex">
              <span className="mr-3 flex items-center gap-x-2 bg-neutral-50 rounded-md py-3 px-8">
                <MdOutlinePeopleOutline className="w-5 h-5" />
                {user?.username ?? "Demo User"}
              </span>

              <span className="mr-3 flex items-center gap-x-2 bg-neutral-50 rounded-md py-3 px-8">
                <MdOutlineAccountCircle className="w-5 h-5 rounded-md" />
                {account?.name ?? "Demo Account"}
              </span>
            </div>
          ) : null}

          <Button
            intent={"primary"}
            className="text-sm mx-2"
            isLoading={result.isLoading}
            onClick={() => handleLogout()}
            icon={<MdLogout className="w-5 h-5" />}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
