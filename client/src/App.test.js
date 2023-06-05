/* eslint-disable */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { Home, AgentProfile, Agents, AllProperties, MyProfile } from "./pages";
import {
  AgentCard,
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  CustomButton,
  Form,
  Profile,
  PropertyCard,
} from "./components";
import { BrowserRouter } from "react-router-dom";

jest.mock("axios");

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

describe("CustomButton", () => {
  it("renders the button with correct title and styling", () => {
    render(
      <CustomButton title="Submit" backgroundColor="#ff0000" color="#ffffff" />
    );

    const buttonElement = screen.getByText("Submit");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle({ backgroundColor: "#ff0000" });
    expect(buttonElement).toHaveStyle({ color: "#ffffff" });
  });

  it("renders the button with icon and title", () => {
    render(
      <CustomButton
        title="Go Home"
        icon={<i className="icon-home" />}
        backgroundColor="#00ff00"
        color="#000000"
      />
    );

    const buttonElement = screen.getByText("Go Home");
    expect(buttonElement).toBeInTheDocument();

    const iconElement = document.querySelector(".icon-home");
    expect(iconElement).toBeInTheDocument();
  });

  it("renders the button as a link with correct path", () => {
    render(
      <BrowserRouter>
        <CustomButton title="Go to Profile" path="/profile" />
      </BrowserRouter>
    );

    const linkElement = screen.getByTestId("link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/profile");
  });

  it("calls the handleClick function when button is clicked", () => {
    const handleClick = jest.fn();
    render(<CustomButton title="Click Me" handleClick={handleClick} />);

    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();

    buttonElement.click();
    expect(handleClick).toHaveBeenCalled();
  });
});

describe("Form", () => {
  it("renders the form with correct fields", () => {
    render(<Form type="Add" handleSubmit={() => {}} />);

    const formTitle = screen.getByText("Add a Property");
    expect(formTitle).toBeInTheDocument();

    const propertyTitleField = screen.getByTestId("title");
    expect(propertyTitleField).toBeInTheDocument();

    const propertyDescriptionField = screen.getByTestId("description");
    expect(propertyDescriptionField).toBeInTheDocument();

    const propertyTypeField = screen.getByTestId("propertyType");
    expect(propertyTypeField).toBeInTheDocument();

    const propertyPriceField = screen.getByTestId("price");
    expect(propertyPriceField).toBeInTheDocument();

    const propertyLocationField = screen.getByTestId("location");
    expect(propertyLocationField).toBeInTheDocument();

    const propertyPhotoUploadButton = screen.getByText("Upload *");
    expect(propertyPhotoUploadButton).toBeInTheDocument();
  });

  it("calls the handleSubmit function when form is submitted", () => {
    const handleSubmit = jest.fn();
    render(
      <Form
        type="Add"
        handleSubmit={handleSubmit}
        handleImageChange={() => {}}
      />
    );

    const formElement = screen.getByTestId("form");
    fireEvent.submit(formElement);
    expect(handleSubmit).toHaveBeenCalled();
  });

  it("calls the handleImageChange function when photo is uploaded", () => {
    const handleImageChange = jest.fn();
    render(
      <Form
        type="Add"
        handleSubmit={() => {}}
        handleImageChange={handleImageChange}
      />
    );

    const file = new File(["dummy content"], "photo.jpg", {
      type: "image/jpeg",
    });
    const uploadInput = screen.getByLabelText("Upload *");
    fireEvent.change(uploadInput, { target: { files: [file] } });
    expect(handleImageChange).toHaveBeenCalledWith(file);
  });
});

describe("Profile component", () => {
  test("renders profile information correctly", () => {
    const mockProfile = {
      type: "User",
      name: "John Doe",
      avatar: "avatar.jpg",
      email: "john.doe@example.com",
      properties: [
        {
          _id: "1",
          title: "Property 1",
          location: "Location 1",
          price: 100000,
          photo: "property1.jpg",
        },
        {
          _id: "2",
          title: "Property 2",
          location: "Location 2",
          price: 200000,
          photo: "property2.jpg",
        },
      ],
    };

    render(
      <BrowserRouter>
        <Profile {...mockProfile} />
      </BrowserRouter>
    );

    expect(screen.getByText("User Profile")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Realestate Agent")).toBeInTheDocument();
    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("Phone Number")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(
      screen.getByText("4517 Washington Ave. Manchaster, Kentucky 39495")
    ).toBeInTheDocument();
    expect(screen.getByText("+0123 456 7890")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();

    expect(screen.getByText("User Properties")).toBeInTheDocument();
    expect(screen.getByText("Property 1")).toBeInTheDocument();
    expect(screen.getByText("Property 2")).toBeInTheDocument();
    expect(screen.getByText("Location 1")).toBeInTheDocument();
    expect(screen.getByText("Location 2")).toBeInTheDocument();
    expect(screen.getByText("$100000")).toBeInTheDocument();
    expect(screen.getByText("$200000")).toBeInTheDocument();
  });

  test("does not render properties section when no properties are provided", () => {
    const mockProfile = {
      type: "User",
      name: "John Doe",
      avatar: "avatar.jpg",
      email: "john.doe@example.com",
      properties: [],
    };

    render(<Profile {...mockProfile} />);

    expect(screen.queryByText("User Properties")).toBeNull();
  });
});

describe("PropertyCard component", () => {
  const mockProperty = {
    id: "1",
    title: "Property 1",
    location: "Location 1",
    price: 100000,
    photo: "property1.jpg",
  };

  test("renders property information correctly", () => {
    render(
      <BrowserRouter>
        <PropertyCard {...mockProperty} />
      </BrowserRouter>
    );

    expect(screen.getByText("Property 1")).toBeInTheDocument();
    expect(screen.getByText("Location 1")).toBeInTheDocument();
    expect(screen.getByText("$100000")).toBeInTheDocument();
  });

  test("renders property card as a link", () => {
    render(
      <BrowserRouter>
        <PropertyCard {...mockProperty} />
      </BrowserRouter>
    );

    const linkElement = screen.getByTestId("link");
    expect(linkElement).toHaveAttribute("href", "/properties/show/1");
    expect(linkElement).toHaveStyle("text-decoration: none");
  });
});

describe("AgentProfile component", () => {
  it("should render agent profile", async () => {
    const agentData = {
      _id: "1",
      name: "Agent 1",
      email: "agent1@example.com",
      avatar: "avatar1.png",
      allProperties: [],
    };

    axios.get.mockResolvedValueOnce({ data: agentData });

    render(
      <BrowserRouter>
        <AgentProfile />
      </BrowserRouter>
    );

    expect(screen.getByText(/Agent Profile/i)).toBeInTheDocument();

    expect(screen.findByText(agentData.name));
    expect(screen.findByText(agentData.email));
  });
});

describe("Agents component", () => {
  it("should render agents list", async () => {
    const agentsData = [
      {
        _id: "1",
        name: "Agent 1",
        email: "agent1@example.com",
        avatar: "avatar1.png",
        allProperties: [],
      },
      {
        _id: "2",
        name: "Agent 2",
        email: "agent2@example.com",
        avatar: "avatar2.png",
        allProperties: [],
      },
    ];

    axios.get.mockResolvedValueOnce({ data: agentsData });

    screen.debug();

    render(
      <BrowserRouter>
        <Agents />
      </BrowserRouter>
    );

    expect(screen.getByText("Agents List")).toBeInTheDocument();

    agentsData.forEach((agent) => {
      expect(screen.findByText(agent.name));
      expect(screen.findByText(agent.email));
      expect(screen.findByText(`Properties: ${agent.allProperties.length}`));
    });
  });
});

describe("AllProperties component", () => {
  it("should render all properties", async () => {
    const propertiesData = [
      {
        _id: "1",
        title: "Property 1",
        price: 100000,
        location: "Location 1",
        photo: "photo1.png",
      },
      {
        _id: "2",
        title: "Property 2",
        price: 200000,
        location: "Location 2",
        photo: "photo2.png",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: propertiesData });

    render(
      <BrowserRouter>
        <AllProperties />
      </BrowserRouter>
    );

    expect(screen.getByText("All Properties")).toBeInTheDocument();

    propertiesData.forEach((property) => {
      expect(screen.findByText(property.title));
      expect(screen.findByText(`Price: ${property.price}`));
      expect(screen.findByText(`Location: ${property.location}`));
    });
  });
});

describe("MyProfile component", () => {
  beforeEach(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({ userid: "1", email: "user@example.com" })
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should render my profile", async () => {
    const myProfileData = {
      _id: "1",
      name: "My Name",
      email: "user@example.com",
      avatar: "avatar.png",
      allProperties: [],
    };

    axios.get.mockResolvedValueOnce({ data: myProfileData });

    render(<MyProfile />);

    expect(screen.getByText("My Profile")).toBeInTheDocument();

    expect(screen.findByText(myProfileData.name));
    expect(screen.findByText(myProfileData.email));
  });
});
