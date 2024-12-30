import React from "react";
import { Layout, Splitter } from "antd";
import { Outlet } from "react-router-dom";
import HeaderTodo from "../components/HeaderTodo";
import MenuBar from "../components/SideBar/MenuBar";

const { Header, Content } = Layout;

const MainLayout = () => {
  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
      {/* <Splitter
        style={{
          height: "100vh",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      > */}
      {/* <Splitter.Panel default="15%" min="10%" max="30%"> */}
      <MenuBar />
      {/* </Splitter.Panel> */}
      {/* <Splitter.Panel> */}
      <Layout style={{ backgroundColor: "#FFFFFF", height: "100%" }}>
        <Header style={{ backgroundColor: "#FFFFFF", padding: 0 }}>
          <HeaderTodo />{" "}
        </Header>
        <Content className="p-4">
          <Outlet />
        </Content>
      </Layout>
      {/* </Splitter.Panel> */}
      {/* </Splitter> */}
    </Layout>
  );
};

export default MainLayout;
