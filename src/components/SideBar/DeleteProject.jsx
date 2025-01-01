import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
import React, { useContext, useState } from "react";
import { TodoistApi } from "@doist/todoist-api-typescript";
import { ProjectsContext } from "../../store/ProjectsContext";
import { useNavigate } from "react-router-dom";

const token = import.meta.env.VITE_TOKEN;

const DeleteProject = ({ project, onChangeAction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { refreshProjects } = useContext(ProjectsContext);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
    onChangeAction(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const api = new TodoistApi(token);
    api
      .deleteProject(project.id)
      .then((isSuccess) => {
        console.log("Deleted successfully", isSuccess);
        message.success(`Project "${project.name}" deleted successfully.`);
        setIsModalOpen(false);
        refreshProjects();
        setIsDeleting(false);
        navigate("/app/projects");
      })
      .catch((error) => {
        console.log(error);
        message.error("Failed to delete the project. Please try again.");
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="text"
        block
        className="flex flex-row justify-start gap-3 items-center text-red-600"
        onClick={showModal}
      >
        <DeleteOutlined /> <span>Delete</span>
      </Button>
      <Modal
        title="Delete Project?"
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
          The <span className=" font-bold">{project.name}</span> project and all
          of its tasks will be permanently deleted.
        </p>
      </Modal>
    </>
  );
};

export default DeleteProject;
