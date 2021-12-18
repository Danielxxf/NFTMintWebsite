import Web3 from "web3";
import { useState, useEffect } from 'react';
import Script from 'next/script';
import { Header, Navigation, Item, ItemGroup} from '../components/components';
import {ADDRESS, ABI} from "../config.js";

export default function MyCats(props) {
  const [signedIn, setSignedIn] = useState(false)
  const [rightNetwork, setRightNetwork] = useState(false)
  const [walletAddress, setWalletAddress] = useState(null)
  const [contract, setContract] = useState(null)
  const [metadataList, setMetadataList] = useState([])

  useEffect( async() => { 
    signIn()
  }, [rightNetwork])

  async function clickSignIn() {
    if (typeof window.web3 === 'undefined') {
      alert("Please install MetaMask or another compatible Web3 wallet to connect.");
    } else {
      signIn()
    }
  }

  async function signIn() {
    console.log('call sign')
    window.web3 = new Web3(Web3.givenProvider);
    // updateState()
    if (typeof window.web3 !== 'undefined') {
      ethereum
      .request({ method: 'eth_requestAccounts' })
      .then(function (handleAccountsChanged){
        window.web3.eth.net.getId()
        // checks if connected network is mainnet (change this to rinkeby if you wanna test on testnet)
        .then((network) => {
          console.log(network);
          if(network != 4002){
            setRightNetwork(false)
            alert("You are on wrong network. Please switch to Fantom Mainnet or you won't be able to do anything here")
            switchToRight()
          } else {
            setRightNetwork(true)
          }
        });  
        let wallet = handleAccountsChanged[0]
        setWalletAddress(wallet)
        setSignedIn(true)
        callContractData(wallet)
      })
      .catch((error) => {
        if (error.code === 4001) {
          // EIP-1193 userRejectedRequest error
          console.log('Please connect to MetaMask.');
        } else {
          console.error(error)
        }
      });
    }
    ethereum.on('accountsChanged', (accounts) => {
      if(!ethereum.isConnected()){
        signOut()
      }
      let wallet = accounts[0]
      if(wallet != undefined)setWalletAddress(wallet)
    });
    ethereum.on('chainChanged', (chainId) => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      if(chainId != 4002){
        setRightNetwork(false)
      } else setRightNetwork(true)
    });
  }

  async function switchToRight() {
    console.log("call switch")
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xfa2' }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{ chainId: '0xfa2', rpcUrl: 'https://rpc.testnet.fantom.network/' /* ... */ }],
          });
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  }

  async function signOut() {
    setSignedIn(false)
    // setMinting(false)
    // ethereum.removeListener('accountsChanged', handleAccountsChanged);
    // ethereum.removeListener('chainChanged', handleChainChanged);
  }

  async function callContractData(wallet) {
    console.log("callcontract", rightNetwork)
    var itemList = []
    var metaList = []
    if(rightNetwork) {
      const contract = new window.web3.eth.Contract(ABI, ADDRESS)
      setContract(contract)
      itemList = await contract.methods.tokensOwned(wallet).call()
      console.log("itemList",itemList)
      var count=0;
      for (var i in itemList){
        contract.methods.tokenURI(i).call().then(res => {
          getJSON(res).then(function(data) {
            console.log("data")
            console.log(data)
            metaList[count++] = data
          })
        })
      }
      console.log("14215",metaList)
      setTimeout(function(){
        setMetadataList(metaList)
      },1000)
    }
  }

  var getJSON = function(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('get', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        var status = xhr.status;
        if (status == 200) {
          resolve(xhr.response);
        } else {
          reject(status);
        }
      };
      xhr.send();
    });
  };


  return (
    <>
      <Header />
      <Navigation signedIn={signedIn} signIn={clickSignIn} walletAddress={walletAddress}/>
      <header className="masthead bg-light" style={{background: "none"}}>
      <h1 className="text-center text-white-75">My Cats</h1>
      <div className="container px-4 px-lg-5">
        <div className="m-5" id="portfolio">
          <div className="container-fluid p-0">
            <div className="row g-0">
              <ItemGroup metaData={metadataList}/>
            </div>
          </div>
        </div>
      </div>

      </header>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" strategy="beforeInteractive"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/SimpleLightbox/2.1.0/simpleLightbox.min.js" strategy="beforeInteractive"></Script>
      <Script src="js/scripts.js" strategy="beforeInteractive"></Script>
    </>
    )
}

