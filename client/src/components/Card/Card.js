import React from "react";
import './style.css';
import {Card, CardImg, CardBody, CardText} from "reactstrap";


const fitnessCard = (props) => {
    return(
        <div>
          
      <Card className = "cardone">
        <CardImg  top width="100%" src="https://media.self.com/photos/5b52046f18a2407a16eba501/4:3/w_728,c_limit/woman-lifting-dumbbells.jpg" alt="Card image cap" height="250"/>
        <CardBody>
          <CardText>Maintain Weight</CardText> 
        </CardBody>
      </Card>

      <Card className = "cardtwo">
        <CardImg top width="100%" src="https://www.mensjournal.com/wp-content/uploads/mf/_main_liftlift.jpg?w=1200&h=1200&crop=1" alt="Card image cap" height="250" />
        <CardBody>
          <CardText>Gain Weight</CardText> 
        </CardBody>
      </Card>

      <Card className="cardthree">
        <CardImg top width="100%" src="https://www.mensjournal.com/wp-content/uploads/mf/cardio-builds-muscle-main.jpg?w=1200&h=675&crop=1" alt="Card image cap" height="250" />
        <CardBody>
          <CardText>Cardio</CardText> 
        </CardBody>
      </Card>

    </div>
    )
};

export default fitnessCard;