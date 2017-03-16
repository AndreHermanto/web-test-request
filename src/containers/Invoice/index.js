import React, { Component } from 'react';
import styled from 'styled-components';
import { 
  initialState,
  setInvoice 
} from './reducer';

const Container = styled.div`

`;

/**
 * Invoice page
 */
class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidMount(){
    this.setState(setInvoice(this.state, this.props.location.query));
  }
  render(){
    return(

    <Container>
      <h3>Invoice</h3>
      <p>{this.state.invoice}</p>
    </Container>
    )
  }
}

export default Invoice;