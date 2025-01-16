import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Flex,
  message,
  Modal,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import AddTaskCard from "./AddTaskCard";
import ListTasks from "./ListTasks";
import EditProject from "../SideBar/EditProject";
import AddToFavorite from "../SideBar/AddToFavorite";
import DeleteProject from "../SideBar/DeleteProject";
import { EllipsisOutlined, PlusCircleFilled } from "@ant-design/icons";
import ListCloseTask from "./ListCloseTask";
import { useDispatch, useSelector } from "react-redux";
import { updateExistingProject } from "../../store/projects-action";
import { fetchTasks } from "../../store/tasks-action";
import Spinner from "../Spinner";

const SingleProjectContent = () => {
  const [openCard, setOpenCard] = useState(false);
  const [openMoreAction, setOpenMoreAction] = useState(false);
  const [editProjectName, setEditProjectName] = useState("");
  const { projects } = useSelector((state) => state.projects);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { id } = useParams();
  // console.log(typeof id);
  const project = projects.filter((project) => project.id == id)[0];
  // console.log(project, projects, project.id, id);
  const tasks = useSelector((state) => state.tasks.tasks);
  const notCompletedTasks = tasks.filter((task) => task.is_completed == 0);
  const completedTasks = tasks.filter((task) => task.is_completed == 1);

  const navigate = useNavigate();

  useEffect(() => {
    if (project) {
      setEditProjectName(project.name);
      setLoading(true);
      dispatch(fetchTasks(id))
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          message.error("Failed to fetch tasks");
        });
    }
  }, [project, id]);

  useEffect(() => {
    if (editProjectName === project.name) return;
    const timeout = setTimeout(async () => {
      const result = await dispatch(
        updateExistingProject(project.id, {
          ...project,
          name: editProjectName,
          user_id: 1,
        })
      );
      if (result.success) {
        message.success(`Project "${project.name}" created successfully.`);
        console.log("Project updated successfully:", result.data);
      } else {
        console.error("Failed to update the project:", result.error);
        message.error("Failed to update the project. Please try again.");
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [editProjectName]);

  const handleMyProjectClick = () => navigate("/app/projects");
  // const selectedProjectTasks = tasks.filter((task) => task.projectId === id);

  return (
    <>
      {loading ? (
        <Spinner /> //while loading
      ) : project ? (
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

              {/* Show  All Tasks of selected project.*/}
              <div>
                {notCompletedTasks.map((task) => (
                  <ListTasks key={task.id} task={task} />
                ))}
              </div>

              {/* Add Task Card */}
              {!openCard && (
                <Button
                  type="text"
                  block
                  className="flex justify-start items-center text-lg group mb-5"
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
              {completedTasks.map((task) => (
                <ListCloseTask key={task.id} task={task} />
              ))}
            </div>
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
            <EditProject
              projectId={project.id}
              onChangeAction={setOpenMoreAction}
            />
            <Divider style={{ margin: "8px 0" }} />
            <AddToFavorite project={project} />
            <Divider style={{ margin: "8px 0" }} />
            <DeleteProject
              project={project}
              onChangeAction={setOpenMoreAction}
            />
          </Modal>
        </>
      ) : (
        <Spinner /> //fallback
      )}
    </>
  );
};

export default SingleProjectContent;
