declare class user {
    data: userData
    hwid: number
}

declare global {
    const user: user;
}

export {};