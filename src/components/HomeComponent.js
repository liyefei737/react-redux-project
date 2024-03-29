import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";
import { Loading } from "./LoadingComponent";
import { baseUrl } from '../shared/config'
import { FadeTransform } from 'react-animation-components';

function RenderCard({ item, isLoading, errMess }) {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  }

  if (!item){
    return (<div></div>);
  }

  return (
    <FadeTransform
        in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
      <Card>
        <CardImg src={ baseUrl + item.image} alt={item.name} />
        <CardBody>
          <CardTitle>{item.name}</CardTitle>
          {item.designation ? (
            <CardSubtitle>{item.designation}</CardSubtitle>
          ) : null}
          <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  );
}

function Home(props) {
  return (
    <div className="container">
      <div className="row align-items-start">
        <div className="col-12 col-md m-1">
          <RenderCard
            item={props.dish}
            isLoading={props.dishesLoading}
            errMssg={props.errMssg}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={props.promotion}
          isLoading={props.promosLoading}
          errMssg={props.promosErrMssg} />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard item={props.leader}
            isLoading={props.leadersLoading}
            errMssg={props.leadersErrMssg} />
        </div>
      </div>
    </div>
  );
}

export default Home;
