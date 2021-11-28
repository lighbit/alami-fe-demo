import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const Transaction = React.lazy(() => import("./service/TransactionLog-list"));
const TransactionData = React.lazy(() => import("./service/Transaction-data"));
const TransactionSearch = React.lazy(() => import("./service/Transaction-search"));
const TransactionUser = React.lazy(() => import("./service/Transaction-peruser-log"));
const Customer = React.lazy(() => import("./service/customer"));
const CustomerData = React.lazy(() => import("./service/customer-data"));

const routes = [{
    path: "/transaction",
    exact: true,
    name: "Transaction Machine",
    component: Transaction,
},
{
    path: "/transaction/:success",
    exact: true,
    name: "Transaction Machine",
    component: Transaction,
},
{
    path: "/new-transaction",
    exact: true,
    name: "Add Transaction",
    component: TransactionData,
},
{
    path: "/search-transaction",
    exact: true,
    name: "Transaction Search",
    component: TransactionSearch,
},
{
    path: "/transaction-user",
    exact: true,
    name: "Transaction User Page",
    component: TransactionUser
},
{
    path: "/customer",
    exact: true,
    name: "Customer List",
    component: Customer
},
{
    path: "/customer/:success",
    exact: true,
    name: "Customer List",
    component: Customer
},
{
    path: "/new-customer",
    exact: true,
    name: "Add Customer",
    component: CustomerData
},
{
    path: "/edit-customer/:id",
    exact: true,
    name: "Edit Customer",
    component: CustomerData
},
];

export default routes;