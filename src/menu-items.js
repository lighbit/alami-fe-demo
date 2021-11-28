export default {
  items: [
    {
      id: "support",
      title: "Main Menu",
      type: "group",
      icon: "icon-support",
      children: [
        {
          id: "customer",
          title: "Customer",
          type: "item",
          classes: "nav-item",
          url: "/customer",
          icon: "feather icon-users",
        },
        {
          id: "Transaction-log",
          title: "Transaction Log PostgreSQL",
          type: "item",
          classes: "nav-item",
          url: "/transaction",
          icon: "feather icon-book",
        },
        {
          id: "Transaction-user",
          title: "Transaction Log MongoDB",
          type: "item",
          classes: "nav-item",
          url: "/transaction-user",
          icon: "feather icon-user",
        },
      ],
    },
  ],
};
