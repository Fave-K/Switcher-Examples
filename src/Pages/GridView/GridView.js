import React from "react";
import {
  Icon,
  Container,
  Rating,
  Button,
  Segment,
  Header,
} from "semantic-ui-react";
import is from "is_js";
import styled from "styled-components";
import PropTypes from "prop-types";
import Switcher from "../../components/Switcher";

import EditModal from "../EditModal";

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Card = styled.div`
  flex: 0 1 300px;
  margin: 5px;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
  padding: 1em;
`;

export default function GridView({
  gridContent,
  deleteRecord,
  deleteRecordProcess,
}) {
  return (
    <Container fluid>
      <Switcher
        value={is.not.empty(gridContent)}
        true={
          <CardContainer>
            {gridContent.map((item, index) => (
              <Card key={index}>
                <div>
                  <h3>Sample Study</h3>
                  <label>Rating - {item.rating} </label>
                </div>

                <div>
                  <EditModal content={item} />
                  <Switcher
                    value={deleteRecordProcess.recordId === item.id}
                    true={
                      <Switcher
                        value={deleteRecordProcess.status}
                        IDLE={
                          <Button
                            basic
                            size="mini"
                            color="blue"
                            icon
                            onClick={() => deleteRecord(item.id)}
                          >
                            <Icon name="trash" />
                          </Button>
                        }
                        PROCESSING={
                          <Button basic primary loading icon size="mini">
                            {" "}
                            <Icon name="trash" />{" "}
                          </Button>
                        }
                        SUCCESS={
                          <Button positive basic icon size="mini">
                            {" "}
                            <Icon name="check" />{" "}
                          </Button>
                        }
                        ERROR={
                          <Button
                            negative
                            basic
                            icon
                            size="mini"
                            onClick={() => deleteRecord(item.id)}
                          >
                            {" "}
                            <Icon name="redo" />{" "}
                          </Button>
                        }
                      />
                    }
                    false={
                      <Button
                        basic
                        size="mini"
                        color="blue"
                        icon
                        onClick={() => deleteRecord(item.id)}
                      >
                        <Icon name="trash" />
                      </Button>
                    }
                  />

                  <h4>{item.effect} </h4>
                  <p>{item.comments}</p>
                  <div>
                    <Rating icon="star" rating={item.efficacy} maxRating={5} />
                  </div>
                </div>

                <div>
                  <p>
                    <Icon name="user" /> {item.consensus}% of{" "}
                    {item.no_of_studies} studies
                  </p>
                </div>
                <div></div>
              </Card>
            ))}
          </CardContainer>
        }
        false={
          <Segment placeholder>
            <Header icon> There are no records to display... </Header>
          </Segment>
        }
      />
    </Container>
  );
}
GridView.propTypes = {
  gridContent: PropTypes.array,
  deleteRecord: PropTypes.func,
  deleteRecordProcess: PropTypes.object,
};
