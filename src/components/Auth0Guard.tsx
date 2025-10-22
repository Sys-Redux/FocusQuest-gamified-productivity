import { withAuthenticationRequired } from "@auth0/auth0-react";
import { type ComponentType } from "react";

interface Auth0GuardProps {
  component: ComponentType;
}

export const Auth0Guard = ({ component }: Auth0GuardProps) => {
    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <div className='min-h-screen flex items-center justify-center bg-ctp-base'>
                <div className='glass-strong p-8 rounded-xl'>
                    <p className='text-ctp-mauve text-lg'>Redirecting you to login...</p>
                </div>
            </div>
        ),
    });

    return <Component />;
}
