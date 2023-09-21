// import
import React, { Component } from "react";
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Billing from "views/Dashboard/Billing.js";
import Countries from "views/Dashboard/Countries";
import Profile from "views/Dashboard/Profile.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";
import News from "views/Dashboard/News";
import Brand from "views/Dashboard/Brand";
import Catalogue from "views/Dashboard/Catalogue";
import WhereToBuy from "views/Dashboard/WhereToBuy";
import Products from "views/Dashboard/Product/Products";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";
import ProductAdvantage from "views/Dashboard/Product/ProductAdvantage";
import ProductCharacteristics from "views/Dashboard/Product/ProductCharacteristics";
import ProductsByExcel from "views/Dashboard/Product/ProductsByExcel";
import Color from "views/Dashboard/Color";
import ProductPreview from "views/Dashboard/Product/ProductsPreview";
import ProductVariants from "views/Dashboard/Product/ProductVariants";
import ProductInstruction from "views/Dashboard/Product/ProductsInstruction";
import Districts from "views/Dashboard/Districts";
import Regions from "views/Dashboard/Regions";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Главная",
    icon: <HomeIcon color='inherit' />,
    component: Dashboard,
    layout: "/admin",
  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   icon: <StatsIcon color='inherit' />,
  //   component: Tables,
  //   layout: "/admin",
  // },
  // {
  //   path: "/billing",
  //   name: "Billing",
  //   icon: <CreditIcon color='inherit' />,
  //   component: Billing,
  //   layout: "/admin",
  // },
  // {
  //   path: "/supplier",
  //   name: "Снабженец",
  //   icon: <StatsIcon color='inherit' />,
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  // {
  //   path: "/hr",
  //   name: "HR",
  //   icon: <RocketIcon color='inherit' />,
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  // {
  //   path: "/press-service",
  //   name: "Press служба",
  //   icon: <PersonIcon color='inherit' />,
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  // {
  //   path: "/service",
  //   name: "Сервис",
  //   icon: <CreditIcon color='inherit' />,
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  // {
  //   path: "/marketing",
  //   name: "Маркетинг",
  //   icon: <HomeIcon color='inherit' />,
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  // {
  //   path: "/finance",
  //   name: "Финансы",
  //   icon: <StatsIcon color='inherit' />,
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  // {
  //   path: "/lawyers",
  //   name: "Юристы",
  //   icon: <HomeIcon color='inherit' />,
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  {
    path: "/countries",
    name: "Страны",
    icon: <SupportIcon color='inherit' />,
    component: Countries,
    layout: "/admin",
  },
  {
    path: "/regions",
    name: "Области",
    icon: <SupportIcon color='inherit' />,
    component: Regions,
    layout: "/admin",
  },
  {
    path: "/districts",
    name: "Регионы",
    icon: <SupportIcon color='inherit' />,
    component: Districts,
    layout: "/admin",
  },
  // {
  //   path: "/news",
  //   name: "Новости",
  //   icon: <CreditIcon color='inherit' />,
  //   component: News,
  //   layout: "/admin",
  // },
  // {
  //   path: "/brand",
  //   name: "Бренд",
  //   icon: <CreditIcon color='inherit' />,
  //   component: Brand,
  //   layout: "/admin",
  // },
  // {
  //   path: "/catalogue",
  //   name: "Каталог",
  //   icon: <CreditIcon color='inherit' />,
  //   component: Catalogue,
  //   layout: "/admin",
  // },
  {
    path: "/where-to-buy",
    name: "Где купить ?",
    icon: <CreditIcon color='inherit' />,
    component: WhereToBuy,
    layout: "/admin",
  },
  // {
  //   path: "/color",
  //   name: "Цвета",
  //   icon: <CreditIcon color='inherit' />,
  //   component: Color,
  //   layout: "/admin",
  // },
  // {
  //   path: "/products",
  //   name: "Продукты",
  //   icon: <PersonIcon color='inherit' />,
  //   component: Products,
  //   layout: "/admin",
  // },
  // {
  //   path: "/products-variants",
  //   name: "Варианты продукта",
  //   icon: <PersonIcon color='inherit' />,
  //   component: ProductVariants,
  //   layout: "/admin",
  // },
  // {
  //   path: "/excel-product",
  //   name: "Продукты Excel",
  //   icon: <CreditIcon color='inherit' />,
  //   component: ProductsByExcel,
  //   layout: "/admin",
  // },
  // {
  //   path: "/product-preview",
  //   name: "Предварительный просмотр продукта",
  //   icon: <CreditIcon color='inherit' />,
  //   component: ProductPreview,
  //   layout: "/admin",
  // },
  // {
  //   path: "/product-advantage",
  //   name: "Преимущества продукта",
  //   icon: <DocumentIcon color='inherit' />,
  //   component: ProductAdvantage,
  //   layout: "/admin",
  // },
  // {
  //   path: "/product-characteristics",
  //   name: "Характеристики продукта",
  //   icon: <RocketIcon color='inherit' />,
  //   component: ProductCharacteristics,
  //   layout: "/admin",
  // },
  // {
  //   path: "/product-instruction",
  //   name: "Инструкция продукта",
  //   icon: <RocketIcon color='inherit' />,
  //   component: ProductInstruction,
  //   layout: "/admin",
  // },
  // {
  //   name: "ACCOUNT PAGES",
  //   category: "account",
  //   state: "pageCollapse",
  //   views: [
  //     {
  //       path: "/profile",
  //       name: "Profile",
  //       icon: <PersonIcon color='inherit' />,
  //       secondaryNavbar: true,
  //       component: Profile,
  //       layout: "/admin",
  //     },
  //     {
  //       path: "/signin",
  //       name: "Sign In",
  //       icon: <DocumentIcon color='inherit' />,
  //       component: SignIn,
  //       layout: "/auth",
  //     },
  //     {
  //       path: "/signup",
  //       name: "Sign Up",
  //       icon: <RocketIcon color='inherit' />,
  //       component: SignUp,
  //       layout: "/auth",
  //     },
  //   ],
  // },
];
export default dashRoutes;
