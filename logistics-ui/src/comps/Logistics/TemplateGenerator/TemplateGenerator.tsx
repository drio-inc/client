import { useState } from "react";
import Form_830 from "./Form_830";
import Button from "@/comps/ui/Button";
import Form_850 from "./Form_850";

const TemplateGenerator = () => {
  const [tabs, setTabs] = useState<"EDI-830" | "EDI-850">("EDI-830");

  return (
    <div>
      <div className="flex items-center gap-x-4 mb-8">
        <Button
          onClick={() => setTabs("EDI-830")}
          intent={tabs === "EDI-830" ? "primary" : "secondary"}
        >
          EDI-830
        </Button>
        <Button
          onClick={() => setTabs("EDI-850")}
          intent={tabs === "EDI-850" ? "primary" : "secondary"}
        >
          EDI-850
        </Button>
      </div>

      {tabs === "EDI-830" ? <Form_830 /> : null}
      {tabs === "EDI-850" ? <Form_850 /> : null}
    </div>
  );
};

export default TemplateGenerator;
