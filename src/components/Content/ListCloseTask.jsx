import { CalendarOutlined, EllipsisOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Modal,
  Tooltip,
  Typography,
} from "antd";
const { Text } = Typography;
import React, { useState } from "react";
import DeleteCloseTask from "./DeleteCloseTask";

const ListCloseTask = ({ task }) => {
  const [openMoreAction, setOpenMoreAction] = useState(false);

  // console.log(task);
  return (
    <div>
      <div className=" group text-gray-400 mt-3">
        <Flex justify="space-between">
          <Flex vertical>
            <Flex>
              <Checkbox checked disabled></Checkbox>
              <Text delete className="pl-3 mb-0 text-gray-400">
                {task.content}
              </Text>
            </Flex>
            <p className="pl-7">{task.description}</p>
            <p className="pl-7">
              <CalendarOutlined className="pr-2" />
              {task.due_date.slice(0, 10)}
            </p>
          </Flex>
          <Flex
            align="center"
            className="text-2xl opacity-0  group-hover:opacity-100 transition-opacity duration-300 gap-2"
          >
            <Tooltip title="More actions">
              <Button
                type="text"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMoreAction(true);
                }}
              >
                <EllipsisOutlined className="text-2xl" />
              </Button>
            </Tooltip>
          </Flex>
        </Flex>

        <Divider style={{ margin: "8px 0" }} />

        {/* Modal open when click EllipsisOutlined for {MORE ACTION} */}
        <Modal
          style={{
            top: "200px",
            left: "40%",
          }}
          open={openMoreAction}
          onOk={() => setOpenMoreAction(false)}
          onCancel={() => setOpenMoreAction(false)}
          width={250}
          footer={null}
          closable={false}
          mask={null}
        >
          <DeleteCloseTask task={task} onChangeAction={setOpenMoreAction} />
        </Modal>
      </div>
    </div>
  );
};

export default ListCloseTask;
