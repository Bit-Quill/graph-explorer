"use client";
import * as React from "react";
import Modal from "@cloudscape-design/components/modal";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import {
  Badge,
  Checkbox,
  ColumnLayout,
  Container,
  ExpandableSection,
  Header,
  Icon,
  Link,
  Select,
  Textarea,
  Tiles,
  Toggle,
} from "@cloudscape-design/components";

import { StoreContext } from "./StoreProvider";

function DisplayConnections() {
  const { isDarkMode } = React.useContext(StoreContext);
  const [visible, setVisible] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [connections, setConnections] = React.useState([
    {
      name: `Connection (2024-01-05 14:08)`,
      url: "https://localhost",
      type: "Gremlin - (PG)",
      isActive: true,
    },
    {
      name: `Connection (2024-01-11 14:08)`,
      url: "https://localhost",
      type: "OpenCypher - (PG)",
      isActive: false,
    },
    {
      name: `Connection (2024-01-12 14:08)`,
      url: "https://localhost",
      type: "SPARQL - (RDF)",
      isActive: false,
    },
  ]);

  return (
    <Container fitHeight>
      <ColumnLayout columns={2}>
        <SpaceBetween size="m">
          <Header
            variant="h2"
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button onClick={() => console.log("upload")}>
                  <Icon name="upload" />
                </Button>
                <Button onClick={() => setVisible(true)}>
                  <Icon name="add-plus" /> New Connection
                </Button>
              </SpaceBetween>
            }
          >
            Available connections
          </Header>
          {connections.map((it) => (
            <Container
              key={Math.random()}
              header={
                <Header
                  variant="h3"
                  description="Connection Comments"
                  actions={
                    <SpaceBetween direction="horizontal" size="xs">
                      <Badge color="blue">{it.type}</Badge>
                      <Toggle
                        onChange={() => setCount((c) => c + 1)}
                        checked={it.isActive}
                      >
                        {it.isActive ? "Active" : "Inactive"}
                      </Toggle>
                    </SpaceBetween>
                  }
                >
                  {it.name}
                </Header>
              }
            >
              <Box variant="p">
                <Link>{it.url}</Link>
              </Box>
            </Container>
          ))}
        </SpaceBetween>
        <div>
          <ColumnLayout>
            <Container
              header={
                <Header variant="h2">Connection (2024-01-05 14:08)</Header>
              }
            >
              <SpaceBetween size="xs">
                <Box variant="awsui-key-label">Type</Box>
                <Box variant="p">Gremlin - (PG)</Box>
              </SpaceBetween>
              <SpaceBetween size="xs">
                <Box variant="awsui-key-label">URL</Box>
                <Box variant="small">
                  <Link>https://localhost</Link>
                </Box>
              </SpaceBetween>
            </Container>
            <SpaceBetween size="m">
              <Box textAlign="center">
                <Box variant="p">
                  <Badge color="red">Not Synchronized</Badge>
                </Box>
                <Box variant="strong">Synchronization Required</Box>
                <Box variant="p">
                  It is necessary to synchronize the connection to be able to
                  work with the database.
                </Box>
                <Button href="/data-explorer/connect" variant="link">
                  Start synchronization
                </Button>
              </Box>
            </SpaceBetween>
          </ColumnLayout>
        </div>
        <Modal
          onDismiss={() => setVisible(false)}
          visible={visible}
          footer={
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
                <Button onClick={() => setVisible(false)} variant="link">
                  Cancel
                </Button>
                <Button variant="primary">Create Connection</Button>
              </SpaceBetween>
            </Box>
          }
          header="Add New Connection"
        >
          <SpaceBetween direction="vertical" size="m">
            <FormField stretch={true} label="Name">
              <Input value="Connection" />
            </FormField>
            <FormField stretch={true} label="Graph Connection URL">
              <Textarea
                onChange={({ detail }) => console.log(detail.value)}
                value={""}
                placeholder="https://neptune.aws.com:8182"
              />
            </FormField>
            <FormField stretch={true} label="Graph Type">
              <Tiles
                onChange={({ detail }) => console.log(detail.value)}
                value={"item1"}
                items={[
                  {
                    label: "Gremlin - (PG)",
                    value: "item1",
                  },
                  {
                    label: "OpenCypher - (PG)",
                    value: "item2",
                  },
                  {
                    label: "SPARQL - (RDF)",
                    value: "item3",
                  },
                ]}
              />
            </FormField>
            <FormField stretch={true} label="Service Type">
              <Select
                selectedOption={{
                  label: "neptune-db",
                  value: "1",
                }}
                onChange={({ detail }) => console.log(detail.selectedOption)}
                options={[
                  { label: "neptune-db", value: "1" },
                  { label: "neptune-graph", value: "2" },
                ]}
              />
            </FormField>
            <FormField stretch={true}>
              <Checkbox
                onChange={({ detail }) => console.log(detail.checked)}
                checked={false}
              >
                AWS IAM Auth Enabled
              </Checkbox>
            </FormField>

            <FormField stretch={true}>
              <Checkbox
                onChange={({ detail }) => console.log(detail.checked)}
                checked={false}
              >
                Enable Fetch Timeout
              </Checkbox>
            </FormField>
            <FormField label="Comment">
              <Textarea
                value={"this is a comment"}
                onChange={({ detail }) => console.log(detail.value)}
              />
            </FormField>
            <ExpandableSection headerText="Additional Settings">
              this will be the additional settings
            </ExpandableSection>
          </SpaceBetween>
        </Modal>
      </ColumnLayout>
    </Container>
  );
}

export default DisplayConnections;
