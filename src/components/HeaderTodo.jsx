import React from "react";
import { Button, Flex } from "antd";
import { SettingFilled, SettingOutlined } from "@ant-design/icons";

const HeaderTodo = () => {
  return (
    <>
      <Flex justify="flex-end" style={{ padding: "16px" }}>
        <Flex
          justify="center"
          align="center"
          gap={"small"}
          style={{ color: "#74686B", fontSize: "18px" }}
        >
          <Button type="text">
            <SettingOutlined /> Settings
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default HeaderTodo;
