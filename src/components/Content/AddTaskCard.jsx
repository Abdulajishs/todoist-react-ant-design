import React, { useContext, useState } from "react";
import { Button, Card, Divider, Flex, Form, Input, Select } from "antd";
import { ProjectsContext } from "../../store/ProjectsContext";

const AddTaskCard = ({ project, onSetOpenCard }) => {
  const [isAddDisabled, setIsAddDisabled] = useState(true);
  const { projects } = useContext(ProjectsContext);

  const listProjectName = projects.map((project) => ({
    value: project.name,
    label: (
      <p className="flex flex-row gap-5 m-0">
        {/* {console.log(project.color !== "charcoal" ? project.color : "black")} */}
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
  }));
  // console.log(listProjectName);

  const [form] = Form.useForm();

  const handleFormSubmit = (values) => {
    console.log("Form Values:", values);
    form.resetFields();
    setIsAddDisabled(true);
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
        <Form.Item name="title" className="mb-0">
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
          <Select
            defaultValue={project.name}
            style={{
              width: 200,
            }}
            onChange={handleChange}
            options={listProjectName}
          />
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
