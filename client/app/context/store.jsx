"use client"
import { createContext, useState } from "react";
import { setupWebKeplr, GasPrice } from "cosmwasm";


export const appState = createContext();

const GlobalStateProvider = ({children}) => {

    /* */
    const [signer, setSigner] = useState(null);
    const [clientSigner, setClientSigner] = useState(null);


    // Add supported chain ie. Osmosis
    const addChain = async () => {
        try {    
          const data = await window.keplr.experimentalSuggestChain({
            chainId: "osmo-test-5",
            chainName: "Osmosis Testnet 5",
            rpc: "https://rpc.osmotest5.osmosis.zone:443",
            rest: "https://lcd.osmotest5.osmosis.zone:1317",
            bip44: {
              coinType: 118,
            },
            bech32Config: {
              bech32PrefixAccAddr: "osmo",
              bech32PrefixAccPub: "osmo" + "pub",
              bech32PrefixValAddr: "osmo" + "valoper",
              bech32PrefixValPub: "osmo" + "valoperpub",
              bech32PrefixConsAddr: "osmo" + "valcons",
              bech32PrefixConsPub: "osmo" + "valconspub",
            },
            currencies: [
              {
                coinDenom: "OSMO",
                coinMinimalDenom: "uosmo",
                coinDecimals: 6,
                coinGeckoId: "osmosis",
              },
            ],
            feeCurrencies: [
              {
                coinDenom: "OSMO",
                coinMinimalDenom: "uosmo",
                coinDecimals: 6,
                coinGeckoId: "osmosis",
                gasPriceStep: {
                  low: 0.01,
                  average: 0.025,
                  high: 0.04,
                },
              },
            ],
            stakeCurrency: {
              coinDenom: "OSMO",
              coinMinimalDenom: "uosmo",
              coinDecimals: 6,
              coinGeckoId: "osmosis",
            },
          });
    
        } catch (error) {
          console.log(error);
        }
      }
      
      // connectWallet is used to connect wallet
      const connectWallet = async () => {
        try {
    
          addChain();
    
          if (!window.keplr) {
            throw new Error("Keplr Wallet extension not found");
          }
    
          await window.keplr.enable("osmo-test-5");
    
          const offlineSigner = await window.keplr.getOfflineSigner("osmo-test-5");
    
          const signingClient = await setupWebKeplr({
            rpcEndpoint: "https://rpc.osmotest5.osmosis.zone",
            chainId: "osmo-test-5",
            prefix: "osmosis",
            gasPrice: GasPrice.fromString("0.250uosmo"),
          });
    
          const account = await offlineSigner.getAccounts();
          setSigner(account[0].address);
    
          setClientSigner(signingClient);
        } catch (error) {
          console.log(error);
        }
      };  
    

  return (
    <appState.Provider  value={{

      /*Function provided by context */
      connectWallet,
      
      /* State provided by context*/
      signer,

      /* */
      
    }
  }>
        
        {children}
    </appState.Provider>

  )
}

export default GlobalStateProvider