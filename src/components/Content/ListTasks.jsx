import { Checkbox, Divider, Flex } from "antd";
import React from "react";

const ListTasks = ({ task }) => {
  return (
    <>
      <Flex vertical>
        <Flex>
          <Checkbox></Checkbox>
          <p className="pl-3 mb-0">{task.content}</p>
        </Flex>
        <p className="pl-7">{task.description}</p>
      </Flex>
      <Divider style={{ margin: "8px 0" }} />
    </>
  );
};

export default ListTasks;
