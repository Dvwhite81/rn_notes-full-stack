import { Button } from 'native-base';

interface Props {
  text: string;
  onPressAction: (...args: any[]) => any;
  extraProps?: Object;
}

export default function CustomButton({
  text,
  onPressAction,
  ...extraProps
}: Props) {
  return (
    <Button
      bgColor="#00838f"
      _pressed={{ bgColor: '#005662' }}
      onPress={onPressAction}
      {...extraProps}
    >
      {text}
    </Button>
  );
}
