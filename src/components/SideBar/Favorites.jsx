import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { TodoistApi } from "@doist/todoist-api-typescript";
import ListProjects from "./ListProjects";

const token = import.meta.env.VITE_TOKEN;

const Favorites = ({ refreshProjects, onRefresh }) => {
  const [toggle, setToggle] = useState(false);
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const api = new TodoistApi(token);
    api
      .getProjects()
      .then((projects) => {
        let fav = projects.filter((project) => project.isFavorite === true);
        console.log(fav);
        setFavorites(fav);
      })
      .catch((error) => console.log(error));
  }, [refreshProjects]);

  return (
    <div className="mb-5">
      <div className="flex flex-row  justify-between items-center">
        <p className=" text-gray-700 font-bold m-0">Favorites</p>
        <div className=" text-gray-500">
          <Tooltip title="Toggle list of My Favorites">
            {toggle ? (
              <DownOutlined onClick={() => setToggle((prev) => !prev)} />
            ) : (
              <RightOutlined onClick={() => setToggle((prev) => !prev)} />
            )}
          </Tooltip>
        </div>
      </div>

      <div>
        {toggle &&
          favorites.map((project) => (
            <ListProjects
              key={project.id}
              project={project}
              onRefresh={onRefresh}
            />
          ))}
      </div>
    </div>
  );
};

export default Favorites;
