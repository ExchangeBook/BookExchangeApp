const React = require('react');

class Login extends React.Component {

  login = (e) => {
    return;
  }

  render() {
    return (
      <div className="usercred-box">
        <div className="usercred-title">Book Exchange</div>
        <form className="usercred-form">
          <input type="text" placeholder="username" name="username" required />
          <input type="password" placeholder="password" name="password" required />
          <input type="submit" value="Log in" />
        </form>
      </div>
    )
  }
}

export default Login;








