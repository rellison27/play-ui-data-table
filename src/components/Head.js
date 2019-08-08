import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableHead from "@material-ui/core/TableHead";

export default function Head() {
  return (
    <TableHead>
      <TableRow>
        <TableCell>Key</TableCell>
        <TableCell>Headline</TableCell>
        <TableCell>SubHeadline</TableCell>
        <TableCell>Start Time</TableCell>
      </TableRow>
    </TableHead>
  );
}
