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
          Dear Blobert, Welcome to Dodgeball game!
        </Dialog.Description>
        <Dialog.Description size="2" mb="4">
          Every through costs 5 Dodgecoin. You get 1000 Dodgecoin upon mint
          time. If you hit the mark, you get 10 dodgecoin!
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
