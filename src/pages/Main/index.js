import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert, Keyboard } from 'react-native';

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
  constructor() {
    super();
    this.state = {
      newUser: '',
      users: [],
    };
  }

  handleSubmit = async () => {
    const { users, newUser } = this.state;
    try {
      const response = await api.get(`/users/${newUser}`);
      const { data } = response;
      const user = {
        name: data.name,
        login: data.login,
        bio: data.bio,
        avatar: data.avatar_url,
      };

      this.setState({ users: [...users, user], newUser: '' });

      Keyboard.dismiss();
    } catch (e) {
      Alert.alert('Error!');
    }
  };

  render() {
    const { users, newUser } = this.state;
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
          <SubmitButton onPress={this.handleSubmit}>
            <Icon name="add" color="#fff" size={20} />
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
              <ProfileButton onPress={() => {}}>
                <ProfileButtonText>See profile</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}

Main.navigationOptions = {
  title: 'Main',
};
