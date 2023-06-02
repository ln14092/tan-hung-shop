import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import DefaultLayout from "./layout/DefaultLayout";
import React, { Fragment } from "react";
import { publicRoutes, privateRoutes } from "./routes";

function App() {
  const admin = useSelector((state) => state.user?.currentUser?.isAdmin);
  const routes = admin ? privateRoutes : publicRoutes;

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          const Page = route.component;

          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
