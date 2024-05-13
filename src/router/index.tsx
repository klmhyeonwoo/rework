import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "@/app/main";
import DefaultLayout from "@/layout/default.tsx";
import SignIn from "@/app/signin";
import Error from "@/app/error/404.tsx";

const routerChildren = [
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "*",
    element: <Error />,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <Error />,
    children: routerChildren,
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};
