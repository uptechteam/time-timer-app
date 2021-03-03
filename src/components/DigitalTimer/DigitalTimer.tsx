import React from 'react';
import { createText } from '@shopify/restyle';
import { Theme } from 'theme/globalTheme';
import { DigitalTimerProps } from 'models/types';

const Text = createText<Theme>();

const DigitalTimer: React.FC<DigitalTimerProps> = ({ time }) => {
  return <Text variant='digitalTimer'>{time}</Text>;
};

export default DigitalTimer;
