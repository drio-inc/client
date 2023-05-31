import Image from "next/image";

const Organizations = [
  {
    name: "Google",
    logo: "/images/google.png",
  },
  {
    name: "Ui Path",
    logo: "/images/uipath.png",
  },
  {
    name: "HP",
    logo: "/images/hp.png",
  },
  {
    name: "Adobe",
    logo: "/images/adobe.png",
  },
  {
    name: "Autodesk",
    logo: "/images/autodesk.png",
  },
  {
    name: "EA",
    logo: "/images/ea.png",
  },
  {
    name: "Figma",
    logo: "/images/figma.png",
  },
  {
    name: "Sketch",
    logo: "/images/sketch.png",
  },
  {
    name: "JWT",
    logo: "/images/jwt.png",
  },
  {
    name: "Auth0",
    logo: "/images/auth0.png",
  },
];

const TopOrgs = () => {
  return (
    <div className="flex gap-2 flex-wrap justify-between my-4">
      {Organizations.map((org) => (
        <div
          className="flex-auto xl:flex-1 bg-white flex gap-1 items-center shadow-lg rounded-md p-2"
          key={org.name}
        >
          <Image src={org.logo} alt={org.name} width={25} height={25} />
          <span className="text-sm font-medium">{org.name}</span>
        </div>
      ))}
    </div>
  );
};

export default TopOrgs;
