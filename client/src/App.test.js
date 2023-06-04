import React from "react";
import { render, screen } from "@testing-library/react";
import { Home } from "./pages";

jest.mock("react-apexcharts", () => ({
  __esModule: true,
  default: () => <div />,
}));

// test("renders learn react link", () => {
//   // const { getByText } = render(<Home />);
//   // const textElement = getByText(/Dashboard/i);
//   // expect(textElement).toBeInTheDocument();

//   const { asFragment } = render(<Home />);
//   expect(asFragment(<Home />)).toMatchSnapshot();
// });

describe("Main Tests", () => {
  it("Render Home component", () => {
    render(<Home />);
    //eslint-disable-next-line
    screen.debug();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
