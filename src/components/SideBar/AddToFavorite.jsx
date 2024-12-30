import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";

import { TodoistApi } from "@doist/todoist-api-typescript";
const token = import.meta.env.VITE_TOKEN;

const AddToFavorite = ({ project }) => {
  console.log(project.isFavorite);
  const [isFavorite, setIsFavorite] = useState(project.isFavorite);

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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isFavorite ? (
        <Button
          type="text"
          block
          className="flex flex-row justify-start gap-3  items-center "
          onClick={handleChangeFavorite}
        >
          <HeartFilled /> <span>Remove from favorites</span>
        </Button>
      ) : (
        <Button
          type="text"
          block
          className="flex flex-row justify-start gap-3  items-center "
          onClick={handleChangeFavorite}
        >
          <HeartOutlined /> <span>Add to favorites</span>
        </Button>
      )}
    </>
  );
};

export default AddToFavorite;
