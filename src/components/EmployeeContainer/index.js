import React, { Component } from "react";
import API from "../../utils/API";
import { Table } from "react-bootstrap";
import NavBar from "../NavBar";
import SearchForm from "../SearchForm/";
import EmployeeDetail from "../EmployeeDetail";
import moment from "moment";

export default class EmployeeContainer extends Component {
  state = {
    employees: [],
    filteredEmployees: [],
    search: "",
    sortId: 0,
    sortName: 0,
    sortPhone: 0,
    sortEmail: 0,
    sortDob: 0,
    sortAge: 0,
  };

  componentDidMount() {
    this.getEmployees();
  }

  getEmployees() {
    API.search()
      .then((res) => {
        let allEmployees = res.data.results.map((employee) => {
          return {
            image: employee.picture.thumbnail,
            name: employee.name.first + " " + employee.name.last,
            phone: employee.phone,
            email: employee.email,
            dob: moment(employee.dob.date).format("MMM Do YYYY"),
            age: moment().diff(
              moment(employee.dob.date).format("YYYY"),
              "years"
            ),
            id: employee.id.value,
          };
        });
        this.setState({
          employees: allEmployees,
          filteredEmployees: allEmployees,
        });
      })
      .catch((err) => console.log(err));
  }

  filterEmployees = (value) => {
    let filterEmployees = this.state.employees.filter((employee) => {
      if (
        employee.name.toLowerCase().includes(value.toLowerCase()) ||
        employee.phone.includes(value) ||
        employee.email.includes(value) ||
        employee.id.includes(value) ||
        employee.dob.includes(value)
      ) {
        return employee;
      }
    });
    return this.setState({
      filteredEmployees: filterEmployees,
      search: "",
    });
  };

  sortAscEmployees = (type) => {
    const field = type.slice(4).toLowerCase();
    console.log("Asc", field);
    let sortedEmployees = this.state.filteredEmployees.sort((a, b) => {
      let comparison = 0;
      if (a[field] > b[field]) {
        comparison = 1;
      } else if (a[field] < b[field]) {
        comparison = -1;
      }
      return comparison;
    });
    this.setState({
      filteredEmployees: sortedEmployees,
    });
  };

  sortDescEmployees = (type) => {
    const field = type.slice(4).toLowerCase();
    console.log("Asc", field);
    let sortedEmployees = this.state.filteredEmployees.sort((a, b) => {
      let comparison = 0;
      if (a[field] < b[field]) {
        comparison = 1;
      } else if (a[field] > b[field]) {
        comparison = -1;
      }
      return comparison;
    });
    this.setState({
      filteredEmployees: sortedEmployees,
    });
  };

  handleClearSearchSort = () => {
    this.setState({
      filteredEmployees: this.state.employees,
      sortId: 0,
      sortName: 0,
      sortPhone: 0,
      sortEmail: 0,
      sortDob: 0,
      sortAge: 0,
    });
  };

  handleSort = (event) => {
    const type = event.target.id;
    switch (this.state[type]) {
      case 0:
        this.setState({
          sortId: 0,
          sortName: 0,
          sortPhone: 0,
          sortEmail: 0,
          sortDob: 0,
          sortAge: 0,
        });
        this.setState({
          [type]: 1,
        });
        this.sortAscEmployees(type);
        break;
      case 1:
        this.setState({
          sortId: 0,
          sortName: 0,
          sortPhone: 0,
          sortEmail: 0,
          sortDob: 0,
          sortAge: 0,
        });
        this.setState({
          [type]: 2,
        });
        this.sortDescEmployees(type);
        break;
      case 2:
        this.setState({
          sortId: 0,
          sortName: 0,
          sortPhone: 0,
          sortEmail: 0,
          sortDob: 0,
          sortAge: 0,
        });
        this.setState({
          [type]: 1,
        });
        this.sortAscEmployees(type);
        break;
      default:
        break;
    }
  };

  handleInputChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.filterEmployees(this.state.search);
  };

  render() {
    return (
      <div className="wrapper">
        <NavBar>
          <SearchForm
            value={this.state.search}
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
            handleClearSearchSort={this.handleClearSearchSort}
          />
        </NavBar>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th scope="col">
                <span className="mr-2">Id#</span>
                <i
                  id="sortId"
                  className={
                    this.state.sortId === 0
                      ? "fas fa-sort ml-6"
                      : this.state.sortId === 1
                      ? "fas fa-sort-up ml-6"
                      : "fas fa-sort-down ml-6"
                  }
                  onClick={this.handleSort}
                ></i>
              </th>
              <th scope="col">Picture</th>
              <th scope="col">
                <span className="mr-2">Name</span>
                <i
                  id="sortName"
                  className={
                    this.state.sortName === 0
                      ? "fas fa-sort ml-6"
                      : this.state.sortName === 1
                      ? "fas fa-sort-up ml-6"
                      : "fas fa-sort-down ml-6"
                  }
                  onClick={this.handleSort}
                ></i>
              </th>
              <th scope="col">
                <span className="mr-2">Phone</span>
                <i
                  id="sortPhone"
                  className={
                    this.state.sortPhone === 0
                      ? "fas fa-sort ml-6"
                      : this.state.sortPhone === 1
                      ? "fas fa-sort-up ml-6"
                      : "fas fa-sort-down ml-6"
                  }
                  onClick={this.handleSort}
                ></i>
              </th>
              <th scope="col">
                <span className="mr-2">Email</span>
                <i
                  id="sortEmail"
                  className={
                    this.state.sortEmail === 0
                      ? "fas fa-sort ml-6"
                      : this.state.sortEmail === 1
                      ? "fas fa-sort-up ml-6"
                      : "fas fa-sort-down ml-6"
                  }
                  onClick={this.handleSort}
                ></i>
              </th>
              <th scope="col">
                <span className="mr-2">DOB</span>
                <i
                  id="sortDob"
                  className={
                    this.state.sortDob === 0
                      ? "fas fa-sort ml-6"
                      : this.state.sortDob === 1
                      ? "fas fa-sort-up ml-6"
                      : "fas fa-sort-down ml-6"
                  }
                  onClick={this.handleSort}
                ></i>
              </th>
              <th scope="col">
                <span className="mr-2">Age</span>
                <i
                  id="sortAge"
                  className={
                    this.state.sortAge === 0
                      ? "fas fa-sort ml-6"
                      : this.state.sortAge === 1
                      ? "fas fa-sort-up ml-6"
                      : "fas fa-sort-down ml-6"
                  }
                  onClick={this.handleSort}
                ></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.filteredEmployees.map((employee) => (
              <EmployeeDetail
                key={employee.id}
                id={employee.id}
                name={employee.name}
                image={employee.image}
                phone={employee.phone}
                email={employee.email}
                age={employee.age}
                dob={employee.dob}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
