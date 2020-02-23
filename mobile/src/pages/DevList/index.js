import React, { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';

import {
	Card,
	CardsContainer,
	CardImage,
	CardFooter,
	CardName,
	CardBio,
	CardActions,
	Container,
	DefaultMsg,
	MatchBtn,
	BtnImage,
	TindevLink,
	TindevLogo
} from './styles';

import api from '../../services/api';

import dislike from '../../../assets/dislike.png';
import like from '../../../assets/like.png';
import logo from '../../../assets/logo.png';

export default function DevList({ navigation }) {

	const username = navigation.getParam('user');

	const [users, setUsers] = useState([]);

	useEffect(() => {
		const loadDevelopers = () => {
			api.get('/developers', {
				headers: { user: username }
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
	}, [username])

	function handleLike() {
		const [ user, ...rest ] = users;
		api.post(`/developers/${user.user}/like`, null, {
			headers: { user: username }
		})
		.then(response => {
			if ([200, 201].includes(response.status)) {
				setUsers(rest);
			}
		})
		.catch(err => {	});
	}

	function handleDislike() {
		const [ user, ...rest ] = users;
		api.post(`/developers/${user.user}/dislike`, null, {
			headers: { user: username }
		})
		.then(response => {
			if ([200, 201].includes(response.status)) {
				setUsers(rest);
			}
		})
		.catch(err => { })
	}

	async function handleLogout() {
		await AsyncStorage.clear();
		navigation.navigate('SignIn');
	}

	return (
		<Container>
			<TindevLink onPress={handleLogout}>
				<TindevLogo source={logo} />
			</TindevLink>
				{ users.length ? (
					<CardsContainer>
						{ users.map((dev, i) => (
							<Card key={dev.user} style={{ zIndex: users.length - i }}>
								<CardImage
									source={{ uri: dev.avatar }}
								/>
								<CardFooter>
									<CardName>{dev.name}</CardName>
									<CardBio numberOfLines={3}>{dev.bio}</CardBio>
								</CardFooter>
							</Card>
						)) }
					</CardsContainer>
				) : (
					<DefaultMsg>Acabou :(</DefaultMsg>
				) }
			<CardActions>
				<MatchBtn
				  onPress={handleDislike}
					style={{
						elevation: 2,
						shadowColor: '#000',
						shadowOpacity: 0.05,
						shadowRadius: 2,
						shadowOffset: {
							width: 0,
							height: 2
						}
					}}
				>
					<BtnImage source={dislike} />
				</MatchBtn>
				<MatchBtn
				  onPress={handleLike}
					style={{
						elevation: 2,
						shadowColor: '#000',
						shadowOpacity: 0.05,
						shadowRadius: 2,
						shadowOffset: {
							width: 0,
							height: 2
						}
					}}
				>
					<BtnImage source={like} />
				</MatchBtn>
			</CardActions>

		</Container>
	);
}
