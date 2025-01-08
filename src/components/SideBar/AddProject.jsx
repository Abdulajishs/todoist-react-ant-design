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
  message,
} from "antd";

import todoistColors from "../../utils/TodoistColors";

import runes from "runes2";
import { useDispatch } from "react-redux";
import { addNewProject } from "../../store/projects-action";

const { Option } = Select;

const AddProject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOkDisabled, setIsOkDisabled] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const selectedColor = todoistColors.find(
        (color) => color.value === values.color
      );
      const projectData = {
        name: values.name,
        color: selectedColor?.name || "",
        is_favorite: values.favorite,
      };

      const result = await dispatch(addNewProject(projectData));
      if (result.success) {
        message.success(`Project "${values.name}" created successfully.`);
        console.log("Project created successfully:", result.data);
      } else {
        console.error("Failed to update the project:", result.error);
        message.error("Failed to update the project. Please try again.");
      }

      // Reset
      setIsModalOpen(false);
      form.resetFields();
      setFavorite(false);
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsOkDisabled(true);
    form.resetFields();
    setFavorite(false);
  };

  const handleFieldsChange = (changedFields, allFields) => {
    // console.log(allFields);
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
            <Input
              count={{
                show: true,
                max: 120,
                strategy: (txt) => runes(txt).length,
                exceedFormatter: (txt, { max }) =>
                  runes(txt).slice(0, max).join(""),
              }}
            />
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
