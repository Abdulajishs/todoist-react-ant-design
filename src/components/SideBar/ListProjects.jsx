import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Divider, Modal, Tooltip } from "antd";

import todoistColors from "../../utils/TodoistColors";
import { useState } from "react";
import EditProject from "./EditProject";
import AddToFavorite from "./AddToFavorite";
import DeleteProject from "./DeleteProject";

const ListProjects = ({ project }) => {
  const [openMoreAction, setOpenMoreAction] = useState(false);

  let color = todoistColors.filter((ele) => ele.name === project.color);
  return (
    <>
      <div className="hover:bg-[#FFEFE5] group">
        <Button
          type="text"
          block
          className="flex flex-row justify-between  items-center "
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
              onClick={() => setOpenMoreAction(true)}
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
        >
          <EditProject project={project} />
          {/* <Button
            type="text"
            block
            className="flex flex-row justify-start gap-3  items-center "
            // onClick={}
          >
            <EditOutlined /> <span>Edit</span>
          </Button> */}
          <Divider style={{ margin: "8px 0" }} />

          <AddToFavorite project={project} />

          {/* {isFavorite ? (
            <Button
              type="text"
              block
              className="flex flex-row justify-start gap-3  items-center "
            >
              <HeartFilled /> <span>Remove from favorites</span>
            </Button>
          ) : (
            <Button
              type="text"
              block
              className="flex flex-row justify-start gap-3  items-center "
            >
              <HeartOutlined /> <span>Add to favorites</span>
            </Button>
          )} */}

          <Divider style={{ margin: "8px 0" }} />
          <DeleteProject project={project} onChangeAction={setOpenMoreAction} />
        </Modal>
      </div>
    </>
  );
};

export default ListProjects;
