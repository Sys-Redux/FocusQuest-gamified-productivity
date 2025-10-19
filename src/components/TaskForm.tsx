import { useState, type FormEvent } from 'react';
import { useTasks } from '../hooks/useTasks';
import { type Task } from '../types/task';

interface TaskFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export function TaskForm({ isOpen, onClose }: TaskFormProps) {
    const { addTask } = useTasks();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
    const [dueDate, setDueDate] = useState<string>('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const newTask: Task = {
            // Generate a unique & secure ID (only works in secure contexts)
            id: crypto.randomUUID(),
            title,
            description,
            completed: false,
            priority,
            createdAt: new Date(),
            updatedAt: new Date(),
            // If dueDate is not an empty string, convert it to a Date object and include it in the newTask
            ...(dueDate && { dueDate: new Date(dueDate) }),
        };

        addTask(newTask);

        // Reset form
        setTitle('');
        setDescription('');
        setPriority('medium');
        setDueDate('');
        onClose();
    };

    if (!isOpen) return null;


    return (
        <div className='fixed inset-0 z-50 flex utems-end sm:items-center justify-center bg-black/50 backdrop-blur-sm'
            onClick={onClose}
        >
            <div className='glass-strong rounded-t-2xl sm:rounded-xl w-full sm:max-w-lg
                shadow-2xl max-h-[90vh] overflow-y-auto'
                onClick={(e) => e.stopPropagation()}
            >
                {/* Form Header */}
                <div className='flex justify-between items-center p-4 sm:p-6 border-b border-ctp-surface1 sticky top-0
                    bg-ctp-surface0 z-10'>
                    <h2 className='text-xl sm:text-2xl font-bold text-ctp-mauve'>
                        New Quest
                    </h2>
                    <button
                        onClick={onClose}
                        className='text-ctp-subtext0 hover:text-ctp-text transition-colors p-2 m-2'
                        aria-label='Close Form'
                    >
                        <svg className='w-5 h-5 sm:w-6 sm:h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className='p-4 sm:p-6 space-y-4'>
                    {/* Title */}
                    <div>
                        <label htmlFor='title' className='block text-sm font-medium text-ctp-text mb-2'>
                            Quest Name *
                        </label>
                        <input
                            type='text'
                            id='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className='w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-ctp-mantle/60 backdrop-blur-md border
                                border-ctp-surface2/50 rounded-lg text-ctp-text text-sm sm:text-base placeholder-ctp-overlay0
                                focus:outline-none focus:ring-2 focus:ring-ctp-mauve focus:border-transparent transition-all'
                            placeholder="What's your quest?"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor='description' className='block text-sm font-medium text-ctp-text mb-2'>
                            Description *
                        </label>
                        <textarea
                            id='description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            rows={3}
                            className='w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-ctp-mantle/60 backdrop-blur-md border
                                border-ctp-surface2/50 rounded-lg text-ctp-text text-sm sm:text-base placeholder-ctp-overlay0
                                focus:outline-none focus:ring-2 focus:ring-ctp-mauve focus:border-transparent resize-none transition-all'
                            placeholder="Describe your quest..."
                        />
                    </div>

                    {/* Priority */}
                    <div>
                        <label htmlFor='priority' className='block text-sm font-medium text-ctp-text mb-2'>
                            Priority Level *
                        </label>
                        <select
                            id='priority'
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                            required
                            className='w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-ctp-mantle/60 backdrop-blur-md border border-ctp-surface2/50
                                rounded-lg text-ctp-text text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-ctp-mauve
                                focus:border-transparent transition-all'
                        >
                            <option value='low'>Low</option>
                            <option value='medium'>Medium</option>
                            <option value='high'>High</option>
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
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className='w-full px-3 py-2 sm:px-4 sm:py-2.5 bg-ctp-mantle/60 backdrop-blur-md border border-ctp-surface2/50
                                rounded-lg text-ctp-text text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-ctp-mauve
                                focus:border-transparent transition-all'
                        />
                    </div>

                    {/* Actions */}
                    <div className='flex flex-col-reverse sm:flex-row gap-3 pt-4'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='w-full sm:flex-1 px-4 py-2.5 sm:py-2 bg-ctp-surface1/60 backdrop-blur-md text-ctp-text
                                rounded-lg font-medium hover:bg-ctp-surface2/60 transition-colors'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='w-full sm:flex-1 px-4 py-2.5 sm:py-2 bg-ctp-mauve text-ctp-base rounded-lg font-medium
                                hover:bg-ctp-mauve/80 transition-colors shadow-lg'
                        >
                            Add Quest
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}