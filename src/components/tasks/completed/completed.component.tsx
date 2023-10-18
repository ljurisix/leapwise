import { List, Typography } from "antd";

interface Props {
  data: Array<any>
}

export default function CompletedTasks({data} : Props) {
  return (
    <>
      <Typography.Title level={3}>Complete</Typography.Title>
      <List
        bordered
        dataSource={data}
        renderItem={(item: any) => (
          <List.Item>
          <Typography.Text> {item} </Typography.Text>
          </List.Item>
        )}
      />
    </>
  );
}
