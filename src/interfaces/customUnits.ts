interface CustomUnits {
    [name: string]: string | {
        definition: string,
        aliases?: string[],
        prefixes?: string,
        offset?: number
    }
}
