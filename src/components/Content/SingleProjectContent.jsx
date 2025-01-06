import React, { useContext, useEffect, useState } from "react";
import { Button, Divider, Flex, Modal, Space, Tooltip, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { TasksContext } from "../../store/TasksContext";
import { ProjectsContext } from "../../store/ProjectsContext";
import AddTaskCard from "./AddTaskCard";
import ListTasks from "./ListTasks";
import EditProject from "../SideBar/EditProject";
import AddToFavorite from "../SideBar/AddToFavorite";
import DeleteProject from "../SideBar/DeleteProject";
import { EllipsisOutlined, PlusCircleFilled } from "@ant-design/icons";
import ListCloseTask from "./ListCloseTask";

const SingleProjectContent = () => {
  const [openCard, setOpenCard] = useState(false);
  const [openMoreAction, setOpenMoreAction] = useState(false);
  const [editProjectName, setEditProjectName] = useState("");

  const { projects, updateProject } = useContext(ProjectsContext);
  const { id } = useParams();
  const project = projects.filter((project) => project.id === id)[0];
  // console.log(project);

  const { tasks, closedTasks } = useContext(TasksContext);

  const navigate = useNavigate();

  useEffect(() => {
    // console.log("check check");
    if (project) {
      setEditProjectName(project.name);
    }
  }, [project]);

  useEffect(() => {
    if (editProjectName === project.name) return;
    const timeout = setTimeout(async () => {
      try {
        let data = await updateProject(project.id, { name: editProjectName });
        console.log("Project updated successfully:", data);
      } catch (error) {
        console.error("Failed to update project:", error);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [editProjectName]);

  const handleMyProjectClick = () => navigate("/app/projects");
  console.log(id, tasks, closedTasks);

  const selectedProjectTasks = tasks.filter((task) => task.projectId === id);
  const selectedProjectClosedTasks = closedTasks.filter(
    (task) => task.projectId === id
  );
  console.log(selectedProjectClosedTasks);
  return (
    <>
      {/* Header */}
      <Flex justify="space-between" className="px-8 py-2 ">
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

          {/* Show  All Tasks of selected project.*/}
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
        {openCard && (
          <AddTaskCard project={project} onSetOpenCard={setOpenCard} />
        )}

        {/* ClosedTask */}
        <div className="w-1/2">
          {selectedProjectClosedTasks.map((task) => (
            <ListCloseTask key={task.id} task={task} />
          ))}
        </div>
        {/* <div className="w-1/2">
          {[1].map((task) => (
            <ListCloseTask
              key={1}
              task={{ content: "sssssssssss", description: "sss" }}
            />
          ))}
        </div> */}
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
