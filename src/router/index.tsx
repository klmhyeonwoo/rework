import { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "@/app/main";
import DefaultLayout from "@/layout/default.tsx";
import SignIn from "@/app/signin";

const routerChildren = [
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/",
    element: <SignIn />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <Fragment />,
    children: routerChildren,
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};
