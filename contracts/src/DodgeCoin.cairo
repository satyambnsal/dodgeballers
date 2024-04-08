use starknet::ContractAddress;

#[starknet::interface]
pub trait IDodgeCoin<TContractState> {
    fn mint(ref self: TContractState, recipient: ContractAddress, amount: u256);
    fn set_dodgeball_address(ref self: TContractState, dodgeball_address: ContractAddress);
    fn get_dodgeball_address(self: @TContractState) -> ContractAddress;
    fn set_dodgecoach_address(ref self: TContractState, dodgecoach_address: ContractAddress);
    fn get_dodgecoach_address(self: @TContractState) -> ContractAddress;
}


#[starknet::contract]
mod DodgeCoin {
    use openzeppelin::token::erc20::ERC20Component;
    use starknet::{ContractAddress, get_caller_address};
    use openzeppelin::token::erc20::interface;

    component!(path: ERC20Component, storage: erc20, event: ERC20Event);

    #[abi(embed_v0)]
    impl ERC20Impl = ERC20Component::ERC20Impl<ContractState>;
    #[abi(embed_v0)]
    impl ERC20CamelOnlyImpl = ERC20Component::ERC20CamelOnlyImpl<ContractState>;
    impl ERC20InternalImpl = ERC20Component::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        erc20: ERC20Component::Storage,
        decimals: u8,
        owner: ContractAddress,
        dodgeball: ContractAddress,
        dodgecoach: ContractAddress
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        ERC20Event: ERC20Component::Event
    }

    mod Errors {
        pub const ONLY_OWNER: felt252 = 'Only owner can do operation';
        pub const ONLY_BLOBERT_OWNER: felt252 = 'Only Blobert owner can do op';
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress, dodgeball: ContractAddress,) {
        // Call the internal function that writes decimals to storage
        self._set_decimals(1);

        let name = "DodgeCoin";
        let symbol = "DODGECOIN";
        self.erc20.initializer(name, symbol);
        self.erc20._mint(owner, 1000_000_00);
        self.owner.write(owner);
        self.dodgeball.write(dodgeball);
    }
    #[abi(embed_v0)]
    impl IDodgeCoinImpl of super::IDodgeCoin<ContractState> {
        fn mint(ref self: ContractState, recipient: ContractAddress, amount: u256) {
            assert(amount < 10000, 'mint amount exceeds limit');
            let caller = get_caller_address();
            assert(
                caller == self.owner.read()
                    || caller == self.dodgeball.read()
                    || caller == self.dodgecoach.read(),
                'Caller do not have access'
            );
            self.erc20._mint(recipient, amount);
        }

        fn set_dodgeball_address(ref self: ContractState, dodgeball_address: ContractAddress) {
            assert(get_caller_address() == self.owner.read(), Errors::ONLY_OWNER);
            self.dodgeball.write(dodgeball_address);
        }
        fn get_dodgeball_address(self: @ContractState) -> ContractAddress {
            self.dodgeball.read()
        }
        fn set_dodgecoach_address(ref self: ContractState, dodgecoach_address: ContractAddress) {
            assert(get_caller_address() == self.owner.read(), Errors::ONLY_OWNER);
            self.dodgecoach.write(dodgecoach_address);
        }
        fn get_dodgecoach_address(self: @ContractState) -> ContractAddress {
            self.dodgecoach.read()
        }
    }

    #[abi(embed_v0)]
    impl ERC20MetadataImpl of interface::IERC20Metadata<ContractState> {
        fn name(self: @ContractState) -> ByteArray {
            self.erc20.name()
        }

        fn symbol(self: @ContractState) -> ByteArray {
            self.erc20.symbol()
        }

        fn decimals(self: @ContractState) -> u8 {
            self.decimals.read()
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        fn _set_decimals(ref self: ContractState, decimals: u8) {
            self.decimals.write(decimals);
        }
    }
}
