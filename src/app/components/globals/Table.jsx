import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const CustomTable = (props) => {
  const { columns, rows, callbackFunction } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rows ?? []).map((row) => (
            <TableRow>
              {columns.map((column) => (
                <TableCell>{row[column.value]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
