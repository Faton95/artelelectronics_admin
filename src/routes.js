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
import Brand from 'views/Dashboard/Brand';
import Catalogue from 'views/Dashboard/Catalogue';


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
    icon: <HomeIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tables",
    icon: <StatsIcon color='inherit' />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/billing",
    name: "Billing",
    icon: <CreditIcon color='inherit' />,
    component: Billing,
    layout: "/admin",
  },
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
    icon: <SupportIcon color='inherit' />,
    component: Countries,
    layout: "/admin",
  },
  {
    path: "/news",
    name: "Новости",
    icon: <CreditIcon color='inherit' />,
    component: News,
    layout: "/admin",
  },
  {
    path: "/brand",
    name: "Бренд",
    icon: <CreditIcon color='inherit' />,
    component: Brand,
    layout: "/admin",
  },
  {
    path: "/catalogue",
    name: "Каталог",
    icon: <CreditIcon color='inherit' />,
    component: Catalogue,
    layout: "/admin",
  },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        icon: <PersonIcon color='inherit' />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/signin",
        name: "Sign In",
        icon: <DocumentIcon color='inherit' />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",
        icon: <RocketIcon color='inherit' />,
        component: SignUp,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
