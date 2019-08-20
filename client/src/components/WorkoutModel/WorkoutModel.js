import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";
import defaultImg from "../../assets/uploads/150.png";

class workoutModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        multerImage: defaultImg, 
        modal: false,
        imageFormObj: null
      };
  
      this.toggle = this.toggle.bind(this);
    }
   

    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }



      render() {
        return (
          <div>
            <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
              <ModalBody>
                
                 </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => {this.toggle(); this.actuallyUploadToDatabase(this.state.imageFormObj)}}>Do Something</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
      }
    }

    export default workoutModal