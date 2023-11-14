import Image from "next/image";

interface TopOrgsProps {
  entities: {
    name: string;
    logo: string;
  }[];
}

const TopOrgs = ({ entities }: TopOrgsProps) => {
  return (
    <div className="flex gap-2 flex-wrap my-4">
      {(entities &&
        entities?.map((entity) => (
          <div
            key={entity.name}
            className="relative bg-white flex gap-2 items-center justify-center shadow-lg rounded-md p-3"
          >
            <Image
              width={32}
              height={32}
              quality={100}
              alt={entity.name}
              src={entity.logo}
              className="object-contain object-center aspect-square"
            />
            <span className="text-sm font-medium">{entity.name}</span>
          </div>
        ))) ||
        "No organizations found"}
    </div>
  );
};

export default TopOrgs;
