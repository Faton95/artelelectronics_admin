// import
import React, { Component }  from 'react';
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Billing from "views/Dashboard/Billing.js";
import Countries from "views/Dashboard/Countries";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";
import News from 'views/Dashboard/News';

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Главная",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   rtlName: "لوحة القيادة",
  //   icon: <StatsIcon color='inherit' />,
  //   component: Tables,
  //   layout: "/admin",
  // },
  // {
  //   path: "/billing",
  //   name: "Billing",
  //   rtlName: "لوحة القيادة",
  //   icon: <CreditIcon color='inherit' />,
  //   component: Billing,
  //   layout: "/admin",
  // },
  {
    path: "/supplier",
    name: "Снабженец",
    icon: <StatsIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/hr",
    name: "HR",
    icon: <RocketIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/press-service",
    name: "Press служба",
    icon: <PersonIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/service",
    name: "Сервис",
    icon: <CreditIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/marketing",
    name: "Маркетинг",
    icon: <HomeIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/finance",
    name: "Финансы",
    icon: <StatsIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/lawyers",
    name: "Юристы",
    icon: <HomeIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/countries",
    name: "Страны",
    rtlName: "آرتيإل",
    icon: <SupportIcon color='inherit' />,
    component: Countries,
    layout: "/admin",
  },
  {
    path: "/news",
    name: "Новости",
    rtlName: "لوحة القيادة",
    icon: <CreditIcon color='inherit' />,
    component: News,
    layout: "/admin",
  },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color='inherit' />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Sign In",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color='inherit' />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color='inherit' />,
        component: SignUp,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
