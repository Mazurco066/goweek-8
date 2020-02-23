import React, { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import { Platform } from 'react-native';

import {
    Container,
    DevInput,
    SignInButton,
    SignInButtonText, 
    TindevLogo
} from './styles';

import api from '../../services/api';

import logo from '../../../assets/logo.png';

export default function SignIn({ navigation }) {

  const [ user, setUser ] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if (user) {
        navigation.navigate('DevList', { user });
      }
    })
  }, []);

  function handleSignIn() {
    api.get('/developers/' + user)
    .then(response => {
      if ([200, 201].includes(response.status)) {
        const devData = response.data.data;
        AsyncStorage.setItem('user', devData.user).then(() => {
          navigation.navigate('DevList', { user: devData.user });
        });
      }
    })
    .catch(err => {
      if ([404].includes(err.response.status)) {
        api.post('/developers', { username: user })
        .then(response => {
          const newDev = response.data.data;
          AsyncStorage.setItem('user', newDev.user).then(() => {
            navigation.navigate('DevList', { user: devData.user });
          });
        })
        .catch(err => { });
      }
    });
  }

  return (
    <Container
      behavior="padding"
      enabled={Platform.OS === 'ios'}
    >
      <TindevLogo source={logo} />
      <DevInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Digite seu usuário no GitHub"
          placeholderTextColor="#999"
          value={user}
          onChangeText={setUser}
      />
      <SignInButton onPress={handleSignIn}>
        <SignInButtonText>Acessar</SignInButtonText>
      </SignInButton>
    </Container>
  );
}
