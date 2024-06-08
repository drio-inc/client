import React from "react";
import { ForceGraph2D } from "react-force-graph";

const GraphComponent = () => {
  const data: any = [
    {
      word: "inventory",
      glossary:
        'make or include in an itemized record or report; "Inventory all books before the end of the year"',
      type: "v",
      position: { x: 0.5, y: 0 },
      children: [{ word: "inventory" }, { word: "take_stock" }, { word: "stock-take" }],
    },
    // Add other nodes similarly
  ];

  const transformedData = {
    nodes: data.flatMap((item, index) => [
      { id: `${item.word}-${index}`, label: item.word, glossary: item.glossary, group: item.type },
      ...item.children.map((child, childIndex) => ({
        id: `${child.word}-${index}-${childIndex}`,
        label: child.word,
        group: item.type,
      })),
    ]),
    edges: data.flatMap((item, index) =>
      item.children.map((child, childIndex) => ({
        from: `${item.word}-${index}`,
        to: `${child.word}-${index}-${childIndex}`,
      }))
    ),
  };

  const graphData = {
    nodes: transformedData.nodes.map((node: any) => ({ id: node.id, name: node.label })),
    links: transformedData.edges.map((edge: any) => ({ source: edge.from, target: edge.to })),
  };

  console.log(graphData);

  return (
    <div className="w-[400px] h-[400px]">
      <ForceGraph2D graphData={graphData} nodeLabel="name" nodeAutoColorBy="group" />
    </div>
  );
};

export default GraphComponent;
