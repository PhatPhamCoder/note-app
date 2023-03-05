import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { RouterProvider } from "react-router-dom";

import router from "./router";
import "./firebase/config";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
