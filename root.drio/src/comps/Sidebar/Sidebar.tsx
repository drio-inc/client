import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { BiBrain } from "react-icons/bi";
import { setExpandedLinks } from "@/state/slices/uiSlice";
import { IoGridOutline, IoLayersOutline } from "react-icons/io5";
import { logout as stateLogout } from "@/state/slices/authSlice";
import { AiFillCaretDown, AiFillCaretUp, AiOutlineThunderbolt } from "react-icons/ai";
import {
  HiOutlineCog,
  HiOutlineCloud,
  HiOutlineLibrary,
  HiOutlineDocumentReport,
  HiOutlinePresentationChartBar,
  HiOutlinePresentationChartLine,
} from "react-icons/hi";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";
import { useLogoutMutation } from "@/api/auth";
import Button from "../ui/Button";
import { MdLogout } from "react-icons/md";

interface NavLink {
  name: string;
  href: string;
  default?: string;
  icon?: JSX.Element;
  children?: {
    name: string;
    href: string;
  }[];
}

const NavLinks = [
  {
    name: "Dashboard",
    href: "dashboard",
    icon: <IoGridOutline className="inline-block w-6 h-6 mr-2" />,
  },
  {
    name: "Datasets",
    href: "datasets",
    default: "data-sources",
    icon: <HiOutlineCloud className="inline-block w-6 h-6 mr-2" />,
    children: [
      {
        name: "My Data Sources",
        href: "data-sources",
      },
      {
        name: "My Datasets",
        href: "my-datasets",
      },
      {
        name: "Dataset Marketplace",
        href: "dataset-marketplace",
      },
    ],
  },

  {
    name: "Data Learning",
    href: "data-learning",
    default: "domain-learning",
    icon: <BiBrain className="inline-block w-6 h-6 mr-2" />,
    children: [
      {
        name: "Domain Learning",
        href: "domain-learning",
      },
      {
        name: "Contract Learning",
        href: "contract-learning",
      },
    ],
  },

  {
    name: "Data Contracts",
    href: "data-contracts",
    default: "consumer-contracts",
    icon: <IoLayersOutline className="inline-block w-6 h-6 mr-2" />,
    children: [
      {
        name: "Consumer Contracts",
        href: "consumer-contracts",
      },
      {
        name: "Subscription Contracts",
        href: "subscription-contracts",
      },
      {
        name: "Consuming App Personas",
        href: "consuming-app-personas",
      },
    ],
  },

  {
    name: "Triggers",
    href: "triggers",
    default: "contract-rules",
    icon: <AiOutlineThunderbolt className="inline-block w-6 h-6 mr-2" />,
    children: [
      {
        name: "Contract Rules",
        href: "contract-rules",
      },
      {
        name: "Trigger Rules",
        href: "trigger-rules",
      },
      {
        name: "Trigger Actions",
        href: "trigger-actions",
      },
      {
        name: "Anomaly Rules",
        href: "anomaly-rules",
      },
    ],
  },

  {
    name: "Monitoring",
    href: "monitoring",
    default: "alerts",
    icon: <HiOutlinePresentationChartBar className="inline-block w-6 h-6 mr-2" />,
    children: [
      {
        name: "Alerts",
        href: "alerts",
      },
      {
        name: "Anomalies",
        href: "anomalies",
      },
      {
        name: "Audit Logs",
        href: "audit-logs",
      },
      {
        name: "Reports",
        href: "reports",
      },
    ],
  },

  {
    name: "Troubleshooting",
    href: "troubleshooting",
    icon: <HiOutlinePresentationChartLine className="inline-block w-6 h-6 mr-2" />,
  },

  {
    name: "DDX Infrastructure",
    href: "ddx",
    icon: <HiOutlineDocumentReport className="inline-block w-6 h-6 mr-2" />,
  },

  {
    name: "My Org",
    href: "my-org",
    default: "org-units",
    icon: <HiOutlineLibrary className="inline-block w-6 h-6 mr-2" />,
    children: [
      {
        name: "Organizational Units",
        href: "org-units",
      },
      {
        name: "Authentication",
        href: "authentication",
      },
      {
        name: "Roles",
        href: "roles",
      },
      {
        name: "Agreements and Assets",
        href: "agreements-and-assets",
      },
    ],
  },

  {
    name: "Settings",
    href: "settings",
    icon: <HiOutlineCog className="inline-block w-6 h-6 mr-2" />,
  },
];

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [logout, result] = useLogoutMutation();
  const { expandedLinks } = useAppSelector((state) => state.ui);

  const showNested = (link: NavLink) => {
    if (!link.children) {
      router.push(`/${link.href}`);
      return;
    }

    const expanded = !expandedLinks[link.name];

    NavLinks.forEach((link) => {
      if (link.children) {
        dispatch(setExpandedLinks({ linkName: link.name, expanded: false }));
      }
    });

    dispatch(setExpandedLinks({ linkName: link.name, expanded }));
  };

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

  return (
    <nav className="hidden md:left-0 md:flex md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden border-r border-gray-200 bg-white relative md:w-64 py-4 px-2">
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        <Link href="/">
          <Image priority width={145} height={145} src="/logo.svg" alt="Drio Logo" />
        </Link>

        <div
          className={`md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded`}
        >
          <ul className="md:flex-col md:min-w-full flex flex-col list-none gap-y-2">
            {NavLinks.map((link) => (
              <li key={link.name}>
                <div
                  onClick={() => showNested(link)}
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
                    onClick={() =>
                      router.push(`/${link.default ? `${link.href}/${link.default}` : link.href}`)
                    }
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
                    <span className={`text-gray-500 hover:text-gray-600`}>{link.name}</span>
                  </div>
                  {link.children && (
                    <span className="ml-4">
                      {expandedLinks[link.name] ? (
                        <AiFillCaretUp className="cursor-pointer inline-block w-4 h-4 text-gray-700" />
                      ) : (
                        <AiFillCaretDown className="cursor-pointer inline-block w-4 h-4 text-gray-700" />
                      )}
                    </span>
                  )}
                </div>

                {link.children && expandedLinks[link.name] && link.children.length > 0 && (
                  <ul className="md:flex-col md:min-w-full flex flex-col list-none md:pl-8 my-2">
                    {link.children.map((child) => (
                      <li key={child.name}>
                        <Link href={`/${link.href}/${child.href}`}>
                          <span
                            className={`cursor-pointer transition-colors duration-200 ease-in-out hover:rounded-lg hover:bg-gray-100 text-sm py-3 px-2 font-medium block my-1 ${
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
                )}
              </li>
            ))}
          </ul>

          <Button
            intent={"primary"}
            isLoading={result.isLoading}
            className="text-sm mx-2 mt-8"
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
