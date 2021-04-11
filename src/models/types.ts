import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Root: undefined;
  Home: undefined;
  Settings: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

export type NavigationProps = {
  navigation: NavigationProp;
};

export type DigitalTimerProps = {
  time: string;
};

export type ControlButtonProps = {
  type: 'full' | 'outline';
  borderType: 'full' | 'half';
  isActive?: boolean;
  title: string;
  onPress: () => void;
};
