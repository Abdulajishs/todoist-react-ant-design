import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addNewTask } from "../store/tasks-action";

const AddTaskGlobal = ({ isModalOpen, onSetOpenModal }) => {
  const [isAddDisabled, setIsAddDisabled] = useState(true);
  const { projects } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

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
        content: values.content.trim(),
        description: values.description.trim(),
        project_id: projectId,
        due_date: values.dueDate.format("YYYY-MM-DD"),
      };

      let newTask = await dispatch(addNewTask(taskData));
      if (newTask.success) {
        message.success(`Task "${values.content}" created successfully.`);
      } else {
        message.error("Failed to create task. Please try again.");
      }

      form.resetFields();
      setIsAddDisabled(true);
      onSetOpenModal(false);
    } catch (error) {
      message.error("Failed to create task. Please try again.");
    }
  };

  const handleInputChange = () => {
    const values = form.getFieldsValue();
    const isContentFilled = values.content?.trim().length > 0;
    const isDescriptionFilled = values.description?.trim().length > 0;

    setIsAddDisabled(!(isContentFilled && isDescriptionFilled));
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
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item name="description" className="mb-0">
          <Input.TextArea
            placeholder="Enter task description"
            rows={1}
            autoSize={{ minRows: 1, maxRows: 5 }}
            onChange={handleInputChange}
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
        <Form.Item name="dueDate">
          <DatePicker placeholder="Select due date" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddTaskGlobal;
