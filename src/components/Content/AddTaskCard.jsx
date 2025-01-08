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
import { addNewTask } from "../../store/tasks-action";

const AddTaskCard = ({ project, onSetOpenCard }) => {
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

  const [form] = Form.useForm();

  const handleFormSubmit = async (values) => {
    try {
      console.log("Form Values:", values);

      await form.validateFields();

      const projectItem = listProjectName.find(
        (p) => p.value === values.projectName
      );

      const projectId = projectItem ? projectItem.projectId : project.id;

      let taskData = {
        content: values.content,
        description: values.description || "",
        project_id: projectId,
      };

      console.log(projectItem, taskData);
      let newTask = await dispatch(addNewTask(taskData));
      if (newTask.success) {
        console.log("Task added successfully:", newTask);
        message.success(`Task "${values.content}" created successfully.`);
      } else {
        message.error("Failed to createTask. Please try again.");
      }

      form.resetFields();
      setIsAddDisabled(true);
    } catch (error) {
      console.error("Validation Failed:", error);
      message.error("Failed to createTask. Please try again.");
    }
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setIsAddDisabled(!title.trim().length > 0);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsAddDisabled(true);
    onSetOpenCard(false);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Card className="w-1/2">
      <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
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
            //   label: project.name,
            //   projectId: project.id,
            //   value: project.name,
            // }}
            className="mb-0"
          >
            <Select
              defaultValue={project.name}
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
              Add Task
            </Button>
          </div>
        </Flex>
      </Form>
    </Card>
  );
};

export default AddTaskCard;
