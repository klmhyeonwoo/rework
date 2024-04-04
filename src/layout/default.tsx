import {Outlet} from "react-router-dom";

export default function DefaultLayout() {
    return (
        <main>
            <Outlet/>
        </main>
    )
}