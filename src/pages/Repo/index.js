import React, { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import WebView from 'react-native-webview';

export default class Repo extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('repo').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  render() {
    const { navigation } = this.props;
    const uri = navigation.getParam('repo').html_url;
    const { loading } = this.state;
    return (
      <>
        {loading && <ActivityIndicator />}
        <WebView
          source={{ uri }}
          onLoadStart={() => this.setState({ loading: true })}
          onLoadEnd={() => this.setState({ loading: false })}
        />
      </>
    );
  }
}
