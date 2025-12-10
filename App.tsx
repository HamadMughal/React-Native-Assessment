import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ActivityIndicator, View } from 'react-native';
import { store, persistor } from './src/store/store';
import { AppNavigator } from './src/navigation/AppNavigator';
import { COLORS } from './src/constants/colors';
import {
  requestUserPermission,
  setupForegroundNotificationListener,
  setupNotificationOpenedListeners,
} from './src/services/firebaseNotificationHandler';

const App = () => {

  useEffect(() => {
    requestUserPermission();
    const foregroundUnsub = setupForegroundNotificationListener();
    const backgroundUnsub = setupNotificationOpenedListeners();

    return () => {
      if (foregroundUnsub) foregroundUnsub();
      if (backgroundUnsub) backgroundUnsub();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate
        loading={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        }
        persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;