"use client";
import * as React from "react";
import Modal from "@cloudscape-design/components/modal";
import FormField from "@cloudscape-design/components/form-field";
import Input from "@cloudscape-design/components/input";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Board from "@cloudscape-design/board-components/board";
import BoardItem from "@cloudscape-design/board-components/board-item";
import {
  CollectionPreferences,
  Container,
  ContentLayout,
  Header,
  Link,
  Pagination,
  Select,
  Table,
  TextFilter,
} from "@cloudscape-design/components";
import DataExplorer from "@/app/workspaces/DataExplorer";

export default function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const [selectedItems, setSelectedItems] = React.useState([]);
  return <DataExplorer />;
}
