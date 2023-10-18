import { ConfigProvider } from "antd";
import { TasksPage } from "./pages";
import { themeConfig } from "./theme";

function App() {
  return (
    <ConfigProvider theme={themeConfig}>
      <TasksPage />
    </ConfigProvider>
  );
}

export default App;
