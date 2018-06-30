/**
 * Copyright Yafei Hu
 */

import React, { Component } from 'react'
import { getRequests } from './Api'
import './Requests.css'

export default class Requests extends Component{
  constructor(props) {
    super(props);

    this.state = {
      requests: [],
      requestsToShow: []
    };
  }

  componentDidMount() {
    getRequests().then(data => {
      data = data.sort((a, b) => {
        return Date.parse(b.updated_at) - Date.parse(a.updated_at);
      })
      this.setState({ 
        requests: data,
        requestsToShow: data
      })
    })
  }

  deleteRequest = title => {
    this.setState({
      requests: this.state.requests.filter(el => el.title !== title),
      requestsToShow: this.state.requestsToShow.filter(el => el.title !== title)
    })
  }

  filterRequests = e => {
    let condition = e.target.value
    if(condition !== 'All'){
      this.setState({
        requestsToShow: this.state.requests.filter(el => el.status === condition)
      })
    }else{
      this.setState({
        requestsToShow: this.state.requests
      })
    }
  }

  changeStatus = (request, e) => {
    let data = this.state.requestsToShow.map(req => {
      if (req.title === request.title){
        req.status = e.target.value
      }
      return req
    })
    this.setState({
      requests: data,
      requestsToShow: data
    })
  }

  render(){
    let users = this.state.requestsToShow.map(req => {
      return (<Request request={req} deleteRequest={this.deleteRequest}/>)
    });
    return (
      <div className="container">
        <header>Request</header>
        <div id="filter">
          <label>Filter by status</label>
          <select id="dropdown" onChange={e => { this.filterRequests(e) }}>
            <option value='All'>All requests</option>
            <option value='Approved'>Approved</option>
            <option value='Pending'>Pending</option>
            <option value='Denied'>Denied</option>
          </select>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users}
          </tbody>
        </table>
      </div>
    );
  }
}

class Request extends Component {
  normalizeDate = date => date.substring(0, 10);

  render() {
    let buttonList = ["Approved", "Denied", "Pending"]
    let bottons = buttonList.map(button => {
      return (<button value={button}>{button}</button>)
    });

    return (
      <tr key={this.props.request.id} className={this.props.request.status}>
        <td>{this.props.request.title}</td>
        <td>
          {this.props.request.status}
          <div id="popup">
            {bottons}
          </div>
        </td>
        <td>{this.normalizeDate(this.props.request.created_at)}</td>
        <td>{this.normalizeDate(this.props.request.updated_at)}</td>
        <td onClick={() => this.props.deleteRequest(this.props.request.title)}>Delete</td>
      </tr>
    );
  }
}
