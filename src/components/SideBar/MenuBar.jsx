import React, { useState } from "react";
import { Flex, Layout, Tooltip } from "antd";
import { DownOutlined, LayoutOutlined, PlusOutlined } from "@ant-design/icons";
import MyProjects from "./MyProjects";
import Favorites from "./Favorites";
import AddTasks from "./AddTasks";

const { Sider } = Layout;

const MenuBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div
        className={`absolute top-4 ${
          collapsed ? "left-4" : "right-[78%]"
        } bg-transparent cursor-pointer z-10`}
        onClick={() => setCollapsed((prev) => !prev)}
      >
        <Tooltip title="Open/close Sidebar">
          <LayoutOutlined className="text-lg" />
        </Tooltip>
      </div>

      <Sider
        style={{ backgroundColor: "#FCFAF8" }}
        className="bg-[#FCFAF8]"
        width="23%"
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
      >
        <div className="mt-16 flex flex-col">
          <AddTasks />
          <Favorites />
          <MyProjects />
        </div>
      </Sider>
    </>
  );
};

export default MenuBar;
