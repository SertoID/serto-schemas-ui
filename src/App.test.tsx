import * as React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import { App } from "./App";

it("renders without crashing", async () => {
  render(<App />);
  // If we don't wait for something, Auth0Provider performs some state update after test finishes and we get "not wrapped in act(...)" warning
  await waitFor(() => screen.getByText("A shared vocabulary for Verifiable Credentials"));
});
