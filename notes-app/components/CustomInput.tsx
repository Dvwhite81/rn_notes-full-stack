import { Input } from 'native-base';

interface Props {
  placeholder: string;
  fontSize?: 'sm' | 'lg';
  value?: string;
  onChangeText?: (value: string) => void;
  extraProps?: Object;
}

export default function CustomInput({
  placeholder,
  fontSize,
  value,
  onChangeText,
  ...extraProps
}: Props) {
  return (
    <Input
      placeholder={placeholder}
      fontSize={fontSize}
      m="1.5"
      borderColor="#aaa"
      selectionColor="#99999980"
      _focus={{ borderColor: '#00838f', borderWidth: '2' }}
      numberOfLines={1}
      multiline={true}
      value={value}
      onChangeText={(text) => onChangeText?.(text)}
      {...extraProps}
    />
  );
}
