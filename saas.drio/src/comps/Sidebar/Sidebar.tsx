import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { IoGridOutline } from "react-icons/io5";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

import {
  HiOutlineKey,
  HiOutlinePuzzle,
  HiOutlineChartBar,
  HiOutlineDocumentReport,
  HiOutlineClipboardCheck,
  HiOutlineDocumentDuplicate,
  HiOutlinePresentationChartBar,
} from "react-icons/hi";

import { setExpandedLinks } from "@/state/slices/uiSlice";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

interface NavLink {
  name: string;
  href: string;
  default?: string;
  icon?: JSX.Element;
  children?: {
    name?: string;
    href?: string;
  }[];
}

const NavLinks = [
  {
    name: "Dashboard",
    href: "dashboard",
    icon: <IoGridOutline className="inline-block w-6 h-6 mr-2" />,
  },
  {
    name: "Analytics",
    href: "analytics",
    icon: <HiOutlineChartBar className="inline-block w-6 h-6 mr-2" />,
  },

  {
    name: "Accounts",
    href: "accounts",
    icon: <HiOutlineDocumentDuplicate className="inline-block w-6 h-6 mr-2" />,
  },

  {
    name: "DDX Infrastructure",
    href: "ddx",
    icon: <HiOutlineDocumentReport className="inline-block w-6 h-6 mr-2" />,
  },

  {
    name: "Licensing",
    href: "licensing",
    icon: <HiOutlineClipboardCheck className="inline-block w-6 h-6 mr-2" />,
  },

  {
    name: "Monitoring",
    href: "monitoring",
    icon: (
      <HiOutlinePresentationChartBar className="inline-block w-6 h-6 mr-2" />
    ),
  },

  {
    default: "",
    name: "System Settings",
    href: "system-settings",
    icon: <HiOutlinePuzzle className="inline-block w-6 h-6 mr-2" />,
  },

  {
    name: "Tools",
    href: "tools",
    icon: <HiOutlineKey className="inline-block w-6 h-6 mr-2" />,
  },
];

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { expandedLinks } = useAppSelector((state) => state.ui);

  // const showNested = (link: NavLink) => {
  //   const expanded = !expandedLinks[link.name];

  //   NavLinks.forEach((link) => {
  //     if (link.children) {
  //       dispatch(setExpandedLinks({ linkName: link.name, expanded: false }));
  //     }
  //   });

  //   dispatch(setExpandedLinks({ linkName: link.name, expanded }));
  // };

  return (
    <nav className="hidden md:left-0 md:flex md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden border-r border-gray-200 bg-white relative md:w-64 py-4 px-2">
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        <Link href="/">
          <Image src="/logo.svg" alt="Drio Logo" width={145} height={145} />
        </Link>

        <div
          className={`md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded`}
        >
          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            {NavLinks.map((link) => (
              <li key={link.name}>
                <div
                  className={`cursor-pointer transition-colors duration-200 ease-in-out hover:rounded-lg hover:bg-gray-100 text-sm py-3 px-2 font-medium flex justify-between items-center 
                        ${
                          router.pathname.indexOf(link.href) !== -1
                            ? "bg-gray-100 text-gray-600 hover:text-gray-500 rounded-lg"
                            : "text-gray-500 hover:text-gray-500"
                        }
                      `}
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      // showNested(link);
                      router.push(
                        `/${
                          link.default
                            ? `${link.href}/${link.default}`
                            : link.href
                        }`
                      );
                    }}
                  >
                    <span
                      className={`                        ${
                        router.pathname.indexOf(link.href) !== -1
                          ? "text-gray-600"
                          : "text-gray-400"
                      }`}
                    >
                      {link.icon}
                    </span>
                    <span className={`text-gray-500 hover:text-gray-600`}>
                      {link.name}
                    </span>
                  </div>
                  {/* {link?.children && (
                    <span
                      className="ml-4"
                      onClick={() => {
                        showNested(link);
                      }}
                    >
                      {expandedLinks[link.name] ? (
                        <AiFillCaretUp className="cursor-pointer inline-block w-4 h-4 text-gray-700" />
                      ) : (
                        <AiFillCaretDown className="cursor-pointer inline-block w-4 h-4 text-gray-700" />
                      )}
                    </span>
                  )} */}
                </div>

                {/* {link.children &&
                  expandedLinks[link.name] &&
                  link.children.length > 0 && (
                    <ul className="md:flex-col md:min-w-full flex flex-col list-none md:pl-4 my-2">
                      {link.children.map((child) => (
                        <li key={child.name}>
                          <Link href={`/${link.href}/${child.href}`}>
                            <span
                              className={`text-sm py-3 px-2 font-medium block my-1 ${
                                router.pathname.indexOf(child.href) !== -1
                                  ? "bg-gray-100 text-gray-600 hover:text-gray-500 rounded-lg"
                                  : "text-gray-500 hover:text-gray-600"
                              }`}
                            >
                              {child.name}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )} */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
