import React from "react";
import './style.css';
import {Card, CardImg, CardBody, CardText} from "reactstrap";


const fitnessCard = (props) => {
    return(
        <div>
          
      <Card className = "cardone">
        <CardImg  top width="100%" src="https://media.self.com/photos/5b52046f18a2407a16eba501/4:3/w_728,c_limit/woman-lifting-dumbbells.jpg" alt="Card image cap" />
        <CardBody>
          <CardText>Maintain Weight</CardText> 
        </CardBody>
      </Card>

      <Card className = "cardtwo">
        <CardImg top width="100%" src="https://www.mensjournal.com/wp-content/uploads/mf/_main_liftlift.jpg?w=1200&h=1200&crop=1" alt="Card image cap" />
        <CardBody>
          <CardText>Gain Weight</CardText> 
        </CardBody>
      </Card>

      <Card className="cardthree">
        <CardImg top width="100%" src="https://www.mensjournal.com/wp-content/uploads/mf/cardio-builds-muscle-main.jpg?w=1200&h=675&crop=1" alt="Card image cap" />
        <CardBody>
          <CardText>Cardio</CardText> 
        </CardBody>
      </Card>

      <Card className="cardfour">
        <CardImg top width="100%" src="https://www.heart.org/idc/groups/heart-public/@wcm/@fc/documents/image/~extract/UCM_470168~2~staticrendition/large.jpg" alt="Card image cap" />
        <CardBody>
          <CardText>Eat Healthier</CardText> 
        </CardBody>
      </Card>

      <Card className="cardfive">
        <CardImg top width="100%" src="https://www.success.com/wp-content/uploads/2017/08/waystohavefunwithoutspendingmoney.jpg" alt="Card image cap" />
        <CardBody>
          <CardText>Have Fun</CardText> 
        </CardBody>
      </Card>

      <Card className="cardsix">
        <CardImg top width="100%" src="https://youngevity.ph/wp-content/uploads/2017/01/road2.jpg" alt="Card image cap" />
        <CardBody>
          <CardText>Live Better</CardText> 
        </CardBody>
      </Card>
      
    </div>
    )
};

export default fitnessCard;