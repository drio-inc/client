import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { setExpandedLinks } from "@/state/slices/uiSlice";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { IoGridOutline, IoLayersOutline } from "react-icons/io5";

import {
  HiOutlineCog,
  HiOutlineCloud,
  HiOutlineLibrary,
  HiOutlineDocumentReport,
  HiOutlineClipboardCheck,
  HiOutlinePresentationChartBar,
  HiOutlinePresentationChartLine,
} from "react-icons/hi";

import { useAppSelector, useAppDispatch } from "@/hooks/useStoreTypes";

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
    name: "Data Contracts",
    href: "data-contracts",
    default: "inbound-contracts",
    icon: <IoLayersOutline className="inline-block w-6 h-6 mr-2" />,
    children: [
      {
        name: "Inbound Contracts to Approve",
        href: "inbound-contracts",
      },
      {
        name: "Approved Contracts",
        href: "approved-contracts",
      },
      {
        name: "Outbound Contracts",
        href: "outbound-contracts",
      },
      {
        name: "Personas",
        href: "personas",
      },
    ],
  },

  {
    name: "Policies",
    href: "policies",
    default: "data-policies",
    icon: <HiOutlineClipboardCheck className="inline-block w-6 h-6 mr-2" />,
    children: [
      {
        name: "Data Policies",
        href: "data-policies",
      },
      {
        name: "Alert and Anomaly Policies",
        href: "alert-anomaly-policies",
      },
    ],
  },

  {
    name: "Monitoring",
    href: "monitoring",
    icon: (
      <HiOutlinePresentationChartBar className="inline-block w-6 h-6 mr-2" />
    ),
    children: [
      {
        name: "Alerts",
        href: "alerts",
      },
      {
        name: "Reports",
        href: "reports",
      },
      {
        name: "Anomalies",
        href: "anomalies",
      },
      {
        name: "Audit Logs",
        href: "audit-logs",
      },
    ],
  },

  {
    name: "Troubleshooting",
    href: "troubleshooting",
    icon: (
      <HiOutlinePresentationChartLine className="inline-block w-6 h-6 mr-2" />
    ),
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
        name: "Agreements and Assets",
        href: "agreements-and-assets",
      },
      {
        name: "Authentication",
        href: "authentication",
      },
      {
        name: "Roles",
        href: "roles",
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
  const { expandedLinks } = useAppSelector((state) => state.ui);

  const showNested = (link: NavLink) => {
    const expanded = !expandedLinks[link.name];

    NavLinks.forEach((link) => {
      if (link.children) {
        console.log("link", link);

        dispatch(setExpandedLinks({ linkName: link.name, expanded: false }));
      }
    });

    dispatch(setExpandedLinks({ linkName: link.name, expanded }));
  };

  return (
    <nav className="hidden md:left-0 md:flex md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden border-r border-gray-200 bg-white relative md:w-64 py-4 px-2">
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        <Link href="/">
          <Image src="/logo.svg" alt="Drio Logo" width={145} height={145} />
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
                    onClick={() => {
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

                {link.children &&
                  expandedLinks[link.name] &&
                  link.children.length > 0 && (
                    <ul className="md:flex-col md:min-w-full flex flex-col list-none md:pl-4 my-2">
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
        </div>
      </div>
    </nav>
  );
}
