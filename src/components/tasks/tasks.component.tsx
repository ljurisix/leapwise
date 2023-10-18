import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { useState } from "react";
import { CreateTaskModal } from "../modal";
import CompletedTasks from "./completed/completed.component";
import InProgressTasks from "./inProgress/inProgress.component";
import TodoTasks from "./todo/todo.component";

const todoList = [
  { id: 1, title: "task 1", description: "desc", status: "todo" },
  { id: 2, title: "task 2", description: "desc", status: "todo" },
];

export default function TasksComponent() {
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };

  return (
    <>
      <Row gutter={20} style={{ padding: "0 0 1em 0" }}>
        <Col span={8}>
          <TodoTasks data={todoList} />
        </Col>
        <Col span={8}>
          <InProgressTasks data={[]} />
        </Col>
        <Col span={8}>
          <CompletedTasks data={[]} />
        </Col>
      </Row>
      <Button
        size="large"
        type="primary"
        icon={<EditOutlined />}
        style={{
          position: "absolute",
          right: "50px",
          bottom: "50px",
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        New task
      </Button>
      <CreateTaskModal
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
