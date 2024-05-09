import { Avatar } from 'native-base';
import { IAvatarProps } from 'native-base/lib/typescript/components/composites/Avatar';

interface Props {
  size: IAvatarProps['size'];
  source: IAvatarProps['source'];
  extraProps?: Object;
}

export default function CustomAvatar({ size, source, ...extraProps }: Props) {
  return <Avatar size={size} source={source} {...extraProps} />;
}
