import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import HeaderTodo from "../components/HeaderTodo";
import MenuBar from "../components/SideBar/MenuBar";

const { Header, Content } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      <MenuBar />
      <Layout style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
        <Header style={{ backgroundColor: "#FFFFFF", padding: 0 }}>
          <HeaderTodo />{" "}
        </Header>
        <Content className="p-4">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
