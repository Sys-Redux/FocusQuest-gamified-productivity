import { useState, useEffect, type FormEvent } from 'react';
import { useTasks } from '../hooks/useTasks';
import { type Task } from '../types/task';

interface TaskModalProps {
    task: Task | null;  // null when modal is closed
    isOpen: boolean;
    onClose: () => void;
}

export const TaskModal = ({ task, isOpen, onClose }: TaskModalProps) => {
    const { updateTask, deleteTask } = useTasks();

    // Edit mode state
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // Single form state object
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'medium' as 'low' | 'medium' | 'high',
        difficulty: 'medium' as 'easy' | 'medium' | 'hard',
        dueDate: ''
    });

    // Initialize form when task changes
    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title,
                description: task.description,
                priority: task.priority,
                difficulty: task.difficulty,
                dueDate: task.due_date ? new Date(task.due_date).toISOString().split('T')[0] : ''
            });
        }
    }, [task]);

    if (!isOpen || !task) return null;

    // Single handleChange function for all inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveEdit = (e: FormEvent) => {
        e.preventDefault();

        updateTask(task.id, {
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            difficulty: formData.difficulty,
            due_date: formData.dueDate || null,
        });

        setIsEditing(false);
    };

    const handleDelete = () => {
        deleteTask(task.id);
        onClose();
    };

    const handleClose = () => {
        setIsEditing(false);
        setShowDeleteConfirm(false);
        onClose();
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high':
                return 'bg-ctp-red/20 text-ctp-red border-ctp-red/30';
            case 'medium':
                return 'bg-ctp-yellow/20 text-ctp-yellow border-ctp-yellow/30';
            case 'low':
                return 'bg-ctp-green/20 text-ctp-green border-ctp-green/30';
            default:
                return 'bg-ctp-surface1 text-ctp-subtext0';
        }
    };

    return (
        <div
            className='fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm'
            onClick={handleClose}
        >
            <div
                className='glass-strong rounded-t-2xl sm:rounded-xl w-full sm:max-w-2xl
                    shadow-2xl max-h-[90vh] overflow-y-auto'
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className='flex justify-between items-center p-4 sm:p-6 border-b border-ctp-surface1
                    sticky top-0 bg-ctp-surface0/95 backdrop-blur-xl z-10'>
                    <h2 className='text-xl sm:text-2xl font-bold text-ctp-mauve'>
                        {isEditing ? 'Edit Quest' : 'Quest Details'}
                    </h2>
                    <button
                        onClick={handleClose}
                        className='text-ctp-subtext0 hover:text-ctp-text transition-colors p-2'
                        aria-label='Close Modal'
                    >
                        <svg className='w-5 h-5 sm:w-6 sm:h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                        </svg>
                    </button>
                </div>

                {/* Modal Content */}
                {isEditing ? (
                    // EDIT MODE
                    <form onSubmit={handleSaveEdit} className='p-4 sm:p-6 space-y-4'>
                        {/* Title */}
                        <div>
                            <label htmlFor='title' className='block text-sm font-medium text-ctp-text mb-2'>
                                Quest Name *
                            </label>
                            <input
                                type='text'
                                id='title'
                                name='title'
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className='w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-ctp-mantle/60 backdrop-blur-md border
                                    border-ctp-surface2/50 rounded-lg text-ctp-text text-sm sm:text-base
                                    focus:outline-none focus:ring-2 focus:ring-ctp-mauve transition-all'
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor='description' className='block text-sm font-medium text-ctp-text mb-2'>
                                Description *
                            </label>
                            <textarea
                                id='description'
                                name='description'
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                className='w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-ctp-mantle/60 backdrop-blur-md border
                                    border-ctp-surface2/50 rounded-lg text-ctp-text text-sm sm:text-base
                                    focus:outline-none focus:ring-2 focus:ring-ctp-mauve resize-none transition-all'
                            />
                        </div>

                        {/* Priority */}
                        <div>
                            <label htmlFor='priority' className='block text-sm font-medium text-ctp-text mb-2'>
                                Priority Level *
                            </label>
                            <select
                                id='priority'
                                name='priority'
                                value={formData.priority}
                                onChange={handleChange}
                                required
                                className='w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-ctp-mantle/60 backdrop-blur-md border
                                    border-ctp-surface2/50 rounded-lg text-ctp-text text-sm sm:text-base
                                    focus:outline-none focus:ring-2 focus:ring-ctp-mauve transition-all'
                            >
                                <option value='low'>Low</option>
                                <option value='medium'>Medium</option>
                                <option value='high'>High</option>
                            </select>
                        </div>

                        {/* Difficulty */}
                        <div>
                            <label htmlFor='difficulty' className='block text-sm font-medium text-ctp-text mb-2'>
                                Difficulty Level *
                            </label>
                            <select
                                id='difficulty'
                                name='difficulty'
                                value={formData.difficulty}
                                onChange={handleChange}
                                required
                                className='w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-ctp-mantle/60 backdrop-blur-md border
                                    border-ctp-surface2/50 rounded-lg text-ctp-text text-sm sm:text-base
                                    focus:outline-none focus:ring-2 focus:ring-ctp-mauve transition-all'
                            >
                                <option value='easy'>Easy (50 XP)</option>
                                <option value='medium'>Medium (100 XP)</option>
                                <option value='hard'>Hard (200 XP)</option>
                            </select>
                        </div>

                        {/* Due Date */}
                        <div>
                            <label htmlFor='dueDate' className='block text-sm font-medium text-ctp-text mb-2'>
                                Due Date (Optional)
                            </label>
                            <input
                                type='date'
                                id='dueDate'
                                name='dueDate'
                                value={formData.dueDate}
                                onChange={handleChange}
                                className='w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-ctp-mantle/60 backdrop-blur-md border
                                    border-ctp-surface2/50 rounded-lg text-ctp-text text-sm sm:text-base
                                    focus:outline-none focus:ring-2 focus:ring-ctp-mauve transition-all'
                            />
                        </div>

                        {/* Actions */}
                        <div className='flex flex-col-reverse sm:flex-row gap-3 pt-4'>
                            <button
                                type='button'
                                onClick={() => setIsEditing(false)}
                                className='w-full sm:flex-1 px-4 py-2.5 bg-ctp-surface1/60 backdrop-blur-md text-ctp-text
                                    rounded-lg font-medium hover:bg-ctp-surface2/60 transition-colors'
                            >
                                Cancel
                            </button>
                            <button
                                type='submit'
                                className='w-full sm:flex-1 px-4 py-2.5 bg-ctp-blue text-ctp-base rounded-lg font-medium
                                    hover:bg-ctp-sapphire transition-colors shadow-lg'
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                ) : (
                    // VIEW MODE
                    <div className='p-4 sm:p-6 space-y-6'>
                        {/* Completion Status */}
                        <div className='flex items-center gap-3 p-4 rounded-lg bg-ctp-surface0/50'>
                            <input
                                type='checkbox'
                                checked={task.completed}
                                onChange={() => updateTask(task.id, { completed: !task.completed })}
                                className='h-5 w-5 rounded border-ctp-surface2 bg-ctp-surface0 text-ctp-mauve cursor-pointer'
                            />
                            <span className='text-sm font-medium text-ctp-text'>
                                {task.completed ? 'Quest Completed ✅' : 'Quest In Progress'}
                            </span>
                        </div>

                        {/* Title */}
                        <div>
                            <h3 className='text-sm font-medium text-ctp-subtext0 mb-2'>Quest Name</h3>
                            <p className='text-lg sm:text-xl font-semibold text-ctp-text'>{task.title}</p>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className='text-sm font-medium text-ctp-subtext0 mb-2'>Description</h3>
                            <p className='text-sm sm:text-base text-ctp-text whitespace-pre-wrap'>{task.description}</p>
                        </div>

                        {/* Priority */}
                        <div>
                            <h3 className='text-sm font-medium text-ctp-subtext0 mb-2'>Priority Level</h3>
                            <span className={`inline-block text-xs px-3 py-1 rounded-full border font-medium ${
                                getPriorityColor(task.priority)
                            }`}>
                                {task.priority.toUpperCase()}
                            </span>
                        </div>

                        {/* Difficulty */}
                        <div>
                            <h3 className='text-sm font-medium text-ctp-subtext0 mb-2'>Difficulty Level</h3>
                            <span className='inline-block text-xs px-3 py-1 rounded-full border font-medium bg-ctp-mauve/20 text-ctp-mauve border-ctp-mauve/30'>
                                {task.difficulty.toUpperCase()} ({task.difficulty === 'easy' ? '50' : task.difficulty === 'medium' ? '100' : '200'} XP)
                            </span>
                        </div>

                        {/* Due Date */}
                        {task.due_date && (
                            <div>
                                <h3 className='text-sm font-medium text-ctp-subtext0 mb-2'>Due Date</h3>
                                <p className='text-sm sm:text-base text-ctp-text'>
                                    {new Date(task.due_date).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        )}

                        {/* Timestamps */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-ctp-surface1'>
                            <div>
                                <h3 className='text-xs font-medium text-ctp-overlay0 mb-1'>Created</h3>
                                <p className='text-sm text-ctp-subtext0'>
                                    {new Date(task.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <h3 className='text-xs font-medium text-ctp-overlay0 mb-1'>Last Updated</h3>
                                <p className='text-sm text-ctp-subtext0'>
                                    {new Date(task.updated_at).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-col sm:flex-row gap-3 pt-4'>
                            <button
                                onClick={() => setIsEditing(true)}
                                className='flex-1 px-4 py-2.5 bg-ctp-blue text-ctp-base rounded-lg font-medium
                                    hover:bg-ctp-sapphire transition-colors shadow-lg'
                            >
                                Edit Quest
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className='flex-1 px-4 py-2.5 bg-ctp-red/20 text-ctp-red border border-ctp-red/30
                                    rounded-lg font-medium hover:bg-ctp-red/30 transition-colors'
                            >
                                Delete Quest
                            </button>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Dialog */}
                {showDeleteConfirm && (
                    <div className='absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-xl'>
                        <div className='glass-strong p-6 max-w-sm mx-4 rounded-xl shadow-2xl'>
                            <h3 className='text-lg font-bold text-ctp-red mb-3'>Delete Quest?</h3>
                            <p className='text-sm text-ctp-subtext0 mb-6'>
                                Are you sure you want to delete "{task.title}"? This action cannot be undone.
                            </p>
                            <div className='flex gap-3'>
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className='flex-1 px-4 py-2 bg-ctp-surface1/60 text-ctp-text rounded-lg font-medium
                                        hover:bg-ctp-surface2/60 transition-colors'
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleDelete}
                                    className='flex-1 px-4 py-2 bg-ctp-red text-ctp-base rounded-lg font-medium
                                        hover:bg-ctp-red/80 transition-colors'
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}