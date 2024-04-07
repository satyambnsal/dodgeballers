use starknet::ContractAddress;

#[starknet::interface]
pub trait IDodgeBallNFT<TContractState> {
    fn mint(ref self: TContractState, recipient: ContractAddress) -> u256;
    fn set_base_uri(ref self: TContractState, base_uri: ByteArray);
    fn set_blobert_address(ref self: TContractState, blobert_address: ContractAddress);
    fn get_blobert_address(self: @TContractState) -> ContractAddress;
}


#[starknet::contract]
mod DodgeBallNFT {
    use openzeppelin::introspection::src5::SRC5Component;
    use openzeppelin::token::erc721::ERC721Component;
    use starknet::{ContractAddress, get_caller_address};
    use openzeppelin::token::erc721::interface::{IERC721Dispatcher, IERC721DispatcherTrait};

    component!(path: ERC721Component, storage: erc721, event: ERC721Event);
    component!(path: SRC5Component, storage: src5, event: SRC5Event);

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
        blobert_address: ContractAddress
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC721Event: ERC721Component::Event,
        #[flat]
        SRC5Event: SRC5Component::Event
    }

    mod Errors {
        pub const ONLY_OWNER: felt252 = 'Only owner can do operation';
        pub const ONLY_BLOBERT_OWNER: felt252 = 'Only Blobert owner can do op';
    }

    #[constructor]
    fn constructor(
        ref self: ContractState, owner: ContractAddress, blobert_address: ContractAddress
    ) {
        let name = "DodgeBall";
        let symbol = "DODGEBALL";
        let base_uri = "https://api.example.com/v1/";
        let token_id = 1;

        self.erc721.initializer(name, symbol, base_uri);
        self.owner.write(owner);
        self.blobert_address.write(blobert_address);
        self.erc721._mint(owner, token_id);
        self.total_count.write(1);
    }


    #[abi(embed_v0)]
    impl IDodgeBallNFTImpl of super::IDodgeBallNFT<ContractState> {
        fn set_blobert_address(ref self: ContractState, blobert_address: ContractAddress) {
            assert(get_caller_address() == self.owner.read(), Errors::ONLY_OWNER);
            self.blobert_address.write(blobert_address);
        }

        fn get_blobert_address(self: @ContractState) -> ContractAddress {
            self.blobert_address.read()
        }

        fn mint(ref self: ContractState, recipient: ContractAddress) -> u256 {
            let blobert_token = IERC721Dispatcher { contract_address: self.blobert_address.read() };
            assert(blobert_token.balance_of(recipient) > 0, Errors::ONLY_BLOBERT_OWNER);

            // assert(get_caller_address() == self.owner.read(), Errors::ONLY_OWNER);
            let token_id = self.total_count.read() + 1;
            self.erc721._mint(recipient, token_id.into());
            token_id.into()
        }
        fn set_base_uri(ref self: ContractState, base_uri: ByteArray) {
            assert(get_caller_address() == self.owner.read(), Errors::ONLY_OWNER);
            self.erc721._set_base_uri(base_uri);
        }
    }
}
