import { List, Space, Typography } from "antd";
import { TaskInterface } from "../../../common/interfaces";
import { TaskViewModal } from "../../modal";
import { useState } from "react";

interface Props {
  data: Array<TaskInterface>;
}

export default function TodoTasks({ data }: Props) {
  const [selectedTask, setSelectedTask] = useState<TaskInterface>();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Typography.Title level={3}>To Do</Typography.Title>
      <List
        bordered
        dataSource={data}
        renderItem={(task: any, index) => {
          return (
            <List.Item key={index}>
              <Space
                onClick={() => {
                  console.log(selectedTask)
                  setOpen(true)
                  setSelectedTask(task);
                }}
              >
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
      />
    </>
  );
}
