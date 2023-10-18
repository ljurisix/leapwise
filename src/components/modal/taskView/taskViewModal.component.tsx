import { Button, Modal, Typography } from "antd";
import { TaskInterface } from "../../../common/interfaces";

interface Props {
  open: boolean;
  onCancel: () => void;
  task?: TaskInterface;
}

export default function TaskViewModal({ open, onCancel, task }: Props) {
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      title={task?.title}
      footer={[
        <Button key="edit" onClick={onCancel}>
          Edit
        </Button>,
        <Button key="delete" danger onClick={onCancel}>
          Delete
        </Button>,
      ]}
    >
      <Typography.Text>{task?.description}</Typography.Text>
      <Typography.Text>{task?.status}</Typography.Text>
    </Modal>
  );
}
