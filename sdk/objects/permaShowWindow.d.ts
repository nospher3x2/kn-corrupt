declare class permaShowWindow {
    visible: boolean;
    add( displayName: string, component: menuElement ): void
}

declare global {
    const permaShowWindow : permaShowWindow;
}

export {};