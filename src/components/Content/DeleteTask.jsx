import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteExistingTask } from "../../store/tasks-action";

const DeleteTask = ({ task, onChangeAction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();

  const showModal = () => {
    setIsModalOpen(true);
    onChangeAction(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    let data = await dispatch(deleteExistingTask(task.id));
    if (data.success) {
      console.log("Deleted successfully", data.data);
      message.success(`Task "${task.content}" deleted successfully.`);
      setIsModalOpen(false);
    } else {
      console.error("Failed to delete the Task:", error);
      message.error("Failed to delete the Task. Please try again.");
    }
    setIsDeleting(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <Button
        type="text"
        block
        className="flex flex-row justify-start gap-3 items-center text-red-600"
        onClick={showModal}
      >
        <DeleteOutlined /> <span>Delete</span>
      </Button>
      <Modal
        title="Delete task?"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleDelete}
        confirmLoading={isDeleting}
        okText="Delete"
        okButtonProps={{
          style: {
            backgroundColor: "#DC4C3E",
            color: "white",
          },
        }}
        cancelButtonProps={{
          style: { backgroundColor: "#F5F5F5", color: "gray", border: "none" },
        }}
      >
        <p>
          The <span className=" font-bold">{task.content}</span> task will be
          permanently deleted.
        </p>
      </Modal>
    </div>
  );
};

export default DeleteTask;
