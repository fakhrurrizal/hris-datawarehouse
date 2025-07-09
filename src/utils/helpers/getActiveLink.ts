export function isLinkActive(currentPath: string, linkPath: string) {
    if (linkPath === '/') {
        // Check for exact match for the home link
        return currentPath === '/'
    } else {
        // Check if the current path is exactly the linkPath or starts with the linkPath followed by a hash
        return currentPath === linkPath || currentPath.startsWith(`${linkPath}`)
    }
}
