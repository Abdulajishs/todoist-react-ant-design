import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { useContext, useState } from "react";

import { ProjectsContext } from "../../store/ProjectsContext";

const AddToFavorite = ({ onChangeAction, project }) => {
  // console.log(project.isFavorite);
  const [isFavorite, setIsFavorite] = useState(project.isFavorite);
  const { updateProject } = useContext(ProjectsContext);

  const handleChangeFavorite = async () => {
    const updatedFavoriteStatus = !isFavorite;

    try {
      console.log(project.id);
      let data = await updateProject(project.id, {
        isFavorite: updatedFavoriteStatus.toString(),
      });
      console.log("project update successfully", data);
      setIsFavorite(updatedFavoriteStatus);
      onChangeAction(false);
      message.success(
        `Project ${
          updatedFavoriteStatus ? "added to" : "removed from"
        } favorites successfully.`
      );
    } catch (error) {
      console.error("Failed to update favorite status:", error);
      message.error("Failed to update favorite status. Please try again.");
    }
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
