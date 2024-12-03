export type ColumnId = 'todo' | 'progress' | 'done';

export interface Task {
    id: string;
    title: string;
    description: string;
    status: ColumnId;
    createdAt: string;
    updatedAt: string;
}

export interface Column {
    id: ColumnId;
    title: string;
    taskIds: string[];
}

export interface TaskBoard {
    tasks: Record<string, Task>;
    columns: Record<ColumnId, Column>;
    columnOrder: ColumnId[];
}

export function isValidColumnId(id: string): id is ColumnId {
    return ['todo', 'progress', 'done'].includes(id as ColumnId);
}

export interface DragResult {
    destination?: {
        droppableId: ColumnId;
        index: number;
    };
    source: {
        droppableId: ColumnId;
        index: number;
    };
    draggableId: string;
} 