export function sleep(milliseconds: number): Promise<object> {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}