/* eslint-disable */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Home, AllProperties } from "./pages";
import {
  AgentCard,
  PieChart,
  PropertyReferrals,
  TotalRevenue,
} from "./components";
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

describe("AgentCard", () => {
  const agent = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "avatar-url",
    noOfProperties: 5,
  };

  it("renders agent name and email", () => {
    render(
      <BrowserRouter>
        <AgentCard {...agent} />
      </BrowserRouter>
    );

    expect(screen.getByText(agent.name)).toBeInTheDocument();
    expect(screen.getByText(agent.email)).toBeInTheDocument();
  });

  it("renders agent avatar", () => {
    render(
      <BrowserRouter>
        <AgentCard {...agent} />
      </BrowserRouter>
    );

    const avatarImage = screen.getByAltText("user");
    expect(avatarImage).toHaveAttribute("src", agent.avatar);
  });

  it("renders agent role", () => {
    render(
      <BrowserRouter>
        <AgentCard {...agent} />
      </BrowserRouter>
    );

    expect(screen.getByText("Real-Estate Agent")).toBeInTheDocument();
  });

  it("renders agent location and contact information", () => {
    render(
      <BrowserRouter>
        <AgentCard {...agent} />
      </BrowserRouter>
    );

    expect(screen.getByText("Lviv")).toBeInTheDocument();
    expect(screen.getByText("+380-097-545-4141")).toBeInTheDocument();
    expect(screen.getByText("5 Properties")).toBeInTheDocument();
  });

  it("generates correct link based on the current user", () => {
    const currentUser = { email: agent.email };
    localStorage.setItem("user", JSON.stringify(currentUser));

    render(
      <BrowserRouter>
        <AgentCard {...agent} />
      </BrowserRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/my-profile");

    localStorage.removeItem("user");
  });

  it("generates correct link when the current user is different", () => {
    const currentUser = { email: "another.user@example.com" };
    localStorage.setItem("user", JSON.stringify(currentUser));

    render(
      <BrowserRouter>
        <AgentCard {...agent} />
      </BrowserRouter>
    );

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/agents/show/1");

    localStorage.removeItem("user");
  });
});

describe("PieChart", () => {
  const chartData = {
    title: "Chart Title",
    value: 75,
    series: [75, 25],
    colors: ["#ff0000", "#00ff00"],
  };

  it("renders chart title and value", () => {
    render(<PieChart {...chartData} />);

    expect(screen.getByText(chartData.title)).toBeInTheDocument();
    expect(screen.getByText(chartData.value)).toBeInTheDocument();
  });

  it("renders the chart with correct series and colors", () => {
    render(<PieChart {...chartData} />);

    const chart = document.querySelector("#chart");

    expect(chart).toHaveStyle({ backgroundColor: "#fcfcfc" });
  });
});

describe("PropertyReferrals", () => {
  const propertyReferralsInfo = [
    {
      title: "Social Media",
      percentage: 64,
      color: "#6C5DD3",
    },
    {
      title: "Marketplace",
      percentage: 40,
      color: "#7FBA7A",
    },
    {
      title: "Websites",
      percentage: 50,
      color: "#FFCE73",
    },
    {
      title: "Digital Ads",
      percentage: 80,
      color: "#FFA2C0",
    },
    {
      title: "Others",
      percentage: 15,
      color: "#F45252",
    },
  ];

  it("renders the component with correct title", () => {
    render(<PropertyReferrals />);

    const titleElement = screen.getByText("Property Referrals");
    expect(titleElement).toBeInTheDocument();
  });

  it("renders the progress bars with correct data", () => {
    render(<PropertyReferrals />);

    const progressBarElements = screen.getAllByTestId("progress-bar");

    expect(progressBarElements).toHaveLength(propertyReferralsInfo.length);

    propertyReferralsInfo.forEach((bar, index) => {
      const progressBar = progressBarElements[index];

      const titleElement = screen.getByText(bar.title);
      expect(titleElement).toBeInTheDocument();

      const percentageElement = screen.getByText(`${bar.percentage}%`);
      expect(percentageElement).toBeInTheDocument();
    });
  });
});

describe("TotalRevenue", () => {
  it("renders the component with correct title and revenue", () => {
    render(<TotalRevenue />);

    const titleElement = screen.getByText("Total Revenue");
    expect(titleElement).toBeInTheDocument();

    const revenueElement = screen.getByText("$236,535");
    expect(revenueElement).toBeInTheDocument();
  });

  it("renders the revenue change with correct percentage and text", () => {
    render(<TotalRevenue />);

    const percentageElement = screen.getByText("0.8%");
    expect(percentageElement).toBeInTheDocument();

    const textElement = screen.getByText("Than Last Month");
    expect(textElement).toBeInTheDocument();
  });

  it("renders the chart", () => {
    render(<TotalRevenue />);

    const chart = screen.getByTestId("chart");
    expect(chart).toBeInTheDocument();
  });
});
