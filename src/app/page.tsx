"use client";

import { Box } from "theme-ui";
import CardSearch from "./_card-search";

export default function Home() {
  return (
    <Box
      as="main"
      sx={{
        padding: 0,
      }}
    >
      <CardSearch />
    </Box>
  );
}
