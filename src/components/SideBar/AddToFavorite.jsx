import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { updateExistingProject } from "../../store/projects-action";
import axios from "axios";

const AddToFavorite = ({ onChangeAction, openMoreAction, projectId }) => {
  const [project, setProject] = useState(null);

  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/todolist/projects/${projectId}`
        );
        let fetchedProject = response.data;
        setProject(fetchedProject);
        setIsFavorite(fetchedProject.is_favorite === 1);
        console.log(fetchedProject.is_favorite === 1);
      } catch (error) {
        console.error("Error getting project:", error.message);
      }
    };
    fetchProject();
  }, [projectId, openMoreAction]);

  const handleChangeFavorite = async () => {
    const updatedFavoriteStatus =
      isFavorite === 0 || isFavorite === false ? 1 : 0;
    console.log(updatedFavoriteStatus);

    const result = await dispatch(
      updateExistingProject(project.id, {
        ...project,
        is_favorite: updatedFavoriteStatus,
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
        {isFavorite == 1 ? <HeartFilled /> : <HeartOutlined />}
        <span>
          {isFavorite == 1 ? "Remove from favorites" : "Add to favorites"}
        </span>
      </Button>
    </>
  );
};

export default AddToFavorite;
