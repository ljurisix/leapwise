import { DatePicker, Form, Input, Modal, Radio } from "antd";
import { useState } from "react";
import { TaskInterface } from "../../../common/interfaces";
import dayjs from "dayjs";
import { TaskStatusEnum } from "../../../common";

/**
 * Modal with form to create and edit tasks.
 * Title, description && status are mandatory.
 * If COMPLETE status is selected, duedate selection is disabled.
 */
interface Values {
  name: string;
  description: string;
  status: string;
  dueDate: string;
}

interface Props {
  open: boolean;
  onCreate?: (values: Values) => void;
  onEdit?: (values: Values) => void;
  onCancel: () => void;
  task?: TaskInterface;
}

export default function TaskFormModal({
  open,
  onCreate,
  onEdit,
  onCancel,
  task,
}: Props) {
  const [form] = Form.useForm();

  const [selectedRadio, setSelectedRadio] = useState("");

  const handleChange = (e: any) => {
    setSelectedRadio(e.target.value);
  };

  const initialValues = {
    ...task,
    dueDate: dayjs(task?.dueDate),
  };

  // check for task existence; open edit or create modal
  return onCreate ? (
    <Modal
      open={open}
      title="Create new task"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        if (onCreate)
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
      }}
    >
      <Form form={form} layout="vertical" name="taskCreateForm">
        <Form.Item
          name="title"
          label="Name"
          rules={[
            {
              required: true,
              message: "Please enter task name.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please enter task description.",
            },
          ]}
        >
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: true,
              message: "Please pick a task status.",
            },
          ]}
        >
          <Radio.Group onChange={handleChange}>
            <Radio value={TaskStatusEnum.TODO}>To do</Radio>
            <Radio value={TaskStatusEnum.IN_PROGRESS}>In progress</Radio>
            <Radio value={TaskStatusEnum.COMPLETE}>Complete</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="dueDate" label="Due date">
          <DatePicker disabled={selectedRadio === "complete"} />
        </Form.Item>
      </Form>
    </Modal>
  ) : (
    <Modal
      open={open}
      title="Edit task"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        if (onEdit)
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onEdit(values);
            })
            .catch((info) => {
              console.log("Validaion failed:", info);
            });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="taskEditForm"
        initialValues={initialValues}
      >
        <Form.Item
          name="title"
          label="Task name"
          rules={[
            {
              required: true,
              message: "Please enter task name.",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: "Please enter task description.",
            },
          ]}
        >
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[
            {
              required: true,
              message: "Please pick a task status.",
            },
          ]}
        >
          <Radio.Group onChange={handleChange}>
            <Radio value={TaskStatusEnum.TODO}>To do</Radio>
            <Radio value={TaskStatusEnum.IN_PROGRESS}>In progress</Radio>
            <Radio value={TaskStatusEnum.COMPLETE}>Complete</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="dueDate" label="Due date">
          <DatePicker disabled={selectedRadio === "complete"} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
