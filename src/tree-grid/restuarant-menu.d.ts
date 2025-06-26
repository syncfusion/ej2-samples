declare global {
    interface Window {
        chiptags: (ingredients: string[]) => string;
        iterateFoodCount: (vegCount: number, nonvegCount: number) => number;
    }
}
export {};
