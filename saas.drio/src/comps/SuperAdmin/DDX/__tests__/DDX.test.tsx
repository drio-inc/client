import "whatwg-fetch";
import "@testing-library/jest-dom";
import DDX from "@comps/SuperAdmin/DDX";
import { renderWithProviders } from "@/utils/testUtils";
import { screen, waitFor } from "@testing-library/react";

import { DDXData } from "@/mocks/DDXData";

it("renders the Accounts screen", async () => {
  const { queryByText, getByText } = renderWithProviders(<DDX />);

  // expect(screen.getByTestId("loading-svg")).toBeInTheDocument();

  await waitFor(() => {
    // const rgxName = new RegExp(DDXData[0].name, "i");
    // expect(getByText(rgxName)).toBeInTheDocument();
    expect(queryByText(/Name/i)).toBeInTheDocument();
  });

  // expect(screen.queryByTestId("loading-svg")).not.toBeInTheDocument();
});
