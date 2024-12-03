import React, { useState } from 'react';
import styled from 'styled-components';
import { Task } from '../types/task';

interface TaskFormProps {
    task?: Task;
    onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
    onClose: () => void;
}

interface ButtonProps {
    $variant?: 'primary' | 'secondary';
}

const FormOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const FormContainer = styled.div`
    background: ${props => props.theme.cardBackground};
    padding: 2rem;
    border-radius: 12px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    color: ${props => props.theme.textPrimary};
    font-weight: 500;
`;

const Input = styled.input`
    padding: 0.75rem;
    border: 2px solid ${props => props.theme.borderColor};
    border-radius: 6px;
    background: ${props => props.theme.background};
    color: ${props => props.theme.textPrimary};
    font-size: 1rem;
    
    &:focus {
        outline: none;
        border-color: ${props => props.theme.primary};
    }
`;

const TextArea = styled.textarea`
    padding: 0.75rem;
    border: 2px solid ${props => props.theme.borderColor};
    border-radius: 6px;
    background: ${props => props.theme.background};
    color: ${props => props.theme.textPrimary};
    font-size: 1rem;
    min-height: 100px;
    resize: vertical;
    
    &:focus {
        outline: none;
        border-color: ${props => props.theme.primary};
    }
`;

const Select = styled.select`
    padding: 0.75rem;
    border: 2px solid ${props => props.theme.borderColor};
    border-radius: 6px;
    background: ${props => props.theme.background};
    color: ${props => props.theme.textPrimary};
    font-size: 1rem;
    
    &:focus {
        outline: none;
        border-color: ${props => props.theme.primary};
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 1rem;
`;

const Button = styled.button<ButtonProps>`
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    
    background: ${props => props.$variant === 'primary' ? props.theme.primary : 'transparent'};
    color: ${props => props.$variant === 'primary' ? 'white' : props.theme.textPrimary};
    border: ${props => props.$variant === 'primary' ? 'none' : `2px solid ${props.theme.borderColor}`};
    
    &:hover {
        background: ${props => props.$variant === 'primary' ? props.theme.secondary : props.theme.borderColor};
    }
`;

const STATUS_OPTIONS = [
    { value: 'todo', label: 'Zu erledigen' },
    { value: 'progress', label: 'In Bearbeitung' },
    { value: 'done', label: 'Erledigt' }
] as const;

export const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onClose }) => {
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');
    const [status, setStatus] = useState<Task['status']>(task?.status || 'todo');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            title,
            description,
            status
        });
        onClose();
    };

    return (
        <FormOverlay onClick={onClose}>
            <FormContainer onClick={e => e.stopPropagation()}>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label htmlFor="title">Titel</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label htmlFor="description">Beschreibung</Label>
                        <TextArea
                            id="description"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                        />
                    </FormGroup>
                    
                    <FormGroup>
                        <Label htmlFor="status">Status</Label>
                        <Select
                            id="status"
                            value={status}
                            onChange={e => setStatus(e.target.value as Task['status'])}
                        >
                            {STATUS_OPTIONS.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Select>
                    </FormGroup>
                    
                    <ButtonGroup>
                        <Button type="button" onClick={onClose}>
                            Abbrechen
                        </Button>
                        <Button type="submit" $variant="primary">
                            {task ? 'Aktualisieren' : 'Erstellen'}
                        </Button>
                    </ButtonGroup>
                </Form>
            </FormContainer>
        </FormOverlay>
    );
}; 