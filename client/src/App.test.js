/* eslint-disable */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Home, AllProperties } from "./pages";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-apexcharts", () => ({
  __esModule: true,
  default: () => <div />,
}));

describe("Home component", () => {
  test("renders the dashboard title", () => {
    const { getByText } = render(<Home />);
    const titleElement = getByText("Dashboard");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders the pie charts", () => {
    const { getByText } = render(<Home />);
    const propertiesForSaleChart = getByText("Properties for Sale");
    const propertiesForRentChart = getByText("Properties for Rent");
    const totalCustomersChart = getByText("Total customers");
    const propertiesForCitiesChart = getByText("Properties for Cities");

    expect(propertiesForSaleChart).toBeInTheDocument();
    expect(propertiesForRentChart).toBeInTheDocument();
    expect(totalCustomersChart).toBeInTheDocument();
    expect(propertiesForCitiesChart).toBeInTheDocument();
  });

  test("renders the total revenue and property referrals components", () => {
    const { getByText } = render(<Home />);
    const totalRevenueComponent = getByText("Total Revenue");
    const propertyReferralsComponent = getByText("Property Referrals");

    expect(totalRevenueComponent).toBeInTheDocument();
    expect(propertyReferralsComponent).toBeInTheDocument();
  });
});
