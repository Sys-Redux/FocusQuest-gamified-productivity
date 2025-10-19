import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { TaskForm } from '../components/TaskForm';

export default function Dashboard() {
    const { tasks, toggleTaskComplete } = useTasks();
    const [isFormOpen, setIsFormOpen] = useState(false);

    const completedTasks = tasks.filter(t => t.completed).length
    const pendingTasks = tasks.length - completedTasks;

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
        <main className='min-h-screen gradient-bg-vibrant text-ctp-text'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <header className='mb-6 lg:mb-8'>
                    <h1 className='text-3xl sm:text-4xl font-bold text-ctp-mauve mb-2 drop-shadow-lg'>
                        FocusQuest Dash
                    </h1>
                    <p className='text-sm sm:text-base text-ctp-subtext0'>
                        Gamified Productivity Tasking
                    </p>
                </header>

                {/* Stats Cards */}
                <section className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8' aria-label='Task Statistics'>
                    <article className='glass p-4 sm:p-6 rounded-xl hover:border-ctp-blue/50 transition-all shadow-lg'>
                        <h2 className='text-ctp-subtext0 text-xs sm:text-sm font-medium mb-2'>
                            Total Quests
                        </h2>
                        <p className='text-3xl sm:text-4xl font-bold text-ctp-blue'>
                            {tasks.length}
                        </p>
                    </article>
                    <article className='glass p-4 sm:p-6 rounded-xl hover:border-ctp-blue/50 transition-all shadow-lg'>
                        <h2 className='text-ctp-subtext0 text-xs sm:text-sm font-medium mb-2'>
                            Completed Quests
                        </h2>
                        <p className='text-3xl sm:text-4xl font-bold text-ctp-green'>
                            {completedTasks}
                        </p>
                    </article>
                    <article className='glass p-4 sm:p-6 rounded-xl hover:border-ctp-blue/50 transition-all shadow-lg'>
                        <h2 className='text-ctp-subtext0 text-xs sm:text-sm font-medium mb-2'>
                            Pending Quests
                        </h2>
                        <p className='text-3xl sm:text-4xl font-bold text-ctp-yellow'>
                            {pendingTasks}
                        </p>
                    </article>
                </section>

                {/* Task List */}
                <section className='glass-strong rounded-xl p-4 sm:p-6 shadow-2xl' aria-label='Task List'>
                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6'>
                        <h2 className='text-xl sm:text-2xl font-bold text-ctp-text'>
                            Your Quests
                        </h2>
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className='bg-ctp-mauve hover:bg-ctp-mauve/80 text-ctp-base px-4 py-2 rounded-lg
                                font-medium transition-colors w-full sm:w-auto shadow-lg'
                        >
                            + Add Quest
                        </button>
                    </div>

                    {tasks.length === 0 ? (
                        <div className='text-center py-8 sm:py-12'>
                            <p className='text-ctp-subtext0 text-base sm:text-lg'>
                                Nothing here yet... Time to create your first quest!
                            </p>
                        </div>
                    ) : (
                        <ul className='space-y-3 sm:space-y-4'>
                            {tasks.map(task => (
                                <li
                                    key={task.id}
                                    className={`bg-ctp-mantle/60 backdrop-blur-md border rounded-xl p-4 sm:p-5
                                        transition-all hover:border-ctp-mauve/50 hover:shadow-lg ${
                                            task.completed ? 'border-ctp-surface2 opacity-75' : 'border-ctp-surface1/50'
                                    }`}
                                >
                                    <article className='flex items-start gap-3 sm:gap-4'>
                                        <input
                                            type='checkbox'
                                            checked={task.completed}
                                            onChange={() => toggleTaskComplete(task.id)}
                                            className='mt-1 h-4 w-4 sm:h-5 sm:w-5 rounded border-ctp-surface2 bg-ctp-surface0 text-ctp-mauve cursor-pointer'
                                        />
                                        <div className='flex-1 min-w-0'>
                                            <h3 className={`text-base sm:text-lg font-semibold mb-1 sm:mb-2 ${
                                                task.completed ? 'line-through text-ctp-overlay1' : 'text-ctp-text'
                                            }`}>
                                                {task.title}
                                            </h3>
                                            <p className={`text-xs sm:text-sm mb-2 sm:mb-3 ${
                                                task.completed ? 'text-ctp-overlay0' : 'text-ctp-subtext0'
                                            }`}>
                                                {task.description}
                                            </p>
                                            <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
                                                <span className={`text-xs px-2 sm:px-3 py-1 rounded-full border font-medium ${
                                                    getPriorityColor(task.priority)
                                                }`}>
                                                    {task.priority.toUpperCase()}
                                                </span>
                                                {task.dueDate && (
                                                    <span className='text-xs text-ctp-subtext0'>
                                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>

            {/* Task Form Modal */}
            <TaskForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        </main>
    );
}