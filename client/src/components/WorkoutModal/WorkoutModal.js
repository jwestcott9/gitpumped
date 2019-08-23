import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class workoutModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: props.children,
      content:"hello",
    };

    this.toggle = this.toggle.bind(this);
  }
 

  toggle() {
    let x = this.props.content;
    
    console.log( x);
    this.setState(prevState => ({
      content: x,
      modal: !prevState.modal
    }));
  }
  componentDidMount(){
    console.log(this.state)
    this.setState({
      modal: this.props.modal
    }, ()=>{
      console.log(this.state)
    })
  }

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Workout Description</ModalHeader>
          <ModalBody>
           {this.state.content}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default workoutModal;