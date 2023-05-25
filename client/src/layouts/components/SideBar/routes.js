export const roleEnum = {
  Customer: 1,
  Staff: 2,
  Admin: 3,
};

export const routes = [
  {
    title: "Overview",
    path: "/admin",
    exactly: true,
    permissions: [roleEnum.Staff, roleEnum.Admin],
  },
  {
    title: "Product Management",
    path: "/admin/product",
    subMenu: [
      {
        title: "Add Product",
        path: "/admin/product/add-card-shop",
      },
    ],
    permissions: [roleEnum.Staff, roleEnum.Admin],
  },

  {
    title: "Order Management",
    path: "/admin/order",
    permissions: [roleEnum.Staff, roleEnum.Admin],
  },
  {
    title: "Discount code",
    path: "/admin/voucher",
    permissions: [roleEnum.Staff, roleEnum.Admin],
  },
  {
    title: "Client Management",
    path: "/admin/customer",
    permissions: [roleEnum.Staff, roleEnum.Admin],
  },
  {
    title: "Staff Management",
    path: "/admin/staff",
    permissions: [roleEnum.Admin],
  },
];
