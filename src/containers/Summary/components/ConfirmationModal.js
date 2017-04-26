import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { FormButton } from './../../../components/SharedStyle';
class ConfirmationModal extends Component {
  constructor(props) {
    super(props);

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.state = { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <span>
        <FormButton 
          onClick={this.open}
        >
          Confirm
        </FormButton> 

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm your request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            When you submit this test request, an invoice will be emailed to the payer if this test is privately billed.
          </Modal.Body>
          <Modal.Footer>
            <FormButton back onClick={this.close}>Cancel</FormButton>
            <FormButton type="submit" onClick={this.props.handleValidateSubmit}>
              Submit
            </FormButton>
          </Modal.Footer>
        </Modal>
      </span>
    );
  }
}

export default ConfirmationModal;
