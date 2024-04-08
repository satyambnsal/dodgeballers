use starknet::ContractAddress;

#[starknet::interface]
pub trait IBlobCloneNFT<TContractState> {
    fn mint(ref self: TContractState, recipient: ContractAddress) -> u256;
}


#[starknet::contract]
mod BlobCloneNFT {
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc721::ERC721Component;
    use starknet::{ContractAddress, get_caller_address};
    use openzeppelin::access::ownable::OwnableComponent;
    use openzeppelin::access::ownable::ownable::OwnableComponent::InternalTrait as OwnableInternalTrait;

    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);
    component!(path: OwnableComponent, storage: ownable, event: OwnableEvent);

    // ERC721
    #[abi(embed_v0)]
    impl ERC721Impl = ERC721Component::ERC721Impl<ContractState>;

    #[abi(embed_v0)]
    impl ERC721MetadataImpl = ERC721Component::ERC721MetadataImpl<ContractState>;

    #[abi(embed_v0)]
    impl ERC721CamelOnly = ERC721Component::ERC721CamelOnlyImpl<ContractState>;

    #[abi(embed_v0)]
    impl ERC721MetadataCamelOnly =
        ERC721Component::ERC721MetadataCamelOnlyImpl<ContractState>;

    impl ERC721InternalImpl = ERC721Component::InternalImpl<ContractState>;

    // SRC5
    #[abi(embed_v0)]
    impl SRC5Impl = SRC5Component::SRC5Impl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc721: ERC721Component::Storage,
        #[substorage(v0)]
        src5: SRC5Component::Storage,
        total_count: u32,
        owner: ContractAddress,
        #[substorage(v0)]
        ownable: OwnableComponent::Storage,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event,
        #[flat]
        OwnableEvent: OwnableComponent::Event,
    }

    mod Errors {
        pub const ONLY_OWNER: felt252 = 'Only owner can do operation';
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress) {
        let name = "BlobClone";
        let symbol = "BLOBCLONENFT";
        let base_uri = "https://api.example.com/v1/";
        let token_id = 1;
        self.ownable.initializer(owner);
        self.erc721.initializer(name, symbol, base_uri);
        self.owner.write(owner);
        self.erc721._mint(owner, token_id);
        self.total_count.write(1);
    }


    #[abi(embed_v0)]
    impl IBlobertCloneImpl of super::IBlobCloneNFT<ContractState> {
        fn mint(ref self: ContractState, recipient: ContractAddress) -> u256 {
            let token_id = self.total_count.read() + 1;
            self.total_count.write(token_id);
            self.erc721._mint(recipient, token_id.into());
            token_id.into()
        }
    }
}
