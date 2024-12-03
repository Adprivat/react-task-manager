import React, { memo } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

interface TaskCardProps {
    id: string;
    index: number;
    title: string;
    description: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

interface StyledCardProps {
    $isDragging: boolean;
}

const StyledCard = styled.div<StyledCardProps>`
    background: ${props => props.theme.cardBackground};
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 0.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border: 1px solid ${props => props.theme.borderColor};
    opacity: ${props => props.$isDragging ? 0.8 : 1};
    transform: ${props => props.$isDragging ? 'scale(1.02)' : 'scale(1)'};
    cursor: grab;
    
    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        transform: translateY(-2px);
    }
    
    &:active {
        cursor: grabbing;
    }
    
    transition: all 0.3s ease;
`;

const Title = styled.h3`
    margin: 0 0 0.5rem 0;
    color: ${props => props.theme.textPrimary};
    font-size: 1.1rem;
`;

const Description = styled.p`
    margin: 0;
    color: ${props => props.theme.textSecondary};
    font-size: 0.9rem;
`;

const Actions = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    margin-top: 1rem;
`;

const Button = styled.button`
    background: none;
    border: none;
    padding: 0.5rem;
    cursor: pointer;
    color: ${props => props.theme.textSecondary};
    
    &:hover {
        color: ${props => props.theme.primary};
    }
`;

const TaskCard = memo(({ id, index, title, description, onEdit, onDelete }: TaskCardProps) => {
    console.log('Rendering TaskCard:', { id, index });

    return (
        <Draggable draggableId={id} index={index} key={id}>
            {(provided, snapshot) => {
                console.log('Draggable state:', { id, isDragging: snapshot.isDragging });
                return (
                    <StyledCard
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        $isDragging={snapshot.isDragging}
                    >
                        <Title>{title}</Title>
                        <Description>{description}</Description>
                        <Actions>
                            <Button onClick={() => onEdit(id)}>
                                ✏️
                            </Button>
                            <Button onClick={() => onDelete(id)}>
                                🗑️
                            </Button>
                        </Actions>
                    </StyledCard>
                );
            }}
        </Draggable>
    );
});

TaskCard.displayName = 'TaskCard';

export { TaskCard }; 