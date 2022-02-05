export interface ITask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  date: Date;
}
