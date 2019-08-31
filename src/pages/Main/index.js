import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert, Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default class Main extends Component {
  static navigationOptions = {
    title: 'Users',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  constructor() {
    super();
    this.state = {
      newUser: '',
      users: [],
      loading: false,
    };
  }

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');
    if (users) {
      this.setState({ users: JSON.parse(users) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;
    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleSubmit = async () => {
    const { users, newUser } = this.state;
    this.setState({ loading: true });
    try {
      const response = await api.get(`/users/${newUser}`);
      const { data } = response;
      const user = {
        name: data.name,
        login: data.login,
        bio: data.bio,
        avatar: data.avatar_url,
      };

      this.setState({ users: [...users, user], newUser: '', loading: false });

      Keyboard.dismiss();
    } catch (e) {
      if (e.response) {
        if (e.response.status === 404) {
          Alert.alert('User does not exists!');
        }
      }
      this.setState({ loading: false });
    }
  };

  handleNavigate = user => {
    const { navigation } = this.props;

    navigation.navigate('User', { user });
  };

  render() {
    const { users, newUser, loading } = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="User"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleSubmit}
          />
          <SubmitButton loading={loading} onPress={this.handleSubmit}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" color="#fff" size={20} />
            )}
          </SubmitButton>
        </Form>
        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>See profile</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
