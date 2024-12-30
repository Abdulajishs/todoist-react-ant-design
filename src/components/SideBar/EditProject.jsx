import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Button, Divider, Modal, Input, Select, Switch, Form } from "antd";

import todoistColors from "../../utils/TodoistColors";

import { TodoistApi } from "@doist/todoist-api-typescript";

const token = import.meta.env.VITE_TOKEN;

const { Option } = Select;

const EditProject = ({ project, onChangeAction, onRefresh }) => {
  // console.log(project);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOkDisabled, setIsOkDisabled] = useState(true);
  const [favorite, setFavorite] = useState(project.isFavorite);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
    onChangeAction(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        const selectedColor = todoistColors.find(
          (color) => color.value === values.color
        );
        const projectData = {
          name: values.name,
          color: selectedColor ? selectedColor.name : values.color,
          is_favorite: values.favorite,
        };
        const api = new TodoistApi(token);
        api
          .updateProject(project.id, projectData)
          .then((project) => {
            console.log("Project updated Successfully:", project);
            setIsModalOpen(false);
            setIsOkDisabled(true);
            onRefresh(Math.random());
            form.resetFields();
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
      <Button
        type="text"
        block
        className="flex flex-row justify-start gap-3  items-center "
        onClick={showModal}
      >
        <EditOutlined /> <span>Edit</span>
      </Button>

      <Modal
        title="Edit"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        okText="Save"
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
            name: project.name,
            color: project.color,
            favorite: project.isFavorite,
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

export default EditProject;
