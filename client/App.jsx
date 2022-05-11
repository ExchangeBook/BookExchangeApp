const React = require('react');
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//will house all the react components
import Nav from './components/Nav.jsx';
import Root from './routes/Root.jsx';
import Login from './routes/Login.jsx';
import Register from './routes/Register.jsx';
import MyPage from './routes/MyPage.jsx';
import Search from './routes/Search.jsx';
import NotFound from './routes/NotFound.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: true,
      userID: '1'
    };
  }

  render() {
    return (
      <div>
        <div className="header-container">
          <h1><a href="">The Book Exchange</a></h1>
          <hr className="bottom-hr" />
        </div>
        <Router>
          {/* NAV will always be rendered */}
          <Nav loggedIn={this.state.loggedIn} userID={this.state.userID} />
          <Routes>
            <Route path="/login" element={<Login loggedIn={this.state.loggedIn} userID={this.state.userID} />}></Route>
            <Route path="/register" element={<Register loggedIn={this.state.loggedIn} userID={this.state.userID} />}></Route>
            <Route path="/mypage" element={<MyPage loggedIn={this.state.loggedIn} userID={this.state.userID} />}></Route>
            <Route path="/search" element={<Search loggedIn={this.state.loggedIn} userID={this.state.userID} />}></Route>
            <Route path="/" element={<Root />}></Route>
            <Route path="/:id" element={<NotFound />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App;