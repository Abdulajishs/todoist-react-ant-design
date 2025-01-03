import { EditOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Checkbox, Divider, Flex, message, Modal, Tooltip } from "antd";
import React, { useContext, useState } from "react";
import EditTask from "./EditTask";
import MoveTask from "./MoveTask";
import DeleteTask from "./DeleteTask";
import EditTaskCard from "./EditTaskCard";
import { TasksContext } from "../../store/TasksContext";

const ListTasks = ({ task }) => {
  const [openMoreAction, setOpenMoreAction] = useState(false);
  const [openEditTask, setOpenEditTask] = useState(false);
  const { closeTask } = useContext(TasksContext);

  // console.log(task);

  const handleEditTaskClick = () => {
    setOpenEditTask((prev) => !prev);
  };

  const handleCheckedClick = async (e) => {
    console.log(`checked = ${e.target.checked}`);
    try {
      if (e.target.checked) {
        let data = await closeTask(task.id, task);
        console.log("Updated the Task status successfully", data);

        message.success(`Task "${task.content}" updated status successfully.`);
      }
    } catch (error) {
      console.error("Failed to update the Task status:", error);
      message.error("Failed to update the Task status. Please try again.");
    }
  };

  return (
    <div className=" group">
      {!openEditTask ? (
        <Flex justify="space-between">
          <Flex vertical>
            <Flex>
              <Checkbox onChange={handleCheckedClick}></Checkbox>
              <p className="pl-3 mb-0">{task.content}</p>
            </Flex>
            <p className="pl-7">{task.description}</p>
          </Flex>
          <Flex
            align="center"
            className="text-2xl opacity-0  group-hover:opacity-100 transition-opacity duration-300 gap-2"
          >
            <Tooltip title="Edit task">
              <Button type="text" onClick={() => handleEditTaskClick()}>
                <EditOutlined className="text-2xl" />
              </Button>
            </Tooltip>
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
      ) : (
        <EditTaskCard task={task} onSetTaskCard={handleEditTaskClick} />
      )}
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
        <EditTask onSetTaskCard={handleEditTaskClick} />

        <Divider style={{ margin: "8px 0" }} />

        <MoveTask task={task} onChangeAction={setOpenMoreAction} />

        <Divider style={{ margin: "8px 0" }} />

        <DeleteTask task={task} onChangeAction={setOpenMoreAction} />
      </Modal>
    </div>
  );
};

export default ListTasks;
