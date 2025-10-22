export interface User {
    id: string;
    name: string;
    email: string;
    picture?: string;
    email_verified?: boolean;
    sub?: string;
    nickname?: string;
}