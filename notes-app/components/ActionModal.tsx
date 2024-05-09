import { Actionsheet, HStack, Icon, Text } from 'native-base';
import { Path } from 'react-native-svg';

interface Props {
  modalIsOpen: boolean;
  closeModal: () => void;
  onDelete: () => void;
}

export default function ActionModal({
  modalIsOpen,
  closeModal,
  onDelete,
}: Props) {
  return (
    <Actionsheet isOpen={modalIsOpen} onClose={closeModal}>
      <Actionsheet.Content>
        <HStack justifyContent="center">
          <Text color="#555" fontSize="md" fontWeight="bold">
            Note
          </Text>
        </HStack>
        <Actionsheet.Item
          startIcon={
            <Icon viewBox="0 0 24 24" size="sm">
              <Path d="M0 0h24v24H0V0z" fill="none" />
              <Path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
            </Icon>
          }
          onPress={() => {
            onDelete();
            closeModal();
          }}
        >
          Delete
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  );
}
