import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "@/app/main";
import DefaultLayout from "@/layout/default.tsx";
import SignIn from "@/app/signin";
import Error from "@/app/error/404.tsx";
import Change from "@/app/signin/change.tsx";

const routerChildren = [
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/change",
    element: <Change />,
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
