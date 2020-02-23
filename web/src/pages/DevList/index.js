import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const loadDevelopers = () => {
      api.get('/developers', {
        headers: { user: match.params.id }
      })
      .then(response => {
        if ([200, 201].includes(response.status)) {
          setUsers(response.data.data);
        }
      })
      .catch(err => {});
    }
    loadDevelopers()
  }, [match.params.id])

  function handleLike(target) {
    api.post(`/developers/${target}/like`, null, {
      headers: { user: match.params.id }
    })
    .then(response => {
      if ([200, 201].includes(response.status)) {
        setUsers(users.filter(dev => dev.user !== target))
      }
    })
    .catch(err => {

    });
  }

  function handleDislike(target) {
    api.post(`/developers/${target}/dislike`, null, {
      headers: { user: match.params.id }
    })
    .then(response => {
      if ([200, 201].includes(response.status)) {
        setUsers(users.filter(dev => dev.user !== target))
      }
    })
    .catch(err => {

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
