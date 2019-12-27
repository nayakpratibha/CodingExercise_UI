import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Card, Container } from 'react-bootstrap';
import axios from 'axios';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            password: props.password,
            showError: false,
        };
    }

    onUserNameChange = (e) => {
        let { username } = this.state;
        username = e.target.value;
        this.setState(
            {
                username
            }
        )
      }

      onPasswordChange = (e) => {
        let { password } = this.state;
        password = e.target.value;
        this.setState(
            {
                password
            }
        )
      }

      handleSubmit = (e) => {
        e.preventDefault();
        const { password , username} = this.state;
        const payload = {
            username,
            credential: password
        };
        axios.post('http://localhost:8080/create', payload)
            .then((response) => {
                 const responseData = JSON.stringify(response.data.headers);
                if(responseData) {
                    let headersData = JSON.parse(responseData);
                    headersData = headersData.replace(/set-cookie/, "cookie");
                    let headers = JSON.parse(headersData);
                    console.log(headers);          
                    this.props.onEvent({ cookie: headers.cookie, redirect: true});
                } else {
                    this.setState({ showError: true });
                }
            })
            .catch((error) => {
                console.log(error); // error response not valid format
                this.setState({ showError: true });
            });
      }
      renderError = () => {
          const { showError } = this.state;
          if (!showError) {
              return null;
          }
          return (
             <Form.Text className="error-text">Please contact the System Administrator at extension 1001 to create a new Login or reset your password.</Form.Text>
          )
      }

    render() {
        return (
            <Container className="mt--7 login-header" fluid>
                <Card className="shadow form-card">
                    <Form id="form-div" className="form-header">
                        <Form.Text className="login-text">Login</Form.Text>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Username" name="username1" title="user-name" onChange={e => this.onUserNameChange(e) }/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" name="password1" title="password1" onChange={e => this.onPasswordChange(e) }/>
                        </Form.Group>

                        <Button className="form-button" variant="dark" size="lg" type="submit" onClick={e => this.handleSubmit(e) }>
                            Login
                        </Button>
                    </Form>
                    <hr className="horizontal-cls"></hr>
                    {this.renderError()}
                </Card>
            </Container>
        );
    }
}
LoginForm.propTypes = {
    username: PropTypes.string,
    password: PropTypes.string,
    onEvent: PropTypes.func
};

LoginForm.defaultProps = {
    username: '',
    password: '',
    onEvent: () => {}
};

export default LoginForm;
