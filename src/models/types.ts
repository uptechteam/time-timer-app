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
