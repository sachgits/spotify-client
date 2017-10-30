import React, { Component } from 'react';
import styled from 'styled-components';
import { searchSongs } from '../../services/spotify';
import Input from '../ui/styled/Input';

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default class SearchBar extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: null
    };
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const { value } = this.state;
    this.setState({ value: '' });
    if (value && value.length > 0) {
      this.props.onSubmit(value);
    }
  }

  render() {
    return (
      <div>
      <Form onSubmit={this.handleSubmit}>
        <Input
          type="text"
          placeholder="search: Bohemian Rhapsody"
          onChange={this.handleChange}/>
      </Form>
    </div>
    )
  }
}
