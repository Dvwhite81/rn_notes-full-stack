import {
  FormControl,
  IFormControlProps,
  IInputProps,
  Input,
  WarningOutlineIcon,
} from 'native-base';

interface Props {
  inputName: string;
  placeholder: string;
  inputType: IInputProps['type'];
  required: IFormControlProps['isRequired'];
  invalid: IFormControlProps['isInvalid'];
  errorMessage?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function CustomFormControl({
  inputName,
  placeholder,
  inputType,
  required,
  invalid,
  errorMessage,
  value,
  onChangeText,
}: Props) {
  return (
    <FormControl isRequired={required} isInvalid={invalid}>
      <FormControl.Label>{inputName}</FormControl.Label>
      <Input
        type={inputType}
        placeholder={placeholder}
        h="10"
        w="56"
        borderColor="#aaa"
        selectionColor="#99999980"
        _focus={{ borderColor: '#00838f', borderWidth: '2' }}
        value={value}
        onChangeText={onChangeText}
      />
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
