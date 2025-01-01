import React, { useContext, useState } from "react";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import ListProjects from "./ListProjects";
import { ProjectsContext } from "../../store/ProjectsContext";

const Favorites = () => {
  const { projects } = useContext(ProjectsContext);
  const [toggle, setToggle] = useState(false);

  const favorites = projects.filter((project) => project.isFavorite);

  return (
    <div>
      <div className="flex flex-row justify-between items-center py-4 px-4">
        <p className="text-gray-700 font-bold m-0">Favorites</p>
        <div className="text-gray-500">
          <Tooltip title="Toggle list of My Favorites">
            {toggle ? (
              <DownOutlined onClick={() => setToggle((prev) => !prev)} />
            ) : (
              <RightOutlined onClick={() => setToggle((prev) => !prev)} />
            )}
          </Tooltip>
        </div>
      </div>

      {toggle &&
        favorites.map((project) => (
          <ListProjects key={project.id} project={project} />
        ))}
    </div>
  );
};

export default Favorites;
