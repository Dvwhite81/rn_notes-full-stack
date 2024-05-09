import { useEffect } from 'react';
import { NativeBaseProvider, StatusBar } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor, useAppDispatch } from './redux/store';
import { fetchAllNotes } from './redux/notes-actions';
import LoadingSpinner from './components/LoadingSpinner';
import MainNavigator from './navigation/MainNavigator';

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<LoadingSpinner />}>
          <StatusBar backgroundColor="#005662" />
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
}
