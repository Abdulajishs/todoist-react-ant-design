import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal } from "antd";
import React, { useState } from "react";
import { TodoistApi } from "@doist/todoist-api-typescript";

const token = import.meta.env.VITE_TOKEN;

const DeleteProject = ({ project, onChangeAction, onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    onChangeAction(false);
  };

  const handleOk = () => {
    const api = new TodoistApi(token);
    api
      .deleteProject(project.id)
      .then((isSuccess) => {
        console.log("Deleted successfully", isSuccess);
        setIsModalOpen(false);
        onRefresh(Math.random());
      })
      .catch((error) => console.log(error));
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="text"
        block
        className="flex flex-row justify-start gap-3  items-center text-red-600"
        onClick={showModal}
      >
        <DeleteOutlined /> <span>Delete</span>
      </Button>
      <Modal
        title="Delete Project?"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
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
          The <span className=" font-bold">{project.name}</span> project and all
          of its tasks will be permanently deleted.
        </p>
      </Modal>
    </>
  );
};

export default DeleteProject;
