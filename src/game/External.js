import * as React from "react";
import Page from "../common/Page";
import {Col, Container, Row} from "react-bootstrap";
import PinInput from "react-pin-input";
import _ from "lodash";
import ReactMarkdown from "react-markdown";

export default class External extends React.Component {
  constructor(props) {
    super(props);
    this.state = {status: 'start'};
    this.complete = this.complete.bind(this);
  }

  complete(value) {
    const {game: {name, metadata: {codes}}, onComplete = _.noop} = this.props;
    const action = _.includes(codes, Number(value)) ? "completed" : "failed";
    onComplete(name, {action});
  }

  render() {
    const {game: {title, instruction}} = this.props;
    return (
        <Page>
          <h1>{title}</h1>
          <Container>
            <Row>
              <div>
                <h2>How to Play?</h2>
                <div className="hint">
                  <ReactMarkdown source={instruction}/>
                </div>

              </div>
              <Col md={{span: 6, offset: 3}}>
                <div className="code">
                  <PinInput length={4}
                            type="numeric"
                            ref={(ele) => {
                              if (ele) {
                                ele.clear();
                                ele.focus();
                              }
                            }}
                            onComplete={this.complete}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </Page>
    )
  }
}