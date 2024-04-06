"use client";

import { Button, Container, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
// import CupImg from "./../../../public/assets/images/cupImg.png";
import Image from "next/image.js";
import CupImg from "./../../../public/assets/images/cupImg.png";

export default function Dashboard() {
  let noOfCups = 3;

  function shuffle() {
    console.log("shuffling");
  }

  return (
    <Container className="mt-20 flex w-full">
      <div className="flex w-full flex-col items-center gap-3 p-6" id="game">
        <div className="flex items-center justify-center gap-3">
          <Image src={CupImg} alt="" width={100} height={200} />
          <Image src={CupImg} alt="" width={100} height={200} />
          <Image src={CupImg} alt="" width={100} height={200} />
          <div className="ball"></div>
        </div>

        <div id="game-result"></div>
        <div className="mt-4 text-center">
          <Button onClick={shuffle} size="4">
            Play
          </Button>
        </div>
      </div>
    </Container>
  );
}
