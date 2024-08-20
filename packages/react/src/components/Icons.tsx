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
import { HashLoader } from 'react-spinners';
import { LoaderSizeProps } from 'react-spinners/helpers/props';
import useTheme from '../hooks/useTheme';

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
    const [theme] = useTheme();
    return (
        <HashLoader color={theme === 'light' ? 'black' : 'white'} {...props} />
    );
}
