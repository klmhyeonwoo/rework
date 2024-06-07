import React from "react";
import ReactDOM from "react-dom/client";
import { Routers } from "@/router";
import "./style/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <Routers />
    </QueryClientProvider>
  </React.StrictMode>,
);
