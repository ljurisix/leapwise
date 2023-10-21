import { EllipsisOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Descriptions,
  Dropdown,
  MenuProps,
  Modal,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { TaskStatusEnum } from "../../../common";
import { TaskInterface } from "../../../common/interfaces";
import TaskFormModal from "../taskForm/taskFormModal.component";
import { click } from "@testing-library/user-event/dist/click";

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

  const getStatus = (status: TaskStatusEnum) => {
    switch (status) {
      case TaskStatusEnum.TODO:
        return (
          <Tag color="red" bordered={false}>
            To do
          </Tag>
        );
      case TaskStatusEnum.IN_PROGRESS:
        return (
          <Tag color="orange" bordered={false}>
            In progress
          </Tag>
        );
      case TaskStatusEnum.COMPLETE:
        return (
          <Tag color="green" bordered={false}>
            Complete
          </Tag>
        );
      default:
        return <Tag bordered={false}>TASK</Tag>;
    }
  };

  const onEdit = (values: any) => {
    const editTask = {
      id: task?.id,
      ...values,
    };

    let taskStorage = JSON.parse(localStorage.getItem("localTasks") || "[]");
    let item = taskStorage.find((item: any) => item.title === task?.title);
    taskStorage.splice(taskStorage.indexOf(item), 1, editTask);
    setTasks(taskStorage);
    localStorage.setItem("localTasks", JSON.stringify(taskStorage));

    setEditOpen(false);
    onCancel();
  };

  const handleDelete = (task: any) => {
    const deleted = tasks?.filter((t) => t.id !== task.id);
    setTasks(deleted);
    localStorage.setItem("localTasks", JSON.stringify(deleted));
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Typography.Text onClick={() => setEditOpen(true)}>
          Edit
        </Typography.Text>
      ),
    },
    {
      key: "2",
      danger: true,
      label: (
        <Typography.Text
          onClick={() => {
            handleDelete(task);
            onCancel();
          }}
        >
          Delete
        </Typography.Text>
      ),
    },
  ];

  return (
    <>
      <Modal
        open={open}
        onCancel={onCancel}
        title={<Typography.Title level={4}> {task?.title}</Typography.Title>}
        footer={
          <Row justify={"space-between"}>
            <Col>
              <Dropdown trigger={["click"]} menu={{ items }}>
                <Button size="small" type="link" icon={<EllipsisOutlined />}>
                  Actions
                </Button>
              </Dropdown>
            </Col>

            <Col>
              <Button type="primary" onClick={onCancel}>
                Close
              </Button>
            </Col>
          </Row>
        }
      >
        <Descriptions column={1}>
          <Descriptions.Item label="Description">
            {task?.description}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {getStatus(task?.status as TaskStatusEnum)}
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
