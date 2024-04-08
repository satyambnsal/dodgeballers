/* eslint-disable react/no-unescaped-entities */
import { Button, Dialog, Flex } from "@radix-ui/themes";

export const GameTutorial = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Pay Entry Fees</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Ready, Aim, Dodgecoin! 🚀
        </Dialog.Description>
        <Dialog.Description size="2" mb="4">
          Each throw costs 5 Doge, Blobert! But land a bullseye and you'll reel
          in a whopping 100 Dogecoins! So sharpen your aim and get ready to swim
          in riches (or at least slightly wealthier waters).
        </Dialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" onClick={handleClose}>
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close></Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};
