export function getDeterministicPath(rootPath: string | null, nextLayer: number): string {
    return rootPath === null ? String(nextLayer) : `${rootPath}-${nextLayer}`;
}
