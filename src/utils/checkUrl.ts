
//correct display url address

export const checkUrl = (url: string) => {
    if (url.substring(0, 4) !== 'http') {
        return `//${url}`;
    }
    return url;
};