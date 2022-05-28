const data = {
  user: {
    name: "Admin",
  },
  summary: [
    {
      title: "Total Products",
      subtitle: "Total products",
      value: "$1.000",
      percent: 70,
    },
    {
      title: "Orders",
      subtitle: "Total orders today",
      value: "3000",
      percent: 49,
    },
    {
      title: "Revenue",
      subtitle: "Total revenue today",
      value: "$678",
      percent: 38,
    },
    {
      title: "Visits",
      subtitle: "Total visits today",
      value: "2345",
      percent: 55,
    },
  ],
  revenueSummary: {
    title: "Revenue",
    value: "$678",
    chartData: {
      labels: ["May", "Jun", "July", "Aug", "May", "Jun", "July", "Aug"],
      data: [300, 300, 280, 380, 200, 300, 280, 350],
    },
  },
  overall: [
    {
      value: "300K",
      title: "Orders",
    },
    {
      value: "9.876K",
      title: "Customers",
    },
    {
      value: "1.234K",
      title: "Products",
    },
    {
      value: "$5678",
      title: "Revenue",
    },
  ],
};

export default data;
