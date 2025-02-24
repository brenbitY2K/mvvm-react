export interface User {
    id: number;
    name: string;
    email: string;
    status: 'online' | 'offline';
}

// Simulate an API call
export async function fetchUser(id: number): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
    return {
        id,
        name: `User ${id}`,
        email: `user${id}@example.com`,
        status: Math.random() > 0.5 ? 'online' : 'offline'
    };
}
