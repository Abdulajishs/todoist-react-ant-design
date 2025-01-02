import React, { useContext, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Modal,
  Input,
  Select,
  Switch,
  Form,
  message,
} from "antd";

import todoistColors from "../../utils/TodoistColors";

import runes from "runes2";
import { ProjectsContext } from "../../store/ProjectsContext";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const EditProject = ({ project, onChangeAction }) => {
  // console.log(project.isFavorite);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOkDisabled, setIsOkDisabled] = useState(true);
  const [favorite, setFavorite] = useState(project.isFavorite);
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { updateProject } = useContext(ProjectsContext);

  const showModal = () => {
    setIsModalOpen(true);
    onChangeAction(false);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      const selectedColor = todoistColors.find(
        (color) => color.value === values.color
      );

      const updatedData = {
        name: values.name,
        color: selectedColor ? selectedColor.name : values.color,
        isFavorite: values.favorite,
      };

      let data = await updateProject(project.id, updatedData);

      console.log(data);
      message.success(`Project "${values.name}" updated successfully.`);
      setIsModalOpen(false);
      navigate("/app/projects");
    } catch (error) {
      console.error("Failed to update project:", error);
      message.error("Failed to update project. Please try again.");
    }
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
            workspace: "My Projects",
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

          <Form.Item label="Workspace" className="font-bold" name="workspace">
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
