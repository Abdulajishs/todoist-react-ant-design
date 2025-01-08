import { DeleteOutlined } from "@ant-design/icons";
import { Button, Modal, message } from "antd";
import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteExistingProject } from "../../store/projects-action";

const DeleteProject = ({ project, onChangeAction }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
    onChangeAction(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await dispatch(deleteExistingProject(project.id));
    if (result.success) {
      message.success(`Project "${project.name}" deleted successfully.`);
      setIsModalOpen(false);
      navigate("/app/projects");
    } else {
      console.error("Failed to delete the project:", result.error);
      message.error("Failed to delete the project. Please try again.");
    }
    setIsDeleting(false);
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
