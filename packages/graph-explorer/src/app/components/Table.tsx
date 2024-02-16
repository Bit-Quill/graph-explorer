import {
  Box,
  Button,
  CollectionPreferences,
  Container,
  Header,
  Link,
  Pagination,
  Select,
  SpaceBetween,
  Table,
  TextFilter,
} from "@cloudscape-design/components";
import React from "react";

export default function GETable() {
  const [selectedItems, setSelectedItems] = React.useState([]);
  return (
    <Table
      onSelectionChange={({ detail }) => console.log(detail.selectedItems)}
      selectedItems={selectedItems}
      ariaLabels={{
        selectionGroupLabel: "Items selection",
        allItemsSelectionLabel: ({ selectedItems }) =>
          `${selectedItems.length} ${
            selectedItems.length === 1 ? "item" : "items"
          } selected`,
        itemSelectionLabel: ({ selectedItems }, item) => item.name,
      }}
      columnDefinitions={[
        {
          id: "variable",
          header: "Resource URI",
          cell: (item) => <Link href="#">{item.name}</Link>,
          sortingField: "name",
          isRowHeader: true,
        },
        {
          id: "value",
          header: "nep:type",
          cell: (item) => item.alt,
          sortingField: "alt",
        },
        {
          id: "type",
          header: "nep:code",
          cell: (item) => item.type,
        },
        {
          id: "description",
          header: "nep:desc",
          cell: (item) => item.description,
        },
      ]}
      columnDisplay={[
        { id: "variable", visible: true },
        { id: "value", visible: true },
        { id: "type", visible: true },
        { id: "description", visible: true },
        { id: "sendToGE", visible: true },
      ]}
      items={[
        {
          name: "Node 1",
          alt: "-",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
          type: "2A",
          size: "Large",
        },
        {
          name: "Node 2",
          alt: "Sixth",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          type: "1A",
          size: "Small",
        },
        {
          name: "Node 3",
          alt: "First",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          type: "1A",
          size: "Small",
        },
        {
          name: "Node 4",
          alt: "First",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          type: "1A",
          size: "Small",
        },
        {
          name: "Node 5",
          alt: "First",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          type: "1A",
          size: "Small",
        },
        {
          name: "Node 6",
          alt: "First",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          type: "1A",
          size: "Small",
        },
      ]}
      loadingText="Loading resources"
      selectionType="multi"
      trackBy="name"
      empty={
        <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
          <SpaceBetween size="m">
            <b>No resources</b>
            <Button>Create resource</Button>
          </SpaceBetween>
        </Box>
      }
      filter={
        <TextFilter filteringPlaceholder="Find resources" filteringText="" />
      }
      pagination={<Pagination currentPageIndex={1} pagesCount={25} />}
      preferences={
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          preferences={{
            pageSize: 10,
            contentDisplay: [
              { id: "variable", visible: true },
              { id: "value", visible: true },
              { id: "type", visible: true },
              { id: "description", visible: true },
            ],
          }}
          pageSizePreference={{
            title: "Page size",
            options: [
              { value: 10, label: "10 resources" },
              { value: 20, label: "20 resources" },
            ],
          }}
          wrapLinesPreference={{}}
          stripedRowsPreference={{}}
          contentDensityPreference={{}}
          contentDisplayPreference={{
            options: [
              {
                id: "variable",
                label: "Resource URI",
                alwaysVisible: true,
              },
              { id: "value", label: "nep:type" },
              { id: "type", label: "nep:code" },
              { id: "description", label: "nep:desc" },
            ],
          }}
          stickyColumnsPreference={{
            firstColumns: {
              title: "Stick first column(s)",
              description:
                "Keep the first column(s) visible while horizontally scrolling the table content.",
              options: [
                { label: "None", value: 0 },
                { label: "First column", value: 1 },
                { label: "First two columns", value: 2 },
              ],
            },
            lastColumns: {
              title: "Stick last column",
              description:
                "Keep the last column visible while horizontally scrolling the table content.",
              options: [
                { label: "None", value: 0 },
                { label: "Last column", value: 1 },
              ],
            },
          }}
        />
      }
    />
  );
}
