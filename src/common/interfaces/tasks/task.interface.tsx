import { UserInterface } from "../users/user.interface";

export interface TaskInterface {
  id?: number;
  title: string;
  description: string;
  status: string,
  dueDate?: string;
  assigned?: UserInterface;
}
