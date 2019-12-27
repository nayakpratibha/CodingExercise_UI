import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Container, Card, Row, Form, Button, Col } from 'react-bootstrap';
import TableCustom  from "../table/Table";
import TableJson from "./table";
import axios from 'axios';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: props.searchInput,
            showSearchResults: false,
            cookie: props.cookie,
            tableColumns: []
        };
    }
    onSearchInputChange = (e) => {
        let { searchInput } = this.state;
        searchInput = e.target.value;
        this.setState(
            {
                searchInput
            }
        )
      }

      onSearch = (e) => {
        e.preventDefault()
        let { searchInput , cookie, showSearchResults } = this.state;
        showSearchResults = false;
        const tableColumns = [];
        let cookieData = cookie[0].split(";");
        cookie = cookieData[0];
        const params = {
            searchInput: searchInput,
            cookie
        };
        axios.get('http://localhost:8080/search', { params })
            .then((response) => {
                console.log(response);
                if (response.data) {
                     tableColumns.push(response.data);
                     showSearchResults = true;
                }
                this.setState({ showSearchResults, tableColumns : tableColumns });
            })
            .catch((error) => {
                console.log(error);
            });      }
      renderTable () {
          if (this.state.showSearchResults) {  
            const tableHeader = TableJson["tableHeader"];
            const tableColumns = this.state.tableColumns[0];
              return (
                <Card className="shadow table-card">
                    <Row className="table-section">
                    <Card.Body>
                    <Card.Title>SEARCH RESULT FOR:  {this.state.searchInput}</Card.Title>
                    <Card.Text>
                        USERS
                    </Card.Text>
                        <TableCustom tableDataHeader={tableHeader} tableDataColumns={tableColumns}></TableCustom>
                    </Card.Body>
                    </Row>
                </Card>
              );
          }
          return null;
      }

    render() {
        return (
            <Container className="mt--7 App-header" fluid>
                <Card className="shadow search-card">
                    <Row className="search-section">
                        <Col className="column-one" xs="6">
                            <Form.Label>Search User</Form.Label>
                            <Form.Control type="text" placeholder="" name="searchItems" title="serachItems" onChange={e => this.onSearchInputChange(e) }/>
                        </Col>
                        <Col className="column-two" xs="6">
                            <Button className="search-button" variant="secondary" size="sm" type="submit" onClick={e => this.onSearch(e) }>
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Card>
                {this.renderTable()}
            </Container>
        );
    }
}
LoginForm.propTypes = {
    searchInput: PropTypes.string,
    cookie: PropTypes.array
};

LoginForm.defaultProps = {
    searchInput: '',
    cookie: []
};

export default LoginForm;
