import { DatePicker, Form, Input, Modal, Radio } from "antd";
import { useState } from "react";

interface Values {
  name: string;
  description: string;
  status: string;
  dueDate: string;
}

interface Props {
  open: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

export default function CreateTaskModal({ open, onCreate, onCancel }: Props) {
  const [form] = Form.useForm();

  const [selectedRadio, setSelectedRadio] = useState("");

  const handleChange = (e: any) => {
    setSelectedRadio(e.target.value);
  };

  return (
    <Modal
      open={open}
      title="Create new task"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
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
      <Form
        form={form}
        layout="vertical"
        name="taskForm"
        initialValues={{ modifier: "public" }}
      >
        <Form.Item
          name="name"
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
        <Form.Item name="description" label="Description" rules={[
            {
              required: true,
              message: "Please enter task description.",
            },
          ]}>
          <Input type="textarea" />
        </Form.Item>
        <Form.Item name="completed" label="Status">
          <Radio.Group onChange={handleChange}>
            <Radio value="todo">To do</Radio>
            <Radio value="inProgress">In progress</Radio>
            <Radio value="complete">Complete</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="dueDate" label="Due date">
          <DatePicker disabled={selectedRadio === "complete"} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
