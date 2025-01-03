import { EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

const EditTask = ({ onSetTaskCard }) => {
  return (
    <div>
      <Button
        type="text"
        block
        className="flex flex-row justify-start gap-3  items-center "
        onClick={() => onSetTaskCard()}
      >
        <EditOutlined /> <span>Edit</span>
      </Button>
    </div>
  );
};

export default EditTask;
