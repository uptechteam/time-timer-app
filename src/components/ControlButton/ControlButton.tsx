import React from 'react';
import { createText, createBox } from '@shopify/restyle';
import { Theme } from 'theme/globalTheme';
import { ControlButtonProps } from 'models/types';
import { Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const Text = createText<Theme>();
const Box = createBox<Theme>();

const ControlButton: React.FC<ControlButtonProps> = ({
  title,
  onPress,
  isActive,
  type,
  borderType,
}) => {
  const bgColor =
    type === 'full' ? (isActive ? 'backgroundActive' : 'backgroundInactive') : 'white';
  const borderColor = borderType === 'full' ? 'borderActive' : 'borderInactive';
  const borderWidth = type === 'full' ? 0 : 2;
  const textColor = type === 'full' ? 'white' : 'customBlack';

  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        flex={0}
        flexDirection='row'
        width={width / 2.5}
        justifyContent='center'
        padding='m'
        borderRadius={50}
        borderWidth={borderWidth}
        borderColor={borderColor}
        backgroundColor={bgColor}
      >
        <Text variant='controlButton' color={textColor}>
          {title}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default ControlButton;
