import React, { useState } from 'react';
import { FlatList, Switch, SwitchProps } from 'react-native';
import { SettingsListItem, SettingsListItems } from 'models/types';
import { createBox, createText, useTheme } from '@shopify/restyle';
import { Theme } from 'theme/globalTheme';

const Text = createText<Theme>();
const Box = createBox<Theme>();
const ThemedSwitch = createBox<Theme, SwitchProps>(Switch);

const alertsList: SettingsListItems = [
  { title: 'Vibrate', type: 'switch', id: '1' },
  { title: 'Audible', type: 'switch', id: '2' },
  { title: 'Tone', type: 'arrow', id: '3' },
];

const SettingsScreen: React.FC = () => {
  const theme = useTheme<Theme>();

  const [isVibrate, setIsVibrate] = useState(false);
  const [isAudible, setIsAudible] = useState(false);

  const toggleSwitch = (type: SettingsListItem['title']) => {
    switch (type) {
      case 'Vibrate':
        console.log(`Vibrate: ${!isVibrate}`);
        setIsVibrate(!isVibrate);
        break;
      case 'Audible':
        console.log(`isAudible: ${!isAudible}`);
        setIsAudible(!isAudible);
        break;
      default:
        return false;
    }
  };

  const switchValue = (type: SettingsListItem['title']) => {
    switch (type) {
      case 'Vibrate':
        return isVibrate;
      case 'Audible':
        return isAudible;
      default:
        return false;
    }
  };

  const itemSeparator = () => <Box height={1} borderWidth={1} borderColor='borderInactive' />;

  const renderItem = ({ item }: { item: SettingsListItem }) => (
    <Box
      flex={1}
      flexDirection='row'
      justifyContent='space-between'
      alignItems='center'
      style={{ padding: 17 }}
    >
      <Text variant='semiBold'>{item.title}</Text>
      {item.type === 'switch' && (
        <Switch
          trackColor={{ false: theme.colors.backgroundInactive, true: theme.colors.orange }}
          thumbColor={theme.colors.white}
          ios_backgroundColor={theme.colors.backgroundInactive}
          onValueChange={() => toggleSwitch(item.title)}
          value={switchValue(item.title)}
        />
      )}
    </Box>
  );

  return (
    <Box flex={1} backgroundColor='white' padding='l'>
      <Text textAlign='center' variant='thin'>
        Alerts
      </Text>
      <Box flex={1} justifyContent='flex-start'>
        <FlatList
          data={alertsList}
          renderItem={renderItem}
          ItemSeparatorComponent={itemSeparator}
        />
      </Box>
    </Box>
  );
};

export default SettingsScreen;
