export type fileFragment = {
    source: string;
    manifest: {
        filename: string,
        filesize: number,
        quality?: number,
    };
};
