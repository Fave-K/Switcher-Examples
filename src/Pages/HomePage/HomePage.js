import React, { Fragment, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  Button,
  Icon,
  Container,
  Placeholder,
  Grid,
  Segment,
  Header,
} from "semantic-ui-react";

import TableView from "../TableView";
import GridView from "../GridView";

import Switcher from "../../components/Switcher";

const BodyWrapper = styled(Container)`
  &&& {
    padding: 1em 2em;
  }
`;

const HeaderContainer = styled.div`
  padding: 1em 0em 0em 2em;
`;

const Paragraph = styled.p`
  font-size: 18px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 1em 0em 1em 2em;
`;

export default function HomePage({
  content,
  fetchContentProcess,
  retryFetchContent,
}) {
  const [view, setView] = useState("grid");

  return (
    <Container>
      <HeaderContainer>
        <h1>Switcher Examples</h1>
      </HeaderContainer>

      <Switcher
        value={fetchContentProcess.status}
        PROCESSING={
          <Grid columns={3} stackable>
            <Grid.Column>
              <Segment raised>
                <Placeholder>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length="medium" />
                    <Placeholder.Line length="short" />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Segment>
            </Grid.Column>

            <Grid.Column>
              <Segment raised>
                <Placeholder>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length="medium" />
                    <Placeholder.Line length="short" />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Segment>
            </Grid.Column>

            <Grid.Column>
              <Segment raised>
                <Placeholder>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                  <Placeholder.Paragraph>
                    <Placeholder.Line length="medium" />
                    <Placeholder.Line length="short" />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Segment>
            </Grid.Column>
          </Grid>
        }
        SUCCESS={
          <Fragment>
            <HeaderContainer>
              <Paragraph>Click below to switch views </Paragraph>
            </HeaderContainer>
            <ButtonContainer>
              <Button
                basic
                icon
                color={view === "grid" ? "grey" : "blue"}
                onClick={() => setView("table")}
              >
                <Icon name="table" />
              </Button>
              <Button
                basic
                icon
                color={view === "table" ? "grey" : "blue"}
                onClick={() => setView("grid")}
              >
                <Icon name="address card outline" />
              </Button>
            </ButtonContainer>
            <BodyWrapper fluid>
              <Switcher
                value={view}
                table={<TableView tableContent={content} />}
                grid={<GridView gridContent={content} />}
              />
            </BodyWrapper>
          </Fragment>
        }
        ERROR={
          <Segment placeholder>
            <Header icon>Failed to retrieve content!</Header>
            <Button basic primary onClick={retryFetchContent}>
              {" "}
              Retry{" "}
            </Button>
          </Segment>
        }
      />
    </Container>
  );
}

HomePage.propTypes = {
  content: PropTypes.array,
  fetchContentProcess: PropTypes.object,
  retryFetchContent: PropTypes.func,
};
