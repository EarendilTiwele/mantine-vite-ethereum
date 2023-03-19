import { useState } from "react";
import { Container, SimpleGrid, Skeleton, Grid, rem, useMantineTheme } from "@mantine/core";
import "./App.css";

const PRIMARY_COL_HEIGHT = rem(300);

function App() {
  const [count, setCount] = useState(0);
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;
  return (
    <Container my="md">
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
        <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
      </SimpleGrid>
      <Skeleton height={100} mt="md" radius="md" animate={false} />
    </Container>
  );
}

export default App;
