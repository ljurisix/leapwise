import { List, Space, Typography } from "antd";
import { TaskInterface } from "../../../common/interfaces";
import { TaskViewModal } from "../../modal";
import { useState } from "react";
import { TaskStatusEnum } from "../../../common";

interface Props {
  data: Array<TaskInterface>;
  type: string;
  setTasks: (task: any) => void;
}

export default function TaskList({ data, type, setTasks }: Props) {
  const [selectedTask, setSelectedTask] = useState<TaskInterface>();
  const [open, setOpen] = useState(false);

  const getAttributes = () => {
    switch (type) {
      case "todo":
        return {
          title: TaskStatusEnum.TODO,
          data: data?.filter((task) => task?.status === TaskStatusEnum.TODO),
        };
      case "inProgress":
        return {
          title: "In progress",
          data: data?.filter(
            (task) => task?.status === TaskStatusEnum.IN_PROGRESS
          ),
        };
      case "complete":
        return {
          title: "Complete",
          data: data?.filter(
            (task) => task?.status === TaskStatusEnum.COMPLETE
          ),
        };
      default:
        return {
          title: "Complete",
          data: data?.filter(
            (task) => task?.status === TaskStatusEnum.COMPLETE
          ),
        };
    }
  };

  return (
    <>
      <Typography.Title level={3}>{getAttributes().title}</Typography.Title>
      <List
        bordered
        dataSource={getAttributes().data}
        style={{ backgroundColor: "#373737", borderRadius: "8px" }}
        renderItem={(task: any, index) => {
          return (
            <List.Item
              key={index}
              onClick={() => {
                setSelectedTask(task);
                console.log(selectedTask);
                setOpen(true);
              }}
            >
              <Space>
                <Typography.Text>{task.title}</Typography.Text>
              </Space>
            </List.Item>
          );
        }}
      />

      <TaskViewModal
        open={open}
        onCancel={() => {
          setOpen(false);
        }}
        task={selectedTask as TaskInterface}
        tasks={data}
        setTasks={setTasks}
      />
    </>
  );
}
