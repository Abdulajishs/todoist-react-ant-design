import React, { useEffect, useState } from "react";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { TodoistApi } from "@doist/todoist-api-typescript";
import ListProjects from "./ListProjects";
import AddProject from "./AddProject";

const token = import.meta.env.VITE_TOKEN;

const MyProjects = () => {
  const [toggleProject, setToggleProject] = useState(false);
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    const api = new TodoistApi(token);
    api
      .getProjects()
      .then((projects) => {
        console.log(projects);
        setAllProjects(projects);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <div className="flex flex-row  justify-between items-center">
        <p className="text-center font-bold m-0">My Projects</p>
        <div className="flex justify-between gap-5 text-gray-500">
          <AddProject />
          <Tooltip title="Toggle list of My Projects">
            {toggleProject ? (
              <DownOutlined onClick={() => setToggleProject((prev) => !prev)} />
            ) : (
              <RightOutlined
                onClick={() => setToggleProject((prev) => !prev)}
              />
            )}
          </Tooltip>
        </div>
      </div>

      <div>
        {toggleProject &&
          allProjects.map((project) => (
            <ListProjects key={project.id} project={project} />
          ))}
      </div>
    </>
  );
};

export default MyProjects;
