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

  const [form] = Form.useForm();

  const validateFields = () => {
    const values = form.getFieldsValue();
    const allFieldsFilled =
      values.content?.trim() && values.description?.trim() && values.dueDate;
    setIsAddDisabled(!allFieldsFilled);
  };

  const handleFormSubmit = async (values) => {
    try {
      const projectItem = listProjectName.find(
        (p) => p.value === values.projectName
      );

      const projectId = projectItem ? projectItem.projectId : project.id;

      const taskData = {
        content: values.content.trim(),
        description: values.description.trim(),
        project_id: projectId,
        due_date: values.dueDate.format("YYYY-MM-DD"),
        is_completed: false,
      };

      const newTask = await dispatch(addNewTask(taskData));
      if (newTask.success) {
        message.success(`Task "${values.content}" created successfully.`);
      } else {
        message.error("Failed to create task. Please try again.");
      }

      form.resetFields();
      setIsAddDisabled(true);
      onSetOpenCard(false);
    } catch (error) {
      message.error("Failed to create task. Please try again.");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setIsAddDisabled(true);
    onSetOpenCard(false);
  };

  return (
    <Card className="w-1/2">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit}
        onValuesChange={validateFields}
      >
        <Form.Item name="content" className="mb-0">
          <Input
            size="middle"
            placeholder="Enter task title"
            onChange={validateFields}
          />
        </Form.Item>
        <Form.Item name="description" className="mb-0">
          <Input.TextArea
            placeholder="Enter task description"
            rows={1}
            autoSize={{ minRows: 1, maxRows: 5 }}
            onChange={validateFields}
          />
        </Form.Item>
        <Form.Item name="dueDate">
          <DatePicker placeholder="Select due date" onChange={validateFields} />
        </Form.Item>
        <Divider className="my-3" />

        <Flex justify="space-between">
          <Form.Item
            name="projectName"
            initialValue={project.name}
            className="mb-0"
          >
            <Select
              defaultValue={project.name}
              style={{
                width: 200,
              }}
              onChange={validateFields}
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
