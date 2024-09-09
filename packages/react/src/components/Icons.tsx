import { HashLoader } from 'react-spinners';
import { LoaderSizeProps } from 'react-spinners/helpers/props';
import useTheme from '../hooks/useTheme';

export function Icon_Loading(props: LoaderSizeProps) {
    const color =
        props.color || (useTheme()[0] === 'light' ? 'black' : 'white');
    return <HashLoader color={color} {...props} />;
}

export { ExternalSite } from '@wakeupingear/utils';
