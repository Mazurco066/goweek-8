import React, { useState } from 'react'; 

import {
  Container,
  SignInButton,
  SignInForm,
  SignInInput,
  TindevLogo
} from './styles';

import api from '../../services/api';

import logo from '../../assets/images/logo.svg';

export default function SignIn({ history }) {

  const [ username, setUsername ] = useState('')
 
  function handleSubmit(e) {
    e.preventDefault();
    api.get('/developers/' + username)
    .then(response => {
      if ([200, 201].includes(response.status)) {
        const devData = response.data.data;
        history.push(`/devs/${devData.user}`);
      }
    })
    .catch(err => {
      if ([404].includes(err.response.status)) {
        api.post('/developers', { username: username })
        .then(response => {
          const newDev = response.data.data;
          history.push(`/devs/${newDev.user}`);
        })
        .catch(err => {

        });
      }
    });
  }

  return (
    <Container>
      <SignInForm onSubmit={handleSubmit}>
        <TindevLogo src={logo} alt="tindev" />
        <SignInInput
          type="text"
          placeholder="Digite seu usuário no github"
          value={username}
          onChange={e => { setUsername(e.target.value) }}
        />
        <SignInButton
          type="submit"
        >Enviar</SignInButton>
      </SignInForm>
    </Container>
  );
}