import { EditOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { TaskInterface } from "../../common/interfaces";
import { TaskFormModal } from "../modal";
import CompletedTasks from "./completed/completed.component";
import InProgressTasks from "./inProgress/inProgress.component";
import TodoTasks from "./todo/todo.component";

export default function TasksComponent() {
  const [open, setOpen] = useState(false);

  const [tasks, setTasks] = useState<Array<TaskInterface>>([]);
  console.log(tasks);
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
      id: new Date().getTime().toString(),
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
          <TodoTasks data={tasks} setTasks={setTasks} />
        </Col>
        <Col span={8}>
          <InProgressTasks
            data={tasks}
            setTasks={setTasks}
          />
        </Col>
        <Col span={8}>
          <CompletedTasks
            data={tasks}
            setTasks={setTasks}
          />
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
