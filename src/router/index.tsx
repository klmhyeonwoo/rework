import {Fragment} from "react";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Main from "@/app/main";
import DefaultLayout from "@/layout/default.tsx";

const routerChildren = [{
    path: '/',
    element: <Main/>
}]

const router = createBrowserRouter([{
    path: '/',
    element: <DefaultLayout/>,
    errorElement: <Fragment/>,
    children: routerChildren,
}])

export const Routers = () => {
    return <RouterProvider router={router}/>
}