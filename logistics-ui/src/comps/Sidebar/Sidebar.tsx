import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { RiArchiveLine, RiPriceTag2Line, RiRoadMapLine } from "react-icons/ri";

const NavLinks = [
  {
    name: "Shipping Inventory",
    href: "products",
    icon: <RiArchiveLine className="inline-block w-6 h-6 mr-2" />,
  },
  {
    name: "Quotes",
    href: "quotes",
    icon: <RiPriceTag2Line className="inline-block w-6 h-6 mr-2" />,
  },

  {
    name: "Booked Order Tracking",
    href: "tracking",
    icon: <RiRoadMapLine className="inline-block w-6 h-6 mr-2" />,
  },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <nav className="hidden md:left-0 md:flex md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden border-r border-gray-200 bg-white relative md:w-64 py-4 px-2">
      <div className="relative md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        <Image
          width={100}
          height={80}
          quality={100}
          // unoptimized={true}
          className="mx-auto"
          alt="Harley Davidson Logo"
          src="/harley-davidson.png"
        />

        <div
          className={`md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded`}
        >
          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            {NavLinks.map((link) => (
              <li key={link.name}>
                <div
                  className={`text-sm py-3 px-2 font-medium flex justify-between items-center 
                        ${
                          router.pathname.indexOf(link.href) !== -1
                            ? "bg-[#ECF5FF] text-drio-red hover:text-drio-red-dark rounded-lg"
                            : "text-gray-500 hover:text-gray-500"
                        }
                      `}
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => router.push(`/${link.href}`)}
                  >
                    <span>{link.icon}</span>
                    <span>{link.name}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <Link href="/" className="inline-flex justify-center -ml-5">
          <Image
            width={96}
            height={30}
            alt="Drio Logo"
            src="/logo.svg"
            className="xl:-mt-24"
          />
        </Link>
      </div>
    </nav>
  );
}
