#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;

use cosmwasm_std::{
    to_binary, Binary, Deps, DepsMut, Env, 
    MessageInfo, Reply, Response, StdResult, WasmMsg, 
    WasmQuery, SubMsg, Empty, from_binary
};

use cw2::set_contract_version;
use cw20::Cw20QueryMsg::TokenInfo;
use cw20::{MinterResponse, TokenInfoResponse};
use cw0::parse_reply_instantiate_data;

use crate::{error::ContractError, msg::*, state::*};

// version info for migration info
const CONTRACT_NAME: &str = "crates.io:yearn-vault";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

// list of reply ids
const VTOKEN_INSTANTIATE_REPLY_ID: u64 = 1u64;

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    _msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;

    // Saving passed supported token into the state and handling error
    let storing_token = SUPPORTED_TOKEN.save(deps.storage, &_msg.supported_token_address);
    match storing_token {
        Ok(_) => {}
        Err(_) => {
            return Err(ContractError::CustomError {
                val: "Storing supported token failed!".to_string(),
            });
        }
    }

    // Creating WasmQuery to get Token Info from Supported Token Contract
    let supported_token_query = WasmQuery::Smart {
        contract_addr: _msg.supported_token_address.clone(),
        msg: to_binary(&TokenInfo {})?,
    };
    
    
    // getting token info from supported token and initiating VTokens    
    let supported_token_data: StdResult<TokenInfoResponse> = deps
        .querier
        .query_wasm_smart(_msg.supported_token_address, &supported_token_query);

    
    match supported_token_data {
        Ok(token_data) => {

            let vtoken_instantiate_tx = WasmMsg::Instantiate {
                admin: None,
                code_id: 846,
                msg: to_binary(&Cw20InstantiateMsg{
                    name: "v".to_string() + &token_data.name,
                    symbol: "V".to_string() + &token_data.symbol,
                    decimals: 18,
                    initial_balances: vec![],
                    mint: Some(MinterResponse { minter: _env.contract.address.to_string(), cap: None}),
                    marketing: None,
                })?,
                funds: vec![],
                label: "instantiate vtoken contract".to_string()
            };

            let _submessage: SubMsg<Empty> = SubMsg::reply_on_success(vtoken_instantiate_tx, VTOKEN_INSTANTIATE_REPLY_ID);            
        }, 
        Err(_) => {
            return Err(ContractError::CustomError { val: "Unable to fetch token info!".to_string() });
        }
    }

    Ok(Response::new()
        .add_attribute("method", "instantiate")
        .add_attribute("owner", info.sender))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn migrate(_deps: DepsMut, _env: Env, msg: MigrateMsg) -> Result<Response, ContractError> {
    match msg {}
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::Receive(cw20_receive_msg) => execute::handle_cw20_receive(_deps, _env, _info, cw20_receive_msg),
    }
}

pub mod execute {
    

    use super::*;

    pub fn handle_cw20_receive(_deps: DepsMut, _env: Env, _info: MessageInfo, _msg: Cw20ReceiveMsg) -> Result<Response, ContractError> {

        const DEPOSIT_MESSAGE: &str = "Deposit";
        const WITHDRAW_MESSAGE: &str = "Withdraw";

        let _send_cw20: SendCw20Msg = from_binary(&_msg.msg)?;

        match _send_cw20.message.as_str() {
            DEPOSIT_MESSAGE => {
                let token_address = SUPPORTED_TOKEN.load(_deps.storage);
                match token_address {
                    Ok(t_address) => {
                        if t_address == _send_cw20.address {
                            // incomplete
                        } else {
                            return Err(ContractError::CustomError { val: "Vault doesn't support this token!".to_string() });
                        }
                    },
                    Err(_) => {
                        return Err(ContractError::CustomError { val: "This vault doesn't assign any token!".to_string() });
                    }
                }
            },
            WITHDRAW_MESSAGE => {
                let vtoken_address = VTOKEN.load(_deps.storage);

                match vtoken_address {
                    Ok(vtoken) => {
                        if vtoken == _send_cw20.address {
                            // incomplete.
                        } else {
                            return Err(ContractError::CustomError { val: "Vault doesn't support this vtoken!".to_string() });
                        }
                    },
                    Err(_) => {
                        return Err(ContractError::CustomError { val: "This vault doesn't assign any vtoken!".to_string() });
                    }
                }
            },
            _message => {
                return Err(ContractError::CustomError { val: "Invalid Request!".to_string() })
            }
        }

        unimplemented!();
    }
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(_deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {}
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn reply(_deps: DepsMut, _env: Env, _msg: Reply) -> Result<Response, ContractError> {
    
    match _msg.id {
        VTOKEN_INSTANTIATE_REPLY_ID => reply::handle_vtoken_instantiate(_deps, _msg),
        _id => {
            return Err(ContractError::CustomError { val: "Reply id didn't match!".to_string() });
        }
    }
}

pub mod reply {
    use super::*;

    pub fn handle_vtoken_instantiate(_deps: DepsMut, _msg: Reply) -> Result<Response, ContractError> {
        let data = parse_reply_instantiate_data(_msg);

        match data {
            Ok(contract) => {
                let storing_vtoken_address = VTOKEN.save(_deps.storage, &contract.contract_address);
                match storing_vtoken_address {
                    Ok(_) => {
                        Ok(Response::new().add_attribute("method", "handle_vtoken_instantiate"))
                    },
                    Err(_) => {
                        return Err(ContractError::CustomError { val: "Unable to store vtoken address!".to_string() });
                    }
                }
            },
            Err(_) => {
                return Err(ContractError::CustomError { val: "Vtoken contract response failed!".to_string() });
            }
        }
    }
}