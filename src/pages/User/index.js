import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/api';

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
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');
    try {
      const response = await api.get(`/users/${user.login}/starred`);
      const { data } = response;
      this.setState({ stars: data });
    } catch (e) {
      Alert.alert('An error ocurred!');
    }
  }

  render() {
    const { stars } = this.state;
    return <View />;
  }
}
