import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";
import defaultImg from "../../assets/uploads/150.png";


class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multerImage: defaultImg, 
      modal: false,
      imageFormObj: null
    };

    this.toggle = this.toggle.bind(this);
  }
 
  setDefaultImage(uploadType) {
    if(uploadType === "multer"){
      
      this.setState({
        multerImage: defaultImg
      });
    }
  };
 

  uploadImage(e, method) {
    
    if(method ==="multer"){
      console.log(this.props)
      let imageFormObj = new FormData();

      imageFormObj.append("imageName", "multer-image-" + Date.now());
      imageFormObj.append("imageData", e.target.files[0]);
      imageFormObj.append("user", this.props.user);
    

     
      console.log(imageFormObj);

      this.setState({
        multerImage: URL.createObjectURL(e.target.files[0]),
        imageFormObj: imageFormObj
        
      }, ()=> {
        console.log(this.state.image);
      });
      

      /* this is where the photo actually gets sent to the database
      move it wherever you want it to finally upload. */
      axios.post('/api/image/uploadmulter', imageFormObj)
      .then((data)=> {
        if(data.data.success){
          alert("image has been successfully uploaded using multer");
          this.setDefaultImage("multer");
        }
      })
      .catch((err) => {
          console.log(err);
          alert("Error while uploading image using multer");
          this.setDefaultImage ("multer");
      })
     
     
    }
  };

  actuallyUploadToDatabase(image){
    console.log(image);

    

  };

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
            <div className = "process">
              <h4 className = "process__heading"> process: using Multer</h4>
              <p className = "process__details"> Upload Image to a node server, connected to a mongo db, with multer</p>
              <input type = "file" className = "process__upload-btn" onChange = {(e) => this.uploadImage(e, "multer")}/>
              <img src = {this.state.multerImage} alt= "upload-image" className = "process__image"/>
            </div>
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

export default ModalExample;