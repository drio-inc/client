import "whatwg-fetch";
import "@testing-library/jest-dom";
import OrgUnit from "@/comps/RootAdmin/OrgUnits";
import { renderWithProviders } from "@/lib/testUtils";
import { screen, waitFor } from "@testing-library/react";

it("renders the Accounts component", async () => {
  const { queryByText, getByText } = renderWithProviders(<OrgUnit />);

  expect(screen.getByTestId("parent")).toBeInTheDocument();
});
