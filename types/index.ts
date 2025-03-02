export type ID = string;

export interface Column {
    id: ID;
    title: string; // the top the column
    tasks: Task[]
}

export interface Task {
    id: ID;
    title: string;
    createdAt: Date;
}