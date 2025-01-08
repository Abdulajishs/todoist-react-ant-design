import React, { useState } from "react";
import {
  Button,
  Card,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Select,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateExistingTask } from "../../store/tasks-action";

const EditTaskCard = ({ task, onSetTaskCard }) => {
  const [isAddDisabled, setIsAddDisabled] = useState(true);
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
  // console.log(listProjectName);

  const selectedProject = projects.find((p) => p.id === task.projectId);
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
        content: values.content,
        description: values.description || "",
        projectId: projectId,
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
      setIsAddDisabled(true);
    } catch (error) {
      console.error("Validation Failed:", error);
      message.error("Failed to updateTask. Please try again.");
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setIsAddDisabled(!title.trim().length > 0);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsAddDisabled(true);
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
          project_id: task.project_id,
        }}
      >
        <Form.Item name="content" className="mb-0">
          <Input
            size="middle"
            placeholder="Enter task title"
            variant="borderless"
            onChange={handleTitleChange}
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
        <Divider className="my-3" />

        <Flex justify="space-between">
          <Form.Item
            name="projectName"
            // initialValue={{
            //   label: selectedProject.name,
            //   projectId: selectedProject.id,
            //   value: selectedProject.name,
            // }}
            className="mb-0"
          >
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
              className={`${
                isAddDisabled ? "bg-[#EDA59E]" : "bg-[#DC4C3E]"
              } text-white`}
              disabled={isAddDisabled}
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
