import Image from "next/image";

type MetaTagsProps = {
  tags: string;
};

const MetaTags = (props: MetaTagsProps) => {
  console.log(props.tags);
  return (
    <div className="inline-grid grid-cols-3 gap-2 my-2">
      {props.tags.split(",").map((tag: string, index: number) => (
        <div
          key={index}
          className="inline-flex flex-wrap border border-[#FF7800] rounded-md px-2 py-1 items-center gap-x-2"
        >
          <Image src="/loading-fill.svg" alt="tag" width={18} height={18} />
          <span className="text-xs capitalize text-[#FF7800] font-medium">
            {tag}
          </span>
        </div>
      ))}
    </div>
  );
};

export default MetaTags;
