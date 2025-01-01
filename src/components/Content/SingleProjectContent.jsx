import React, { useContext, useEffect, useState } from "react";
import { Button, Divider, Flex, Modal, Space, Tooltip, Typography } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TasksContext } from "../../store/TasksContext";
import { ProjectsContext } from "../../store/ProjectsContext";
import { TodoistApi } from "@doist/todoist-api-typescript";
import AddTaskCard from "./AddTaskCard";
import ListTasks from "./ListTasks";
import EditProject from "../SideBar/EditProject";
import AddToFavorite from "../SideBar/AddToFavorite";
import DeleteProject from "../SideBar/DeleteProject";
import {
  EllipsisOutlined,
  PlusCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";

const token = import.meta.env.VITE_TOKEN;

const SingleProjectContent = () => {
  const [openCard, setOpenCard] = useState(false);
  const [openMoreAction, setOpenMoreAction] = useState(false);
  const [editProjectName, setEditProjectName] = useState("");

  const { refreshProjects } = useContext(ProjectsContext);
  const { tasks } = useContext(TasksContext);

  const location = useLocation();
  const { project } = location.state || {};
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (project) {
      // Reset editProjectName when a new project is loaded
      setEditProjectName(project.name);
    }
  }, [project]);

  useEffect(() => {
    if (!project || editProjectName === project.name) return;

    const api = new TodoistApi(token);
    const timeout = setTimeout(() => {
      api
        .updateProject(project.id, { name: editProjectName })
        .then((updatedProject) => {
          console.log("Project updated successfully:", updatedProject);
          refreshProjects();
        })
        .catch((error) => console.error("Failed to update project:", error));
    }, 500);

    return () => clearTimeout(timeout);
  }, [editProjectName, project]);

  const handleMyProjectClick = () => navigate("/app/projects");

  const selectedProjectTasks = tasks.filter((task) => task.projectId === id);

  return (
    <>
      {/* Header */}
      <Flex justify="space-between" style={{ padding: "16px" }}>
        <Button
          type="text"
          className="font-semibold text-gray-500"
          onClick={handleMyProjectClick}
        >
          My projects /
        </Button>

        <Tooltip title="More actions">
          <Button
            type="text"
            className="text-2xl"
            onClick={() => setOpenMoreAction(true)}
          >
            <EllipsisOutlined />
          </Button>
        </Tooltip>
      </Flex>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center">
        {/* Project Name */}
        <Space direction="vertical" className="w-[50%]">
          <Typography.Title
            editable={{
              onChange: (value) => setEditProjectName(value),
            }}
            level={4}
          >
            {editProjectName}
          </Typography.Title>

          {/* Show Tasks */}
          <div>
            {selectedProjectTasks.map((task) => (
              <ListTasks key={task.id} task={task} />
            ))}
          </div>

          {/* Add Task Card */}
          {!openCard && (
            <Button
              type="text"
              block
              className="flex justify-start items-center text-lg group"
              onClick={() => setOpenCard(true)}
            >
              <PlusCircleFilled className="hidden group-hover:inline text-red-500" />
              <span className="pl-3 text-gray-500 group-hover:text-red-500 leading-6">
                Add Task
              </span>
            </Button>
          )}
        </Space>

        {openCard && <AddTaskCard onSetOpenCard={setOpenCard} />}
      </div>

      {/* Modal for More Actions for projects */}
      <Modal
        style={{
          top: "40px",
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
        <EditProject project={project} onChangeAction={setOpenMoreAction} />
        <Divider style={{ margin: "8px 0" }} />
        <AddToFavorite project={project} />
        <Divider style={{ margin: "8px 0" }} />
        <DeleteProject project={project} onChangeAction={setOpenMoreAction} />
      </Modal>
    </>
  );
};

export default SingleProjectContent;
