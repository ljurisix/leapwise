import { Button, Descriptions, Modal, Tag, Typography } from "antd";
import { TaskInterface } from "../../../common/interfaces";
import dayjs from "dayjs";
import TaskFormModal from "../taskForm/taskFormModal.component";
import { useState } from "react";

interface Props {
  open: boolean;
  onCancel: () => void;
  task?: TaskInterface;
  tasks: Array<TaskInterface>;
  setTasks: (task: any) => void;
}

export default function TaskViewModal({
  open,
  onCancel,
  task,
  tasks,
  setTasks,
}: Props) {
  const [editOpen, setEditOpen] = useState(false);

  const getStatus = (status: string) => {
    switch (status) {
      case "todo":
        return (
          <Tag color="red" bordered={false}>
            To do
          </Tag>
        );
      case "inProgress":
        return (
          <Tag color="orange" bordered={false}>
            In progress
          </Tag>
        );
      case "complete":
        return (
          <Tag color="green" bordered={false}>
            Complete
          </Tag>
        );
    }
  };

  const onEdit = (values: any) => {
    let taskStorage = JSON.parse(localStorage.getItem("localTasks") || "[]");
    let item = taskStorage.find((item: any) => item.title === task?.title);
    item = values;
    // localStorage.setItem("localTasks", JSON.stringify(taskStorage));
  };

  const handleDelete = (task: any) => {
    const deleted = tasks?.filter((t) => t.id !== task.id);
    setTasks(deleted);
    localStorage.setItem("localTasks", JSON.stringify(deleted));
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={onCancel}
        title={<Typography.Title level={5}> {task?.title}</Typography.Title>}
        footer={[
          <Button key="edit" onClick={() => setEditOpen(true)}>
            Edit
          </Button>,
          <Button
            key="delete"
            danger
            onClick={() => {
              handleDelete(task);
              onCancel();
            }}
          >
            Delete
          </Button>,
        ]}
      >
        <Descriptions>
          <Descriptions.Item label="Description">
            {task?.description}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {getStatus(task?.status as string)}
          </Descriptions.Item>
          <Descriptions.Item label="Due date">
            {dayjs(task?.dueDate?.toString()).format("DD.MM.YYYY.")}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
      <TaskFormModal
        open={editOpen}
        onEdit={onEdit}
        onCancel={() => {
          setEditOpen(false);
        }}
      />
    </>
  );
}
