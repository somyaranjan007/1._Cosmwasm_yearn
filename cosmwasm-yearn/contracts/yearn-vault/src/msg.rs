use cosmwasm_schema::{cw_serde, QueryResponses};
use cw20::{MinterResponse, Cw20Coin, Logo};

#[cw_serde]
pub struct InstantiateMsg {
    pub supported_token_address: String,
}

#[cw_serde]
pub enum ExecuteMsg {}

#[cw_serde]
pub struct InstantiateMarketingInfo {
    pub project: Option<String>,
    pub description: Option<String>,
    pub marketing: Option<String>,
    pub logo: Option<Logo>,
}

#[cw_serde]
pub struct Cw20InstantiateMsg {
    pub name: String,
    pub symbol: String,
    pub decimals: u8,
    pub initial_balances: Vec<Cw20Coin>,
    pub mint: Option<MinterResponse>,
    pub marketing: Option<InstantiateMarketingInfo>,
}


#[cw_serde]
pub enum MigrateMsg {}

#[cw_serde]
#[derive(QueryResponses)]
pub enum QueryMsg {}
