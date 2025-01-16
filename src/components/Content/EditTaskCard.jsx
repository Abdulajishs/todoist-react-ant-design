import React, { useState } from "react";
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Select,
} from "antd";
import dayjs from "dayjs";

import { useDispatch, useSelector } from "react-redux";
import { updateExistingTask } from "../../store/tasks-action";

const EditTaskCard = ({ task, onSetTaskCard }) => {
  const { projects } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const listProjectName = projects.map((project) => ({
    value: project.name,
    label: (
      <p className="flex flex-row gap-5 m-0">
        <span
          style={{
            color: project.color,
          }}
        >
          #
        </span>
        <span>{`${project.name}`}</span>
      </p>
    ),
    projectId: project.id,
  }));
  console.log(task);
  const selectedProject = projects.find((p) => p.id === task.project_id);
  console.log(selectedProject);

  const [form] = Form.useForm();

  const handleFormSubmit = async (values) => {
    try {
      console.log("Form Values:", values);

      await form.validateFields();

      const projectItem = listProjectName.find(
        (p) => p.value === values.projectName
      );

      const projectId = projectItem
        ? projectItem.projectId
        : selectedProject.id;

      let taskData = {
        ...task,
        content: values.content,
        description: values.description || "",
        due_date: values.dueDate,
      };

      console.log(projectItem, taskData);

      let updatedTask = await dispatch(updateExistingTask(task.id, taskData));
      if (updatedTask.success) {
        console.log("Task edited successfully:", updatedTask);
        message.success(`Task "${values.content}" updated successfully.`);
      } else {
        message.error("Failed to updateTask. Please try again.");
      }
      form.resetFields();
      onSetTaskCard(false);
    } catch (error) {
      console.error("Validation Failed:", error);
      message.error("Failed to updateTask. Please try again.");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onSetTaskCard(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Card>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        initialValues={{
          content: task.content,
          description: task.description,
          projectName: selectedProject.name,
          dueDate: task.due_date ? dayjs(task.due_date) : null,
        }}
      >
        <Form.Item name="content" className="mb-0">
          <Input
            size="middle"
            placeholder="Enter task title"
            variant="borderless"
          />
        </Form.Item>
        <Form.Item name="description" className="mb-0">
          <Input.TextArea
            placeholder="Enter task description"
            variant="borderless"
            rows={1}
            autoSize={{ minRows: 1, maxRows: 5 }}
          />
        </Form.Item>
        <Form.Item name="dueDate">
          <DatePicker placeholder="Select due date" />
        </Form.Item>
        <Divider className="my-3" />

        <Flex justify="space-between">
          <Form.Item name="projectName" className="mb-0">
            <Select
              defaultValue={selectedProject.name}
              style={{
                width: 200,
              }}
              onChange={handleChange}
              options={listProjectName}
            />
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button
              type="text"
              onClick={handleCancel}
              className="bg-[#F5F5F5] text-gray-500"
            >
              Cancel
            </Button>
            <Button
              type="danger"
              htmlType="submit"
              className={`bg-[#DC4C3E] text-white`}
            >
              Save
            </Button>
          </div>
        </Flex>
      </Form>
    </Card>
  );
};

export default EditTaskCard;
