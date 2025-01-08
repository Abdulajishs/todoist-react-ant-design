import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { updateExistingProject } from "../../store/projects-action";

const AddToFavorite = ({ onChangeAction, project }) => {
  // console.log(project.isFavorite);
  const [isFavorite, setIsFavorite] = useState(project.isFavorite);
  const dispatch = useDispatch();

  const handleChangeFavorite = async () => {
    const updatedFavoriteStatus = !isFavorite;
    const result = await dispatch(
      updateExistingProject(project.id, {
        isFavorite: updatedFavoriteStatus.toString(),
      })
    );
    if (result.success) {
      console.log("project update successfully", result.data);
      setIsFavorite(updatedFavoriteStatus);
      onChangeAction(false);
      message.success(
        `Project ${
          updatedFavoriteStatus ? "added to" : "removed from"
        } favorites successfully.`
      );
    } else {
      console.error("Failed to update the project:", result.error);
      message.error("Failed to update the project. Please try again.");
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
