export type ExternalSite =
    | 'twitter'
    | 'discord'
    | 'github'
    | 'youtube'
    | 'twitch'
    | 'artstation'
    | 'patreon'
    | 'kickstarter'
    | 'steam'
    | 'apple'
    | 'tiktok'
    | 'linkedin'
    | 'substack'
    | 'mastodon'
    | 'speedrun'
    | 'email'
    | 'spotify'
    | 'xbox'
    | 'wikipedia'
    | 'itch';

type ExternalSiteMetadata = {
    urlPrefixes?: string[];
};

export const EXTERNAL_SITE_METADATA: Record<
    ExternalSite,
    ExternalSiteMetadata
> = {
    artstation: { urlPrefixes: ['https://artstation.com/'] },
    discord: { urlPrefixes: ['https://discord.gg/'] },
    github: { urlPrefixes: ['https://github.com/'] },
    kickstarter: {
        urlPrefixes: ['https://kickstarter.com/'],
    },
    mastodon: { urlPrefixes: ['https://mastodon.social/'] },
    patreon: { urlPrefixes: ['https://patreon.com/'] },
    speedrun: { urlPrefixes: ['https://speedrun.com/'] },
    substack: { urlPrefixes: ['https://substack.com/'] },
    twitch: { urlPrefixes: ['https://twitch.tv/'] },
    twitter: {
        urlPrefixes: ['https://twitter.com/', 'https://x.com/'],
    },
    youtube: {
        urlPrefixes: ['https://youtube.com/', 'https://www.youtube.com/'],
    },
    steam: { urlPrefixes: ['https://store.steampowered.com/app/'] },
    apple: { urlPrefixes: ['https://apps.apple.com/us/app/'] },
    linkedin: {
        urlPrefixes: ['https://www.linkedin.com/company/'],
    },
    tiktok: { urlPrefixes: ['https://tiktok.com/@'] },
    email: { urlPrefixes: ['mailto:'] },
    spotify: { urlPrefixes: ['https://open.spotify.com/'] },
    xbox: { urlPrefixes: ['https://www.xbox.com/en-us/games/'] },
    wikipedia: { urlPrefixes: ['https://wikipedia.org/'] },
    itch: { urlPrefixes: ['https://itch.io/'] },
};

export const getExternalSite = (url: string): ExternalSite | null => {
    const lower = url.toLowerCase();
    return (
        (Object.entries(EXTERNAL_SITE_METADATA).find(
            ([_, value]) =>
                value.urlPrefixes?.some((prefix) => lower.startsWith(prefix)) ??
                false
        )?.[0] as ExternalSite) ?? null
    );
};

export const getExternalSiteMetadata = (
    site: ExternalSite
): ExternalSiteMetadata => {
    return EXTERNAL_SITE_METADATA[site];
};

export const getUrlMetadata = (url: string): ExternalSiteMetadata | null => {
    const site = getExternalSite(url);
    return site ? getExternalSiteMetadata(site) : null;
};
