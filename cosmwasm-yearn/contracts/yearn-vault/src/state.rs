use cw_storage_plus::Item;

// we are storing token contract address supported by vault contract in SUPPORTED_TOKEN.
pub const SUPPORTED_TOKEN: Item<String> = Item::new("supported_token_address");

// we are storing vtoken contract address 
pub const VTOKEN: Item<String> = Item::new("vtoken_contract");