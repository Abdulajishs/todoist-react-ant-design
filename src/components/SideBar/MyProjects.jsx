import React, { useContext, useState } from "react";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import ListProjects from "./ListProjects";
import AddProject from "./AddProject";
import { ProjectsContext } from "../../store/ProjectsContext";

import { useNavigate } from "react-router-dom";

const MyProjects = () => {
  const { projects } = useContext(ProjectsContext);
  const [toggleProject, setToggleProject] = useState(false);
  console.log(projects);
  const navigate = useNavigate();

  const handleMyProjectClick = () => {
    navigate("/app/projects");
  };

  return (
    <div className="mb-5">
      <Button
        type="text"
        block
        className="hover:bg-[#FFEFE5] flex flex-row justify-between items-center"
        onClick={handleMyProjectClick}
      >
        <p className="text-center font-bold m-0">My Projects</p>
        <div className="flex justify-between gap-5 text-gray-500 ">
          <div onClick={(e) => e.stopPropagation()}>
            <AddProject />
          </div>
          <Tooltip title="Toggle list of My Projects">
            {toggleProject ? (
              <DownOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  setToggleProject((prev) => !prev);
                }}
              />
            ) : (
              <RightOutlined
                onClick={(e) => {
                  e.stopPropagation();
                  setToggleProject((prev) => !prev);
                }}
              />
            )}
          </Tooltip>
        </div>
      </Button>

      {toggleProject &&
        projects.map((project) => (
          <ListProjects key={project.id} project={project} />
        ))}
    </div>
  );
};

export default MyProjects;
