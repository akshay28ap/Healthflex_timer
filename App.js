import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import TimerScreen from './screens/TimeScreen';
import CategoryScreen from './screens/CategoryScreen';
import { TimerProvider } from './contexts/TimerContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TimerProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Timers') {
                iconName = focused ? 'timer' : 'timer-outline';
              } else if (route.name === 'Categories') {
                iconName = focused ? 'list' : 'list-outline';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Timers" component={TimerScreen} />
          <Tab.Screen name="Categories" component={CategoryScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </TimerProvider>
  );
}
