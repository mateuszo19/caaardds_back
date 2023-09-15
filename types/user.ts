export interface NewUser extends Omit<User, 'id'>{
    id?: string;
    refreshToken?: string
}
export interface User {
    id: string;
    username: string;
    password: string;
    roles: Record<string, number>;
    refreshToken?: string
}

