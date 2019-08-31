import React, { Component } from 'react';
import { View } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Form, Input, SubmitButton } from './styles';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      newUser: '',
      users: [],
    };
  }

  handleSubmit = () => {
    console.tron.log(this.state.newUser);
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
