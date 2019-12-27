import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {  Table } from "react-bootstrap";

class TableCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableDataColumns: props.tableDataColumns
        };
    }

 componentWillReceiveProps(nextProps) {
     if (this.state.tableDataColumns !== nextProps.tableDataColumns) {
        this.setState({ tableDataColumns: nextProps.tableDataColumns });
     }
  }

 tableBody = () => {
    const dataColumns = this.state.tableDataColumns;
    return dataColumns.map((row) => {
        const attributes = row.attributes[0];
        const className = (attributes.value < 50) ? "red-bg" : "";
        return (
            <tr key={row.id} className={className}>
                <th>{row.username}</th>
                <th>{row.displayName}</th>
                <th>{row.status}</th>
            </tr>); 
        });
    }
  tableHeaders = () =>  {
    const dataHeader = this.props.tableDataHeader;
    return (
        <thead className="thead-light">
            <tr>
                {dataHeader.map((column) => {
                return <th scope="col" key={column.id}>{column.value}</th>; })}
            </tr>
        </thead>
    );
  }
  render(){
    return (
        <Table striped bordered hover>
            {this.tableHeaders()}
            <tbody>
             {this.tableBody()}
            </tbody>
        </Table>
    );
}
}
TableCustom.propTypes = {
    tableDataColumns: PropTypes.array,
    tableDataHeader: PropTypes.array
};

TableCustom.defaultProps = {
    tableDataColumns: [],
    tableDataHeader: []
};

export default TableCustom;
