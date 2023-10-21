import { UserInterface } from "..";
import { TaskStatusEnum } from "../..";

export interface TaskInterface {
  id?: number;
  title: string;
  description: string;
  status: TaskStatusEnum;
  dueDate?: string;
  assigned?: UserInterface;
}
