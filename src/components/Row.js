import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export default function Row({ id, headline, subHeadline, startTime }) {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      <TableCell>{headline}</TableCell>
      <TableCell>{subHeadline}</TableCell>
      <TableCell>{startTime}</TableCell>
    </TableRow>
  );
}
