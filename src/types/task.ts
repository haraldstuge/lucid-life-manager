
export interface Task {
  id: string;
  title: string;
  description?: string;
  due_date?: Date;
  priority?: number;
  status?: string;
  parent_id?: string;
  created_at: Date;
  updated_at: Date;
  
  // Frontend computed properties
  dueDate?: Date;
  completed?: boolean;
}
