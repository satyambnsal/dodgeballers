"use client";

import { PhaserLayer } from "@/phaser/phaserLayer";
import { Container } from "@radix-ui/themes";

export default function Dashboard() {
  return (
    <Container>
      <PhaserLayer />
    </Container>
  );
}
