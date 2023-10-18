import { Layout } from "antd";
import { TasksComponent } from "../../components";

const { Content } = Layout;

export default function TasksPage() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '50px' }}>
        <TasksComponent />
      </Content>
    </Layout>
  );
}
