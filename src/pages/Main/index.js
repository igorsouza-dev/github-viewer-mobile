import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Alert, Keyboard } from 'react-native';

import api from '../../services/api';

import { Container, Form, Input, SubmitButton } from './styles';

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
        avatar: data.avatar,
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
      </Container>
    );
  }
}

Main.navigationOptions = {
  title: 'Main',
};
