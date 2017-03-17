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
    this.setState(setInvoice(this.state, JSON.parse(this.props.location.query.data)));
  }
  render(){
    return(

    <Container>
      <h3>Invoice</h3>
    </Container>
    )
  }
}

export default Invoice;