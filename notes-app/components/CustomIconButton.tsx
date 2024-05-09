import { IconButton } from 'native-base';

interface Props {
  icon: JSX.Element;
  onPressAction?: () => void;
}

export default function CustomIconButton({ icon, onPressAction }: Props) {
  return (
    <IconButton
      borderRadius="100"
      _pressed={{ bgColor: '#00838f80' }}
      icon={icon}
      onPress={onPressAction}
    />
  );
}
