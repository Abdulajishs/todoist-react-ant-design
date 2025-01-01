import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import MenuBar from "../components/SideBar/MenuBar";

const { Header, Content } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <MenuBar />
      <Layout className="min-h-screen bg-white">
        {/* <Header style={{ backgroundColor: "#FFFFFF", padding: 0 }}>
          <HeaderTodo />{" "}
        </Header> */}
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
