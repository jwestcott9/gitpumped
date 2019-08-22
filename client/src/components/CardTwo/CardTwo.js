import React from "react";
import {Card, CardImg, CardBody, CardText} from "reactstrap";

const fitnessCardTwo = (props) => {
    return(
        <div>
      <Card className="cardfour">
        <CardImg top width="100%" src="https://www.heart.org/idc/groups/heart-public/@wcm/@fc/documents/image/~extract/UCM_470168~2~staticrendition/large.jpg" alt="Card image cap" height="250" />
        <CardBody>
          <CardText>Eat Healthier</CardText> 
        </CardBody>
      </Card>

      <Card className="cardfive">
        <CardImg top width="100%" src="https://www.success.com/wp-content/uploads/2017/08/waystohavefunwithoutspendingmoney.jpg" alt="Card image cap" height="250" />
        <CardBody>
          <CardText>Have Fun</CardText> 
        </CardBody>
      </Card>

      <Card className="cardsix">
        <CardImg top width="100%" src="https://youngevity.ph/wp-content/uploads/2017/01/road2.jpg" alt="Card image cap" height="250" />
        <CardBody>
          <CardText>Live Better</CardText> 
        </CardBody>
      </Card>
        </div>
    )
};

export default fitnessCardTwo;