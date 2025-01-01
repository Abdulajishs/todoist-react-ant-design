import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { useContext, useState } from "react";

import { TodoistApi } from "@doist/todoist-api-typescript";
import { ProjectsContext } from "../../store/ProjectsContext";
const token = import.meta.env.VITE_TOKEN;

const AddToFavorite = ({ project }) => {
  // console.log(project.isFavorite);
  const [isFavorite, setIsFavorite] = useState(project.isFavorite);
  const { refreshProjects } = useContext(ProjectsContext);

  const handleChangeFavorite = () => {
    const updatedFavoriteStatus = !isFavorite;

    const api = new TodoistApi(token);
    api
      .updateProject(project.id, {
        is_favorite: updatedFavoriteStatus.toString(),
      })
      .then((isSuccess) => {
        console.log("project update successfully", isSuccess);
        setIsFavorite(updatedFavoriteStatus);
        refreshProjects();
        message.success(
          `Project ${
            updatedFavoriteStatus ? "added to" : "removed from"
          } favorites successfully.`
        );
      })
      .catch((error) => {
        console.log(error);
        message.error("Failed to update favorite status. Please try again.");
      });
  };

  return (
    <>
      <Button
        type="text"
        block
        className="flex flex-row justify-start gap-3 items-center"
        onClick={handleChangeFavorite}
      >
        {isFavorite ? <HeartFilled /> : <HeartOutlined />}
        <span>{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
      </Button>
    </>
  );
};

export default AddToFavorite;
