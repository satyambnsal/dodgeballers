use starknet::ContractAddress;


#[starknet::interface]
pub trait IDodgeCoach<TContractState> {
    fn throw_ball(ref self: TContractState, angle: u8, pos: u8);
    fn set_dodgecoin_address(ref self: TContractState, dodgecoin_address: ContractAddress);
    fn get_dodgecoin_address(self: @TContractState) -> ContractAddress;
}

#[starknet::contract]
mod DodgeCoach {
    use starknet::{ContractAddress, get_caller_address};
    use openzeppelin::token::erc20::interface::{IERC20Dispatcher, IERC20DispatcherTrait};
    use dodgeball::DodgeCoin::{IDodgeCoinDispatcher, IDodgeCoinDispatcherTrait};
    const FEE_RECIPIENT_ADDRESS: felt252 =
        0x041b27f006d01a9d2c468e33a05f1951b6a7cd0ac562b928a8e0728d4e5627dc;

    #[storage]
    struct Storage {
        dodgecoin_address: ContractAddress,
        owner: ContractAddress,
        fee_amount: u8
    }

    mod Errors {
        pub const ONLY_OWNER: felt252 = 'Only owner can do operation';
        pub const ONLY_BLOBERT_OWNER: felt252 = 'Only Blobert owner can do op';
        pub const ZERO_DODGECOIN: felt252 = 'Dodgecoin is zero address';
        pub const INSUFFICIENT_FUND: felt252 = 'Dodgecoin: insufficient fund';
        pub const INSUFFICIENT_APPROVAL: felt252 = 'Dodgecoin:insufficient approval';
    }

    #[constructor]
    fn constructor(ref self: ContractState, owner: ContractAddress, dodgecoin: ContractAddress) {
        self.owner.write(owner);
        self.dodgecoin_address.write(dodgecoin);
        self.fee_amount.write(5);
    }

    #[abi(embed_v0)]
    impl IDodgeCoachImpl of super::IDodgeCoach<ContractState> {
        fn set_dodgecoin_address(ref self: ContractState, dodgecoin_address: ContractAddress) {
            assert(get_caller_address() == self.owner.read(), Errors::ONLY_OWNER);
            self.dodgecoin_address.write(dodgecoin_address);
        }

        fn get_dodgecoin_address(self: @ContractState) -> ContractAddress {
            self.dodgecoin_address.read()
        }

        fn throw_ball(ref self: ContractState, angle: u8, pos: u8) {
            let caller = get_caller_address();
            let fee_amount = self.fee_amount.read();
            let dodgecoin = IERC20Dispatcher { contract_address: self.dodgecoin_address.read() };
            assert(dodgecoin.balance_of(caller) >= fee_amount.into(), Errors::INSUFFICIENT_FUND);
            assert(
                dodgecoin.allowance(caller, starknet::get_contract_address()) >= fee_amount.into(),
                Errors::INSUFFICIENT_APPROVAL
            );
            dodgecoin
                .transfer_from(
                    caller, FEE_RECIPIENT_ADDRESS.try_into().unwrap(), fee_amount.into()
                );
        //TODO Implement target accuracy calculation (logic in target_script)
        }
    }
}
