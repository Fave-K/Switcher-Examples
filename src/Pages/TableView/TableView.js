import React from "react";
import {
  Table,
  Header,
  Rating,
  Button,
  Container,
  Icon,
  Segment,
} from "semantic-ui-react";
import is from "is_js";
import Switcher from "../../components/Switcher";
import PropTypes from "prop-types";
import styled from "styled-components";

import EditModal from "../EditModal";

const ActionsTableCell = styled(Table.Cell)`
  &&& {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default function TableView({
  tableContent,
  deleteRecord,
  deleteRecordProcess,
}) {
  return (
    <Container fluid>
      <Switcher
        value={is.not.empty(tableContent)}
        true={
          <Table celled padded selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell singleLine>Evidence Rating</Table.HeaderCell>
                <Table.HeaderCell>Effect</Table.HeaderCell>
                <Table.HeaderCell>Efficacy</Table.HeaderCell>
                <Table.HeaderCell>Consensus</Table.HeaderCell>
                <Table.HeaderCell>Comments</Table.HeaderCell>
                <Table.HeaderCell> Actions </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {tableContent.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Header as="h2" textAlign="center">
                      {item.rating}
                    </Header>
                  </Table.Cell>
                  <Table.Cell singleLine>{item.effect}</Table.Cell>
                  <Table.Cell>
                    <Rating icon="star" rating={item.efficacy} maxRating={5} />
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {item.consensus}% <br />
                    <a href="/">{item.no_of_studies} studies</a>
                  </Table.Cell>
                  <Table.Cell>{item.comments}</Table.Cell>

                  <ActionsTableCell>
                    <EditModal content={item} />

                    <Switcher
                      value={deleteRecordProcess.recordId === item.id}
                      true={
                        <Switcher
                          value={deleteRecordProcess.status}
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
                  </ActionsTableCell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        }
        false={
          <Segment placeholder>
            <Header icon> There are no records to display. </Header>
          </Segment>
        }
      />
    </Container>
  );
}
TableView.propTypes = {
  tableContent: PropTypes.array,
  deleteRecord: PropTypes.func,
  deleteRecordProcess: PropTypes.object,
};
