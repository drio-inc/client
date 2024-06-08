import { useState } from "react";
import Layout from "@/comps/Layout";
import { HiX } from "react-icons/hi";
import { FaFolder } from "react-icons/fa";
import { useAppDispatch } from "@/hooks/useStoreTypes";
import { MdExpandMore, MdChevronRight } from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/comps/ui/Tabs";

import Button from "@/comps/ui/Button";
import { setCloseModal } from "@/state/slices/uiSlice";
import FolderView from "./FolderView";

type LexiconDetail = {
  name: keyof Lexicon;
  label: string;
};

const LexiconDetails: LexiconDetail[] = [
  {
    name: "name",
    label: "Lexicon",
  },

  {
    name: "ou",
    label: "Organization Unit",
  },
  {
    name: "domain",
    label: "Domain",
  },

  {
    name: "description",
    label: "Description",
  },
];

type ReviewLexiconProps = {
  row: Lexicon;
};

const dictionary = {
  AcmeManufacturing: {
    SetPurposeCode: "Mutually Defined",
    ReferenceID: "1514893",
    StartDate: "3/16/2024",
    Carrier: {
      Code: "USPN",
      ShipTo: {
        DC: "1A",
        Code: "043849",
      },
    },

    ScheduleDetails: [
      {
        SupplierCode: "434",
        Items: [
          {
            VolexItemNumber: "828221",
            ItemDescription: '4" Widget',
            UOM: "Case",
            Forecasts: [
              {
                ForecastCode: "Firm",
                Interval: "Yearly",
                Quantity: 296,
                ForecastDate: "7/27/2023",
                WarehouseLocationID: "2B",
              },
              {
                ForecastCode: "Order",
                Interval: "Yearly",
                Quantity: 540,
                ForecastDate: "1/15/2024",
                WarehouseLocationID: "3C",
              },
              {
                ForecastCode: "Order",
                Interval: "Monthly",
                Quantity: 613,
                ForecastDate: "5/25/2023",
                WarehouseLocationID: "5E",
              },
            ],
          },
          {
            VolexItemNumber: "554596",
            ItemDescription: '4" Widget',
            UOM: "Each",
            Forecasts: [
              {
                ForecastCode: "Firm",
                Interval: "Yearly",
                Quantity: 669,
                ForecastDate: "6/13/2023",
                WarehouseLocationID: "3C",
              },
              {
                ForecastCode: "Order",
                Interval: "Yearly",
                Quantity: 663,
                ForecastDate: "5/9/2024",
                WarehouseLocationID: "2B",
              },
            ],
          },
        ],
      },
    ],
  },
};

export default function ReviewLexicon({ row }: ReviewLexiconProps) {
  const dispatch = useAppDispatch();

  const turnIntoTree = (obj: any) => {
    const tree = {};
    return tree;
  };

  return (
    <Layout>
      <div className="min-w-[90vw] relative w-full mx-auto bg-white rounded-lg">
        <div className="flex gap-x-2 items-center p-4 rounded">
          <h2 className="text-gray-700 text-lg font-bold">Review Lexicon</h2>
          <span className="bg-green-200 px-2 py-1 text-sm font-bold text-green-800">
            {row.status}
          </span>
        </div>

        <span
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() => dispatch(setCloseModal("reviewLexicon"))}
        >
          <HiX className="w-8 h-8" />
        </span>

        <div className="flex w-full shadow-sm border p-2 bg-gray-50 text-gray-500">
          <div className="flex w-full justify-between divide-x-2 divide-[#42B9F4]">
            {LexiconDetails.map((field) => (
              <div className="w-1/4 flex flex-col my-2 flex-grow px-2" key={field.name}>
                <span className="block font-bold text-lg">{field.label}</span>
                <span className="block">{JSON.stringify(row[field.name])}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-full shadow-sm border p-4 bg-gray-50 text-gray-500">
          <span className="font-bold text-lg">Documents Used</span>
          <span className="font-medium">{row.files.map((file) => file.name).join(", ")}</span>
        </div>

        <Tabs defaultValue="tree" className="p-4">
          <div className="flex justify-between">
            <input
              type="search"
              placeholder="Search"
              className=" p-2 border border-gray-300 rounded-md"
            />

            <TabsList>
              <TabsTrigger value="tree">Tree</TabsTrigger>
              <TabsTrigger value="graph">Graph</TabsTrigger>
              <TabsTrigger value="wordCloud">Word Cloud</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="tree">
            {/* {Object.keys(dictionary.AcmeManufacturing).map((key) => (
              <div className="flex flex-col gap-y-4 w-min" key={key}>
                <div className="flex items-center gap-2 text-gray-700 cursor-pointer font-inter">
                  <MdChevronRight />
                  <FaFolder />
                  <span>{key}</span>
                </div>
              </div>
            ))} */}
            <FolderView data={dictionary} name="Expand" />
          </TabsContent>
          <TabsContent value="graph">Graph view will appear here</TabsContent>
          <TabsContent value="wordCloud">Word Cloud view will appear here</TabsContent>
        </Tabs>

        <div className="flex justify-end items-center gap-4 my-4 mr-4">
          <Button intent={`primaryOutline`}>Recreate</Button>
          <Button intent={`primary`}>Deploy</Button>
        </div>
      </div>
    </Layout>
  );
}
