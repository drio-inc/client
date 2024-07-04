import { useState } from "react";
import Form_810 from "./Form_810";
import Form_830 from "./Form_830";
import Form_850 from "./Form_850";
import Button from "@/comps/ui/Button";

const TemplateGenerator = () => {
  const [tabs, setTabs] = useState<"EDI-810" | "EDI-830" | "EDI-850">("EDI-830");

  return (
    <div>
      <div className="flex items-center gap-x-4 mb-8">
        <Button
          onClick={() => setTabs("EDI-810")}
          intent={tabs === "EDI-810" ? "primary" : "secondary"}
        >
          EDI-810
        </Button>

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

      {tabs === "EDI-810" ? <Form_810 /> : null}
      {tabs === "EDI-830" ? <Form_830 /> : null}
      {tabs === "EDI-850" ? <Form_850 /> : null}
    </div>
  );
};

export default TemplateGenerator;
