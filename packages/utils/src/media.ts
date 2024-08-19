export const isUrl = (str: string) => {
    const lower = str.toLowerCase();
    return ['.http', '.https'].some((prefix) => lower.startsWith(prefix));
};
export const isVideo = (str: string) => {
    const lower = str.toLowerCase();
    return (
        ['.mp4', '.webm'].some((ext) => lower.endsWith(ext)) ||
        [
            'https://www.youtube.com/',
            'https://youtu.be/',
            'https://vimeo.com/',
        ].some((prefix) => str.startsWith(prefix))
    );
};

export const isImage = (str: string) => {
    const lower = str.toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'].some(
        (ext) => lower.endsWith(ext)
    );
};

export const imageSupportsTransparency = (url: string) => {
    const lower = url.toLowerCase();
    return ['.png', '.gif', '.webp'].some((ext) => lower.endsWith(ext));
};
