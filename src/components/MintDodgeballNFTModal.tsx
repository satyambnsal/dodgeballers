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
        <Dialog.Title>Pay Entry Fees</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Dear Blobert, You need to own a Dodgeball NFT to play this game. You
          can mint a NFT from Home page.
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
