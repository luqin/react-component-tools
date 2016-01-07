import React from 'react';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
  }

  handleLogin() {
    let data = {
      username: this.ref.username.value,
      pwd: this.ref.pwd.value,
    };
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleLogin}>
          <input ref="username" type="text" name="username"/>
          <input ref="pwd" type="password" name="pwd"/>
          <input type="submit"/>
        </form>
      </div>
    );
  }
}

export default Login;
