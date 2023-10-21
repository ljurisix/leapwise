import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { TaskInterface } from "../../common/interfaces";
import { TaskList } from "../list";
import { TaskFormModal } from "../modal";

export default function TasksComponent() {
  const [open, setOpen] = useState(false);

  const [tasks, setTasks] = useState<Array<TaskInterface>>([]);

  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(
        localStorage.getItem("localTasks") as string
      );
      setTasks(storedList);
    }
  }, []);

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    console.log(tasks);
    const newTask = {
      id: Math.random(),
      ...values,
    };

    setTasks([...tasks, newTask]);
    localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
    setOpen(false);
  };

  return (
    <>
      <Row gutter={20} style={{ padding: "0 0 1em 0" }}>
        <Col span={8}>
          {/* to do tasks */}
          <TaskList data={tasks} type="todo" setTasks={setTasks} />
        </Col>
        <Col span={8}>
          {/* in progress tasks */}
          <TaskList data={tasks} type="inProgress" setTasks={setTasks} />
        </Col>
        <Col span={8}>
          {/* completed tasks */}
          <TaskList data={tasks} type="complete" setTasks={setTasks} />
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
      <TaskFormModal
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
