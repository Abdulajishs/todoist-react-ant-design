import { MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

const MoveTask = () => {
  return (
    <div>
      <div>
        <Button
          type="text"
          block
          className="flex flex-row justify-start gap-3 items-center"
          // onClick={showModal}
        >
          <MenuUnfoldOutlined /> <span>Move</span>
        </Button>
      </div>
    </div>
  );
};

export default MoveTask;
