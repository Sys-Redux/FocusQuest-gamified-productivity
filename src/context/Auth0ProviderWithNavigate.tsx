import { Auth0Provider, type AppState } from "@auth0/auth0-react";
import { type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Auth0ProviderWithNavigateProps = {
    children: ReactNode;
}

export const Auth0ProviderWithNavigate = ({ children }: Auth0ProviderWithNavigateProps) => {
    const navigate = useNavigate();

    const domain = 'dev-a83ln7nhed8h3wgt.us.auth0.com';
    const clientId = 'CdmKYnm2HRmWjn1UMhDXGvGBgGplNXa7';
    const redirectUri = 'http://localhost:5173/callback';

    const onRedirectCallback = (appState?: AppState) => {
        navigate(appState?.returnTo || window.location.pathname);
    };

    if (!(domain && clientId && redirectUri)) {
        return (
            <div className='min-h-screen flex items-center justify-center bg-ctp-base'>
                <p className='text-ctp-red'>
                    Auth0 is not properly configured.
                </p>
            </div>
        );
    }


    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
                scope: 'openid profile email',
            }}
            onRedirectCallback={onRedirectCallback}
            cacheLocation="localstorage"
            useRefreshTokens={true}
        >
            {children}
        </Auth0Provider>
    );
};
