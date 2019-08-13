import React from "react";
import './style.css';
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button} from "reactstrap";


function Section (props){
    return(
        <div>
      <Card className = "card">
        <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
        <CardBody>
          <CardTitle>{props.title}</CardTitle>
          <CardSubtitle>{props.subtitle}</CardSubtitle>
          <CardText>{props.content}</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
    </div>
    )
};

export default Section;