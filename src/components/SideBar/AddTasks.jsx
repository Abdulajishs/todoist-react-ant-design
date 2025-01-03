import { PlusCircleFilled } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import AddTaskGlobal from "../AddTaskGlobal";

const AddTasks = () => {
  const [openModal, setOpenModal] = useState(false);
  console.log(openModal);
  return (
    <div className="  mb-5 ">
      <Button
        type="text"
        block
        className=" flex justify-start items-center gap-3 font-bold m-0  text-xl leading-5 text-[#DC4C3E] hover:bg-[#FFEFE5] "
        onClick={() => setOpenModal(true)}
      >
        <PlusCircleFilled />
        <span className="text-center self-center">Add task</span>
      </Button>
      {openModal && (
        <AddTaskGlobal isModalOpen={openModal} onSetOpenModal={setOpenModal} />
      )}
    </div>
  );
};

export default AddTasks;
