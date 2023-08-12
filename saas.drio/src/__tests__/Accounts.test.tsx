import "whatwg-fetch";
import "@testing-library/jest-dom";
import { server } from "@/lib/mswSetup";
import Accounts from "@comps/SuperAdmin/Accounts";
import { renderWithProviders } from "@/lib/testUtils";
import { screen, waitFor } from "@testing-library/react";

import { accountData } from "@/mocks/accountData";

it("renders the Accounts component", async () => {
  const { queryByText, getByText } = renderWithProviders(<Accounts />);

  expect(screen.getByTestId("loading-svg")).toBeInTheDocument();

  await waitFor(() => {
    expect(queryByText(/Add New Account/i)).toBeInTheDocument();
  });

  expect(screen.queryByTestId("loading-svg")).not.toBeInTheDocument();
});
