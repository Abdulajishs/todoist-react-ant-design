import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import MenuBar from "../components/SideBar/MenuBar";

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <MenuBar />
      <Layout className="min-h-screen bg-white">
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
