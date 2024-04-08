/* eslint-disable react/no-unescaped-entities */
import { Button, Dialog, Flex } from "@radix-ui/themes";

export const MintDodgeBallNFTModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Hold Your Blobby Horses! 🐴</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Looks like you're bare-handed! You can't exactly dodgeball with just
          fins, can you, Blobert? Head back to the homepage and mint a Dodgeball
          NFT to unleash your inner champion!
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
