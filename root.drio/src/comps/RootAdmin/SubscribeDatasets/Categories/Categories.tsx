import Image from "next/image";
import Modal from "@/comps/ui/Modal";
import Button from "@/comps/ui/Button";
import { setOpenModal } from "@/state/slices/uiSlice";
import DatasetTable from "../DatasetTable/DatasetTable";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreTypes";

import { v4 as uuidv4 } from "uuid";

const categories = [
  {
    name: "Automotive",
    organizations: [
      {
        id: uuidv4(),
        name: "Tesla",
        imgURL: "/company-logo.svg",
        link: "",
      },
      {
        id: uuidv4(),
        name: "Tesla",
        imgURL: "/company-logo.svg",
        link: "",
      },
      { id: uuidv4(), name: "Tesla", imgURL: "/company-logo.svg", link: "" },
      {
        name: "Tesla",
        imgURL: "/company-logo.svg",
        link: "",
      },
    ],
  },
  {
    name: "Customer",
    organizations: [
      { id: uuidv4(), name: "Tesla", imgURL: "/company-logo.svg", link: "" },
    ],
  },
  {
    name: "Automotive",
    organizations: [
      { id: uuidv4(), name: "Tesla", imgURL: "/company-logo.svg", link: "" },
    ],
  },
  {
    name: "Automotive",
    organizations: [
      { id: uuidv4(), name: "Tesla", imgURL: "/company-logo.svg", link: "" },
    ],
  },
];

const Categories = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="border bg-gray-100 rounded-md">
      {categories.map((category) => {
        return (
          <>
            <div className="">
              <span className="bg-gray-50 block p-4 rounded-md">
                {category.name}
              </span>
              <div className="flex flex-wrap justify-between p-6 gap-8 my-2">
                {category.organizations.map((organization, index) => {
                  return (
                    <div
                      className="flex flex-wrap p-4 shadow-md rounded-lg divide-x-2 gap-x-2 bg-white w-1/2 -m-2"
                      key={index}
                    >
                      <div className="flex flex-col items-center p-4">
                        <div className="rounded-full shadow-xl p-4 mb-4">
                          <Image
                            width={50}
                            height={50}
                            alt={organization.name}
                            src={organization.imgURL}
                          />
                        </div>

                        <span>Company Name</span>
                      </div>
                      <div className="flex flex-col p-4 gap-y-4">
                        <span>Organization / Business Unit :</span>
                        <span className="text-gray-500">
                          {organization.name}
                        </span>
                        <Button
                          intent="tertiary"
                          onClick={() =>
                            dispatch(
                              setOpenModal(
                                `viewDatasetTable-${organization.id}`
                              )
                            )
                          }
                        >
                          View
                        </Button>
                        <div className="hidden">
                          <Modal
                            identifier={`viewDatasetTable-${organization.id}`}
                          >
                            <DatasetTable index={organization.id ?? ""} />
                          </Modal>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default Categories;
