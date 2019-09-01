import React, { Component } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Bio,
  Name,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  constructor() {
    super();
    this.state = {
      stars: [],
      loading: false,
      page: 1,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.loadStars();
  }

  getUser = () => {
    const { navigation } = this.props;

    const user = navigation.getParam('user');
    return user;
  };

  loadStars = async () => {
    const user = this.getUser();
    const { page } = this.state;
    try {
      this.setState({ loading: true });
      const response = await api.get(`/users/${user.login}/starred`, {
        params: {
          page,
        },
      });
      const { data } = response;

      this.setState({ stars: data, loading: false });
    } catch (e) {
      Alert.alert('An error ocurred!');
      this.setState({ loading: false });
    }
  };

  loadMore = async () => {
    const { page, stars } = this.state;
    const user = this.getUser();
    const p = page + 1;
    await this.setState({ page: p, loading: true });
    try {
      const response = await api.get(`/users/${user.login}/starred`, {
        params: {
          page: p,
        },
      });
      const { data } = response;
      this.setState({ stars: [...stars, ...data], loading: false });
    } catch (e) {
      Alert.alert('An error ocurred!');
      this.setState({ loading: true });
    }
  };

  refresh = async () => {
    await this.setState({ page: 1 });
    this.loadStars();
  };

  render() {
    const { stars, loading, refreshing } = this.state;
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading && <ActivityIndicator />}
        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          onEndReachedThreshold={0.2}
          onEndReached={this.loadMore}
          onRefresh={this.refresh}
          refreshing={refreshing}
          renderItem={({ item }) => (
            <Starred>
              <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
              <Info>
                <Title>{item.name}</Title>
                <Author>{item.owner.login}</Author>
              </Info>
            </Starred>
          )}
        />
      </Container>
    );
  }
}
