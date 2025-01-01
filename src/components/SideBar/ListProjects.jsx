import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Divider, Modal, Tooltip } from "antd";

import todoistColors from "../../utils/TodoistColors";
import { useState } from "react";
import EditProject from "./EditProject";
import AddToFavorite from "./AddToFavorite";
import DeleteProject from "./DeleteProject";
import { useNavigate } from "react-router-dom";

const ListProjects = ({ project }) => {
  const [openMoreAction, setOpenMoreAction] = useState(false);
  const navigate = useNavigate();

  let color = todoistColors.filter((ele) => ele.name === project.color);

  // let projectUrlSplit = project.url.split("/");
  // let urlId = projectUrlSplit[projectUrlSplit.length - 1];
  // console.log(urlId);

  const handleProjectClick = () => {
    // navigate(`/app/projects/${urlId}`);
    navigate(`/app/projects/${project.id}`, { state: { project } });
  };
  return (
    <>
      <div className="hover:bg-[#FFEFE5] group">
        <Button
          type="text"
          block
          className="flex flex-row justify-between  items-center "
          onClick={handleProjectClick}
        >
          <div>
            <span style={{ color: color[0].value }} className="pr-5">
              #
            </span>
            <span>{project.name}</span>
          </div>

          <Tooltip title="More actions">
            <EllipsisOutlined
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={(e) => {
                e.stopPropagation();
                setOpenMoreAction(true);
              }}
            />
          </Tooltip>
        </Button>

        <Modal
          style={{
            top: "200px",
            left: "-20%",
          }}
          open={openMoreAction}
          onOk={() => setOpenMoreAction(false)}
          onCancel={() => setOpenMoreAction(false)}
          width={250}
          footer={null}
          closable={false}
          mask={null}
        >
          <EditProject project={project} onChangeAction={setOpenMoreAction} />

          <Divider style={{ margin: "8px 0" }} />

          <AddToFavorite project={project} />

          <Divider style={{ margin: "8px 0" }} />

          <DeleteProject project={project} onChangeAction={setOpenMoreAction} />
        </Modal>
      </div>
    </>
  );
};

export default ListProjects;
