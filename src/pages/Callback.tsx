import { useAuth0 } from "@auth0/auth0-react";

export const Callback: React.FC = () => {
    const { error } = useAuth0();

    if (error) {
        return (
            <div className='min-h-screen flex items-center justify-center gradient-bg-vibrant'>
                <div className='glass-strong p-8 rounded-xl'>
                    <h1 className='text-ctp-text text-2xl font-bold mb-4'>Oops... Encountering Villains</h1>
                    <p className='text-ctp-text'>{error.message}</p>
                </div>
            </div>
        );
    }


    return (
        <div className='min-h-screen flex items-center justify-center gradient-bg-vibrant'>
            <div className='glass-strong p-8 rounded-xl'>
                <p className='text-ctp-text'>Processing your heroic return...</p>
            </div>
        </div>
    );
};