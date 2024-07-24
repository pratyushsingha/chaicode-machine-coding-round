import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OtpFormPage from "./pages/OtpFormPage.jsx";
import CourseListPage from "./pages/CourseListPage.jsx";
import BatchPage from "./pages/BatchPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/otp-form", element: <OtpFormPage /> },
      { path: "/course-list", element: <CourseListPage /> },
      { path: "/batches", element: <BatchPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
