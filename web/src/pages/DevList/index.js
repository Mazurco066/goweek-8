import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import {
  BtnImage,
  Container,
  DefaultMsg,
  DeveloperBio,
  DeveloperButtons,
  DeveloperFooter,
  DeveloperImage,
  DeveloperItem,
  DevelopersList,
  DeveloperName,
  MatchBtn,
  TindevLogo
} from './styles';

import api from '../../services/api';

import dislike from '../../assets/images/dislike.svg';
import like from '../../assets/images/like.svg';
import logo from '../../assets/images/logo.svg';

export default function DevList({ match })  {

  const [ users, setUsers ] = useState([]);

  const notify = (msg) => toast(msg);

  // Use effect to load users
  useEffect(() => {
    const loadDevelopers = () => {
      notify('Seja bem vindo ao Tindev!');
      api.get('/developers', {
        headers: { user: match.params.id }
      })
      .then(response => {
        if ([200, 201].includes(response.status)) {
          setUsers(response.data.data);
        }
      })
      .catch(err => {
        notify('Erro ao carregar lista de desenvolvedores!');
      });
    }
    loadDevelopers()
  }, [match.params.id])

  // Use effect to connect to web socket
  useEffect(() => {
    const socket = io('http://localhost:3001', { 
      query: { user: match.params.id }
    });
    socket.on('match', dev => {
      console.log(dev)
    })
  }, [match.params.id])

  function handleLike(target) {
    api.post(`/developers/${target}/like`, null, {
      headers: { user: match.params.id }
    })
    .then(response => {
      if ([200, 201].includes(response.status)) {
        setUsers(users.filter(dev => dev.user !== target));
        notify(`Desenvolvedor adicionado a sua lista de matches.`);
      }
    })
    .catch(err => {
      notify(`Erro ao dar match nesse desenvolvedor! Por favor tente novamente.`);
    });
  }

  function handleDislike(target) {
    api.post(`/developers/${target}/dislike`, null, {
      headers: { user: match.params.id }
    })
    .then(response => {
      if ([200, 201].includes(response.status)) {
        setUsers(users.filter(dev => dev.user !== target));
        notify(`Desenvolvedor adicionado a sua lista de dislikes.`);
      }
    })
    .catch(err => {
      notify(`Erro ao dar dislike nesse desenvolvedor! Por favor tente novamente.`);
    })
  }

  return (
    <div>
      <Container>
        <Link to="/">
          <TindevLogo src={logo} alt="tindev" />
        </Link>
          { users.length ? (
            <DevelopersList>
              { users.map(developer => (
                <DeveloperItem key={developer.user}>
                  <DeveloperImage
                    src={developer.avatar}
                    alt={developer.user}
                  />
                  <DeveloperFooter>
                    <DeveloperName>{developer.name}</DeveloperName>
                    <DeveloperBio>{developer.bio}</DeveloperBio>
                  </DeveloperFooter>
                  <DeveloperButtons>
                    <MatchBtn type="button" onClick={() => handleDislike(developer.user)}>
                      <BtnImage src={dislike} alt="dislike" />
                    </MatchBtn>
                    <MatchBtn type="button" onClick={() => handleLike(developer.user)}>
                      <BtnImage src={like} alt="like" />
                    </MatchBtn>
                  </DeveloperButtons>
                </DeveloperItem>
              )
            )}
            </DevelopersList>
          ) : (
            <DefaultMsg>Acabou :(</DefaultMsg>
          )
         }
      </Container>
    </div>
  );
}
