import React from 'react';
import Page from '../common/Page';
import {Col, Container, Jumbotron, Row} from 'react-bootstrap';
import {publishGameMessage} from "../lib/socket";

let timer;

export default function Game(props) {
  const {game: {Name: name, Instruction: instruction}} = props;

  clearTimeout(timer);
  timer = setTimeout(() => {
    publishGameMessage(name, {action: 'completed'});
  }, 5000);

  return (
      <Page>
        <h1>{name}</h1>
        <Container>
          <Row>
            <Col>
              <Jumbotron>
                <p>{instruction}</p>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </Page>
  );
}