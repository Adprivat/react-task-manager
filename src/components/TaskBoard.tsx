import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { TaskList } from './TaskList';
import { TaskForm } from './TaskForm';
import { Task, TaskBoard as TaskBoardType, ColumnId } from '../types/task';
import { v4 as uuidv4 } from 'uuid';

const BoardContainer = styled.div`
    padding: 2rem;
    min-height: 100vh;
    background: ${props => props.theme.background};
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`;

const Title = styled.h1`
    color: ${props => props.theme.textPrimary};
    font-size: 2rem;
`;

const AddButton = styled.button`
    padding: 0.75rem 1.5rem;
    background: ${props => props.theme.primary};
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        background: ${props => props.theme.secondary};
        transform: translateY(-2px);
    }
`;

const ListContainer = styled.div`
    display: flex;
    gap: 2rem;
    overflow-x: auto;
    padding-bottom: 2rem;
    
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const INITIAL_COLUMNS = {
    todo: {
        id: 'todo' as const,
        title: 'Zu erledigen',
        taskIds: [] as string[]
    },
    progress: {
        id: 'progress' as const,
        title: 'In Bearbeitung',
        taskIds: [] as string[]
    },
    done: {
        id: 'done' as const,
        title: 'Erledigt',
        taskIds: [] as string[]
    }
};

const INITIAL_COLUMN_ORDER: ColumnId[] = ['todo', 'progress', 'done'];

const initialData: TaskBoardType = {
    tasks: {},
    columns: INITIAL_COLUMNS,
    columnOrder: INITIAL_COLUMN_ORDER
};

export const TaskBoard: React.FC = () => {
    const [board, setBoard] = useState<TaskBoardType>(initialData);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | undefined>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    const onDragEnd = useCallback((result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination || !mounted) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const sourceCol = board.columns[source.droppableId as ColumnId];
        const destCol = board.columns[destination.droppableId as ColumnId];

        if (!sourceCol || !destCol) {
            console.error('Spalten nicht gefunden:', { source: source.droppableId, destination: destination.droppableId });
            return;
        }

        // Gleiche Spalte
        if (source.droppableId === destination.droppableId) {
            const newTaskIds = Array.from(sourceCol.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            setBoard(prev => ({
                ...prev,
                columns: {
                    ...prev.columns,
                    [sourceCol.id]: {
                        ...sourceCol,
                        taskIds: newTaskIds
                    }
                }
            }));
            return;
        }

        // Verschiedene Spalten
        const sourceTaskIds = Array.from(sourceCol.taskIds);
        sourceTaskIds.splice(source.index, 1);
        const destTaskIds = Array.from(destCol.taskIds);
        destTaskIds.splice(destination.index, 0, draggableId);

        const task = board.tasks[draggableId];
        if (!task) return;

        setBoard(prev => ({
            ...prev,
            tasks: {
                ...prev.tasks,
                [draggableId]: {
                    ...task,
                    status: destination.droppableId as ColumnId
                }
            },
            columns: {
                ...prev.columns,
                [sourceCol.id]: {
                    ...sourceCol,
                    taskIds: sourceTaskIds
                },
                [destCol.id]: {
                    ...destCol,
                    taskIds: destTaskIds
                }
            }
        }));
    }, [board, mounted]);

    const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
        const newTask: Task = {
            id: uuidv4(),
            ...taskData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const column = board.columns[taskData.status];
        if (!column) return;

        setBoard({
            ...board,
            tasks: {
                ...board.tasks,
                [newTask.id]: newTask
            },
            columns: {
                ...board.columns,
                [taskData.status]: {
                    ...column,
                    taskIds: [...column.taskIds, newTask.id]
                }
            }
        });

        setIsFormOpen(false);
    };

    const handleEditTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
        if (!editingTask) return;

        setBoard({
            ...board,
            tasks: {
                ...board.tasks,
                [editingTask.id]: {
                    ...editingTask,
                    ...taskData,
                    updatedAt: new Date().toISOString()
                }
            }
        });

        setIsFormOpen(false);
        setEditingTask(undefined);
    };

    const handleDeleteTask = (taskId: string) => {
        const task = board.tasks[taskId];
        if (!task) return;

        const column = board.columns[task.status];
        if (!column) return;

        const newTaskIds = column.taskIds.filter(id => id !== taskId);

        const newTasks = { ...board.tasks };
        delete newTasks[taskId];

        setBoard({
            ...board,
            tasks: newTasks,
            columns: {
                ...board.columns,
                [column.id]: {
                    ...column,
                    taskIds: newTaskIds
                }
            }
        });
    };

    if (!mounted) {
        return <div>Initialisiere Board...</div>;
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <BoardContainer>
                <Header>
                    <Title>Task Board</Title>
                    <AddButton onClick={() => setIsFormOpen(true)}>
                        + Neue Aufgabe
                    </AddButton>
                </Header>

                <ListContainer>
                    {board.columnOrder.map(columnId => {
                        const column = board.columns[columnId];
                        const tasks = column.taskIds
                            .map(taskId => board.tasks[taskId])
                            .filter((task): task is Task => !!task);

                        return (
                            <TaskList
                                key={column.id}
                                id={column.id}
                                title={column.title}
                                tasks={tasks}
                                onEditTask={id => {
                                    setEditingTask(board.tasks[id]);
                                    setIsFormOpen(true);
                                }}
                                onDeleteTask={handleDeleteTask}
                            />
                        );
                    })}
                </ListContainer>

                {isFormOpen && (
                    <TaskForm
                        task={editingTask}
                        onSubmit={editingTask ? handleEditTask : handleCreateTask}
                        onClose={() => {
                            setIsFormOpen(false);
                            setEditingTask(undefined);
                        }}
                    />
                )}
            </BoardContainer>
        </DragDropContext>
    );
}; 