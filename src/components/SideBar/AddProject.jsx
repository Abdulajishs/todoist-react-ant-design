import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Modal,
  Tooltip,
  Input,
  Select,
  Switch,
  Form,
} from "antd";

import todoistColors from "../../utils/TodoistColors";

import { TodoistApi } from "@doist/todoist-api-typescript";

const token = import.meta.env.VITE_TOKEN;

const { Option } = Select;

const AddProject = ({ onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOkDisabled, setIsOkDisabled] = useState(true);
  const [favorite, setFavorite] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const selectedColor = todoistColors.find(
          (color) => color.value === values.color
        );
        const projectData = {
          name: values.name,
          color: selectedColor.name,
          is_favorite: values.favorite,
        };
        const api = new TodoistApi(token);
        api
          .addProject(projectData)
          .then((project) => {
            console.log("Project Created Successfully:", project);
            setIsModalOpen(false);
            setIsOkDisabled(true);
            form.resetFields();
            setFavorite(false);
            onRefresh(Math.random());
          })
          .catch((error) => console.error("Failed to create project:", error));

        console.log("Form Values:", projectData);
      })
      .catch((info) => {
        console.error("Validation Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsOkDisabled(true);
    form.resetFields();
    setFavorite(false);
  };

  const handleFieldsChange = (changedFields, allFields) => {
    console.log(allFields);
    const hasProjectName = allFields.some(
      (field) => field.name[0] === "name" && field.value
    );
    setIsOkDisabled(!hasProjectName);
  };

  const handleFavoriteToggle = (checked) => {
    setFavorite(checked);
    form.setFieldsValue({ favorite: checked });
  };

  return (
    <>
      <Button type="text" onClick={showModal}>
        <Tooltip title="My Projects menu">
          <PlusOutlined />
        </Tooltip>
      </Button>
      <Modal
        title="Add Project"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        okText="Add"
        okButtonProps={{
          style: {
            backgroundColor: isOkDisabled ? "#EDA59E" : "#DC4C3E",
            color: "white",
          },
          disabled: isOkDisabled,
        }}
        cancelButtonProps={{
          style: { backgroundColor: "#F5F5F5", color: "gray", border: "none" },
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFieldsChange={handleFieldsChange}
          initialValues={{
            favorite: false,
            color: "#808080",
          }}
        >
          <Form.Item label="Name" name="name" className="font-bold">
            <Input />
          </Form.Item>

          <Form.Item label="Color" className="font-bold" name="color">
            <Select placeholder="Select a color">
              {todoistColors.map((color) => (
                <Option key={color.value} value={color.value}>
                  <span
                    style={{
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      backgroundColor: color.value,
                      marginRight: "8px",
                      borderRadius: "50%",
                    }}
                  ></span>
                  {color.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Workspace"
            className="font-bold"
            name="workspace"
            initialValue="My Projects"
          >
            <Select>
              <Option value="My Projects">My Projects</Option>
            </Select>
          </Form.Item>

          <Form.Item name="favorite" valuePropName="checked">
            <label>
              <Switch
                size="small"
                checked={favorite}
                onChange={handleFavoriteToggle}
              />
              Add to Favorites
            </label>
          </Form.Item>
        </Form>
        <Divider />
      </Modal>
    </>
  );
};

export default AddProject;
