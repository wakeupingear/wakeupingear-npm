import {
    BiGame,
    BiGridAlt,
    BiImage,
    BiImageAlt,
    BiMask,
    BiPaint,
    BiPencil,
    BiQuestionMark,
    BiSearch,
    BiSliderAlt,
    BiTrashAlt,
    BiUser,
    BiX,
    BiRightArrowAlt,
    BiCamera,
} from 'react-icons/bi';
import { BsSubstack } from 'react-icons/bs';
import {
    FaApple,
    FaArtstation,
    FaDiscord,
    FaGithub,
    FaItchIo,
    FaKickstarter,
    FaLinkedin,
    FaMastodon,
    FaPatreon,
    FaRegEnvelope,
    FaSpotify,
    FaSteam,
    FaTiktok,
    FaTrophy,
    FaTwitch,
    FaTwitter,
    FaWikipediaW,
    FaXbox,
    FaYoutube,
} from 'react-icons/fa';
import { HashLoader } from 'react-spinners';
import { LoaderSizeProps } from 'react-spinners/helpers/props';
import useTheme from '../hooks/useTheme';
import {
    EXTERNAL_SITE_METADATA as _EXTERNAL_SITE_METADATA,
    ExternalSite,
    ExternalSiteMetadata,
} from '@wakeupingear/utils';
import { IconType } from 'react-icons';

export const Icon_Game = BiGame;
export const Icon_Profile = BiUser;
export const Icon_Admin = BiMask;
export const Icon_Settings = BiSliderAlt;
export const Icon_Search = BiSearch;
export const Icon_Close = BiX;
export const Icon_Edit = BiPencil;
export const Icon_Delete = BiTrashAlt;
export const Icon_Question = BiQuestionMark;
export const Icon_Widgets = BiGridAlt;
export const Icon_Style = BiPaint;
export const Icon_Background = BiImage;
export const Icon_Image = BiImageAlt;
export const Icon_Arrow = BiRightArrowAlt;
export const Icon_Camera = BiCamera;

export function Icon_Loading(props: LoaderSizeProps) {
    const color =
        props.color || (useTheme()[0] === 'light' ? 'black' : 'white');
    return <HashLoader color={color} {...props} />;
}

export { ExternalSite } from '@wakeupingear/utils';

type ExclusiveExternalSiteReactMetadata = {
    icon: IconType;
};
export type ExternalSiteReactMetadata = ExternalSiteMetadata &
    ExclusiveExternalSiteReactMetadata;

const REACT_METADATA: Record<ExternalSite, ExclusiveExternalSiteReactMetadata> =
    {
        artstation: { icon: FaArtstation },
        discord: { icon: FaDiscord },
        github: { icon: FaGithub },
        kickstarter: {
            icon: FaKickstarter,
        },
        mastodon: { icon: FaMastodon },
        patreon: { icon: FaPatreon },
        speedrun: { icon: FaTrophy },
        substack: { icon: BsSubstack },
        twitch: { icon: FaTwitch },
        twitter: {
            icon: FaTwitter,
        },
        youtube: {
            icon: FaYoutube,
        },
        steam: { icon: FaSteam },
        apple: { icon: FaApple },
        linkedin: {
            icon: FaLinkedin,
        },
        tiktok: { icon: FaTiktok },
        email: { icon: FaRegEnvelope },
        spotify: { icon: FaSpotify },
        xbox: { icon: FaXbox },
        wikipedia: { icon: FaWikipediaW },
        itch: { icon: FaItchIo },
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
