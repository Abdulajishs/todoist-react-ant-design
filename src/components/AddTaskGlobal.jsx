// import React, { useContext, useState } from "react";
// import {
//   Button,
//   Card,
//   Divider,
//   Flex,
//   Form,
//   Input,
//   message,
//   Modal,
//   Select,
// } from "antd";
// import { ProjectsContext } from "../store/ProjectsContext";
// import { TasksContext } from "../store/TasksContext";

// const AddTaskGlobal = ({ onSetOpenModal }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [isAddDisabled, setIsAddDisabled] = useState(true);
//   const { projects } = useContext(ProjectsContext);
//   const { addTask } = useContext(TasksContext);

//   const listProjectName = projects.map((project) => ({
//     value: project.name,
//     label: (
//       <p className="flex flex-row gap-5 m-0">
//         <span
//           style={{
//             color: project.color,
//           }}
//         >
//           #
//         </span>
//         <span>{`${project.name}`}</span>
//       </p>
//     ),
//     projectId: project.id,
//   }));
//   // console.log(listProjectName);

//   const [form] = Form.useForm();

//   const handleOk = async (values) => {
//     try {
//       console.log("Form Values:", values);

//       await form.validateFields();

//       const projectItem = listProjectName.find(
//         (p) => p.value === values.projectName
//       );

//       const projectId = projectItem.projectId;

//       let taskData = {
//         content: values.content,
//         description: values.description || "",
//         project_id: projectId,
//       };

//       console.log(projectItem, taskData);

//       let newTask = await addTask(taskData);
//       console.log("Task added successfully:", newTask);
//       message.success(`Task "${values.content}" created successfully.`);
//       form.resetFields();
//       setIsAddDisabled(true);
//     } catch (error) {
//       console.error("Validation Failed:", error);
//       message.error("Failed to createTask. Please try again.");
//     }
//   };

//   const handleTitleChange = (e) => {
//     const title = e.target.value;
//     setIsAddDisabled(!title.trim().length > 0);
//   };

//   const handleCancel = () => {
//     form.resetFields();
//     setIsAddDisabled(true);
//     onSetOpenModal(false);
//   };

//   const handleChange = (value) => {
//     console.log(`selected ${value}`);
//   };
//   return (
//     <Modal
//       open={isModalOpen}
//       onCancel={handleCancel}
//       onOk={handleOk}
//       okText="Add"
//       okButtonProps={{
//         style: {
//           backgroundColor: isAddDisabled ? "#EDA59E" : "#DC4C3E",
//           color: "white",
//         },
//         disabled: isAddDisabled,
//       }}
//       cancelButtonProps={{
//         style: { backgroundColor: "#F5F5F5", color: "gray", border: "none" },
//       }}
//     >
//       <Form form={form} layout="vertical">
//         <Form.Item name="content" className="mb-0">
//           <Input
//             size="middle"
//             placeholder="Enter task title"
//             variant="borderless"
//             onChange={handleTitleChange}
//           />
//         </Form.Item>
//         <Form.Item name="description" className="mb-0">
//           <Input.TextArea
//             placeholder="Enter task description"
//             variant="borderless"
//             rows={1}
//             autoSize={{ minRows: 1, maxRows: 5 }}
//           />
//         </Form.Item>
//         <Divider className="my-3" />

//         <Flex justify="space-between">
//           <Form.Item
//             name="projectName"
//             // initialValue={{
//             //   label: project.name,
//             //   projectId: project.id,
//             //   value: project.name,
//             // }}
//             className="mb-0"
//           >
//             <Select
//               defaultValue={"Inbox"}
//               style={{
//                 width: 200,
//               }}
//               onChange={handleChange}
//               options={listProjectName}
//             />
//           </Form.Item>

//           <div className="flex justify-end gap-2">
//             <Button
//               type="text"
//               onClick={handleCancel}
//               className="bg-[#F5F5F5] text-gray-500"
//             >
//               Cancel
//             </Button>
//             <Button
//               type="danger"
//               htmlType="submit"
//               className={`${
//                 isAddDisabled ? "bg-[#EDA59E]" : "bg-[#DC4C3E]"
//               } text-white`}
//               disabled={isAddDisabled}
//             >
//               Add Task
//             </Button>
//           </div>
//         </Flex>
//       </Form>
//     </Modal>
//   );
// };

// export default AddTaskGlobal;

import React, { useContext, useState } from "react";
import { Button, Divider, Form, Input, message, Modal, Select } from "antd";
import { ProjectsContext } from "../store/ProjectsContext";
import { TasksContext } from "../store/TasksContext";

const AddTaskGlobal = ({ isModalOpen, onSetOpenModal }) => {
  const [isAddDisabled, setIsAddDisabled] = useState(true);
  const { projects } = useContext(ProjectsContext);
  const { addTask } = useContext(TasksContext);

  const listProjectName = projects.map((project) => ({
    value: project.name,
    label: (
      <p className="flex flex-row gap-5 m-0">
        <span style={{ color: project.color }}>#</span>
        <span>{project.name}</span>
      </p>
    ),
    projectId: project.id,
  }));

  const [form] = Form.useForm();

  const handleFormSubmit = async (values) => {
    try {
      const projectItem = listProjectName.find(
        (p) => p.value === values.projectName
      );
      const projectId = projectItem ? projectItem.projectId : null;

      const taskData = {
        content: values.content,
        description: values.description || "",
        project_id: projectId,
      };

      await addTask(taskData);
      message.success(`Task "${values.content}" created successfully.`);
      form.resetFields();
      setIsAddDisabled(true);
      onSetOpenModal(false);
    } catch (error) {
      message.error("Failed to create task. Please try again.");
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setIsAddDisabled(!title.trim().length);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsAddDisabled(true);
    onSetOpenModal(false);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleCancel}
      onOk={() => form.submit()}
      okText="Add"
      okButtonProps={{
        style: {
          backgroundColor: isAddDisabled ? "#EDA59E" : "#DC4C3E",
          color: "white",
        },
        disabled: isAddDisabled,
      }}
      cancelButtonProps={{
        style: { backgroundColor: "#F5F5F5", color: "gray", border: "none" },
      }}
      closable={false}
    >
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
        <Form.Item name="content">
          <Input
            size="middle"
            placeholder="Enter task title"
            onChange={handleTitleChange}
          />
        </Form.Item>
        <Form.Item name="description" className="mb-0">
          <Input.TextArea
            placeholder="Enter task description"
            rows={1}
            autoSize={{ minRows: 1, maxRows: 5 }}
          />
        </Form.Item>
        <Divider className="my-3" />
        <Form.Item name="projectName">
          <Select
            defaultValue="Inbox"
            style={{ width: 200 }}
            options={listProjectName}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTaskGlobal;
