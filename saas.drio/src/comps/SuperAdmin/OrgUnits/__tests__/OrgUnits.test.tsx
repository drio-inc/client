import "whatwg-fetch";
import "@testing-library/jest-dom";
import OrgUnits from "@comps/SuperAdmin/OrgUnits";
import { renderWithProviders } from "@/utils/testUtils";
import { screen, waitFor } from "@testing-library/react";

import { orgUnitData } from "@/mocks/orgUnitData";

it("renders the Organization Unit screen", async () => {
  const { queryByText, getByText } = renderWithProviders(<OrgUnits />);

  expect(screen.getByTestId("loading-svg")).toBeInTheDocument();

  await waitFor(() => {
    const rgxName = new RegExp(orgUnitData[0].name, "i");
    expect(getByText(rgxName)).toBeInTheDocument();
    expect(queryByText(/Add Organization Unit/i)).toBeInTheDocument();
  });

  expect(screen.queryByTestId("loading-svg")).not.toBeInTheDocument();
});
