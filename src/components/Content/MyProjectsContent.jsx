import React, { useState, useMemo, useContext } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Divider, Input, Space } from "antd";
import ListProjects from "../SideBar/ListProjects";

import { ProjectsContext } from "../../store/ProjectsContext";
import HeaderMyProject from "../HeaderMyProject";

const MyProjectsContent = () => {
  const [searchProject, setSearchProject] = useState("");
  const { projects } = useContext(ProjectsContext);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) =>
      project.name.toLowerCase().includes(searchProject.toLowerCase())
    );
  }, [projects, searchProject]);

  const handleSearchProject = (e) => {
    setSearchProject(e.target.value);
  };

  return (
    <>
      <HeaderMyProject />

      <div className="flex flex-col justify-center items-center">
        <Space direction="vertical" className="w-[50%]">
          <h1 className="text-xl font-bold">My Projects</h1>
          <Input
            placeholder="Search projects"
            prefix={<SearchOutlined />}
            onChange={handleSearchProject}
            value={searchProject}
          />
          <div className="font-semibold flex gap-2">
            <span>
              {searchProject ? filteredProjects.length : projects.length}
            </span>
            <p>projects</p>
          </div>
          <Divider style={{ margin: "8px 0" }} />
          {filteredProjects.map((project) => (
            <ListProjects key={project.id} project={project} />
          ))}
        </Space>
      </div>
    </>
  );
};

export default MyProjectsContent;
