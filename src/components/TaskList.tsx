import React, { memo } from 'react';
import styled from 'styled-components';
import { TaskCard } from './TaskCard';
import { Task } from '../types/task';
import { StrictModeDroppable } from './StrictModeDroppable';

interface TaskListProps {
    id: string;
    title: string;
    tasks: Task[];
    onEditTask: (id: string) => void;
    onDeleteTask: (id: string) => void;
}

const Container = styled.div`
    background: ${props => props.theme.listBackground};
    border-radius: 10px;
    padding: 1rem;
    width: 300px;
    min-height: 500px;
    margin: 0 1rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border: 1px solid ${props => props.theme.borderColor};
`;

const Title = styled.h2`
    color: ${props => props.theme.textPrimary};
    font-size: 1.2rem;
    margin: 0 0 1rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid ${props => props.theme.primary};
`;

const TaskContainer = styled.div<{ $isDraggingOver: boolean }>`
    min-height: 100px;
    transition: background-color 0.2s ease;
    background-color: ${props => props.$isDraggingOver ? props.theme.dragBackground : 'transparent'};
    padding: 0.5rem;
    border-radius: 4px;
`;

const InnerList = memo(({ tasks, onEditTask, onDeleteTask }: Omit<TaskListProps, 'id' | 'title'>) => (
    <>
        {tasks.map((task, index) => (
            <TaskCard
                key={task.id}
                id={task.id}
                index={index}
                title={task.title}
                description={task.description}
                onEdit={onEditTask}
                onDelete={onDeleteTask}
            />
        ))}
    </>
));

InnerList.displayName = 'InnerList';

const TaskList = memo(({ id, title, tasks, onEditTask, onDeleteTask }: TaskListProps) => {
    console.log('Rendering TaskList:', { id, tasks: tasks.length });
    
    return (
        <Container>
            <Title>{title}</Title>
            <StrictModeDroppable droppableId={id}>
                {(provided, snapshot) => {
                    console.log('Droppable state:', { id, isDraggingOver: snapshot.isDraggingOver });
                    return (
                        <TaskContainer
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            $isDraggingOver={snapshot.isDraggingOver}
                            data-droppable-id={id}
                        >
                            <InnerList
                                tasks={tasks}
                                onEditTask={onEditTask}
                                onDeleteTask={onDeleteTask}
                            />
                            {provided.placeholder}
                        </TaskContainer>
                    );
                }}
            </StrictModeDroppable>
        </Container>
    );
});

TaskList.displayName = 'TaskList';

export { TaskList }; 