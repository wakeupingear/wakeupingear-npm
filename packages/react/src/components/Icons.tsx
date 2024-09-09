import { HashLoader } from 'react-spinners';
import { LoaderSizeProps } from 'react-spinners/helpers/props';
import useTheme from '../hooks/useTheme';
import {
    EXTERNAL_SITE_METADATA as _EXTERNAL_SITE_METADATA,
    ExternalSite,
    ExternalSiteMetadata,
} from '@wakeupingear/utils';
import {
    IconDeviceGamepad2,
    IconUser,
    IconSettings,
    IconSearch,
    IconX,
    IconPencil,
    IconTrash,
    IconQuestionMark,
    IconBrush,
    IconPhoto,
    IconArrowRight,
    IconCamera,
    IconProps,
    Icon,
    IconBrandDiscord,
    IconBrandGithub,
    IconBrandKickstarter,
    IconBrandMastodon,
    IconBrandPatreon,
    IconTrophy,
    IconBrandTwitch,
    IconBrandTwitter,
    IconBrandYoutube,
    IconBrandSteam,
    IconBrandApple,
    IconBrandLinkedin,
    IconBrandTiktok,
    IconMail,
    IconBrandSpotify,
    IconBrandXbox,
    IconBrandWikipedia,
    IconBrandItch,
} from '@tabler/icons-react';

export const Icon_Game = IconDeviceGamepad2;
export const Icon_Profile = IconUser;
export const Icon_Settings = IconSettings;
export const Icon_Search = IconSearch;
export const Icon_Close = IconX;
export const Icon_Edit = IconPencil;
export const Icon_Delete = IconTrash;
export const Icon_Question = IconQuestionMark;
export const Icon_Style = IconBrush;
export const Icon_Image = IconPhoto;
export const Icon_Arrow = IconArrowRight;
export const Icon_Camera = IconCamera;

export function Icon_Loading(props: LoaderSizeProps) {
    const color =
        props.color || (useTheme()[0] === 'light' ? 'black' : 'white');
    return <HashLoader color={color} {...props} />;
}

export { ExternalSite } from '@wakeupingear/utils';

type ExclusiveExternalSiteReactMetadata = {
    icon: React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<Icon>
    >;
};
export type ExternalSiteReactMetadata = ExternalSiteMetadata &
    ExclusiveExternalSiteReactMetadata;

const REACT_METADATA: Record<ExternalSite, ExclusiveExternalSiteReactMetadata> =
    {
        artstation: { icon: IconBrush },
        discord: { icon: IconBrandDiscord },
        github: { icon: IconBrandGithub },
        kickstarter: {
            icon: IconBrandKickstarter,
        },
        mastodon: { icon: IconBrandMastodon },
        patreon: { icon: IconBrandPatreon },
        speedrun: { icon: IconTrophy },
        substack: { icon: IconPencil },
        twitch: { icon: IconBrandTwitch },
        twitter: {
            icon: IconBrandTwitter,
        },
        youtube: {
            icon: IconBrandYoutube,
        },
        steam: { icon: IconBrandSteam },
        apple: { icon: IconBrandApple },
        linkedin: {
            icon: IconBrandLinkedin,
        },
        tiktok: { icon: IconBrandTiktok },
        email: { icon: IconMail },
        spotify: { icon: IconBrandSpotify },
        xbox: { icon: IconBrandXbox },
        wikipedia: { icon: IconBrandWikipedia },
        itch: { icon: IconBrandItch },
    };

export const EXTERNAL_SITE_METADATA: Record<
    ExternalSite,
    ExternalSiteReactMetadata
> = Object.keys(_EXTERNAL_SITE_METADATA).reduce((acc, _key) => {
    const key = _key as ExternalSite;
    acc[key] = {
        ..._EXTERNAL_SITE_METADATA[key],
        ...REACT_METADATA[key],
    };
    return acc;
}, {} as Record<ExternalSite, ExternalSiteReactMetadata>);
