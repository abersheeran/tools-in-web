export function setLocationHashValue(name: string, value: any): void {
    let params = new URLSearchParams(window.location.hash.slice(1));
    params.set(name, value);
    window.location.hash = params.toString();
}

export function getLocationHashValue(name: string): string | null {
    return new URLSearchParams(window.location.hash.slice(1)).get(name)
}