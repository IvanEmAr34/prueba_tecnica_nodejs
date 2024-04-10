"use client";
import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Library = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading && (
        <Box className="text-center mt-10">
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

export default Library;
