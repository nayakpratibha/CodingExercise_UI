import React, {Component} from 'react';
import PropTypes from 'prop-types';
import LoginForm from './containers/login/LoginForm';
import SearchPage from './containers/searchpage/SearchPage';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cookie: props.cookie,
            redirect: props.redirect
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit (data) {
       let { cookie, redirect } = this.state;
       if (data) {
         const cookieData = data.cookie;
         cookie.push(cookieData[0]);
         redirect = data.redirect;
       }
       this.setState({ cookie, redirect });
    }
    renderLoginForm () {
      if (this.state.redirect === false) {
        return (
        <LoginForm onEvent={this.handleSubmit} ></LoginForm>
        );
      }
    }
    renderSearchForm () {
      if (this.state.redirect) {
        const { cookie } = this.state;
        return (<SearchPage cookie={cookie}></SearchPage>);
      }
      return null;
    }

    render() {
      return (
        <div className="App">
            {this.renderLoginForm()}
            {this.renderSearchForm()}
        </div>
      );
    }
}
App.propTypes = {
    cookie: PropTypes.array,
    redirect: PropTypes.bool
};

App.defaultProps = {
    cookie: [],
    redirect: false
};

export default App;
