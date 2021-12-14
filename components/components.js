import React, { Component, useState, useEffect } from 'react';
//import ReactMarkdown from 'react-markdown'
import Head from 'next/head'
import Link from 'next/link'
import Web3 from "web3";
import { fetchAPI } from '../lib/api'
import {ADDRESS, ABI} from "../config.js"

export class Header extends Component {
    render() {
    return<Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>ByteLand</title>
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/SimpleLightbox/2.1.0/simpleLightbox.min.css" rel="stylesheet" />
        <link href="css/styles.css" rel="stylesheet" />
    </Head>
    }
  }

export class Navigation extends Component {
  render() {
    return<nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
        <div className="container px-4 px-lg-5">
        <a className="navbar-brand" href="#page-top">Byte Land  -  Cat Season🐈</a>
        {/* <ConnectButton className="btn btn-primary" signedIn={signedIn} signOut={signOut} signIn={clickSignIn} walletAddress={walletAddress} /> */}
        </div>
    </nav>
  }
}

export function MintButton(props) {
 
  if (props.signedIn) { 
      return (
        <>
        <button onClick={props.onClick} className="btn btn-xl btn-primary">Mint {props.nfts} Cats for {(props.price * props.nfts) / (10 ** 18)} FTM</button>        
        {/* <div className="montserrat text-center text-sm text-white mt-2">
          <Link href="https://web3wp.com/blog/how-to-mint-nft-wapuu/">
            <a className="underline">Confused? Watch our video walkthrough...</a>
          </Link>
        </div> */}
        </>
      )
  } else {
    return (
    <>
      <button disabled className="btn btn-primary">PLEASE CONNECT WALLET BEFORE MINT</button>
      <div className="btn m-3">
        <Link href="https://web3wp.com/blog/how-to-setup-blockchain-digital-wallet/">
            <a target="_blank" rel="noreferrer">Need help?</a>
        </Link>
      </div>
    </>
    )
  }
}

export function ConnectButton(props) {
 
  if (props.signedIn) {
    return (
      <button onClick={props.signOut} className="btn btn-primary">Adress: {props.walletAddress.substring(0,6)}...{props.walletAddress.substring(38)}</button>
      )
  } 
  else {
    return (
      <>
      <button onClick={props.signIn} className="btn btn-primary">Connect Wallet</button>
      </>
    )
  }
}


// export function LatestNFT() {

//   // FOR WALLET
//   const [signedIn, setSignedIn] = useState(false)
//   const [walletAddress, setWalletAddress] = useState(null)
//   const [contract, setWapuuContract] = useState(null)
//   const [latestWapuu, setLatestWapuu] = useState(false)

//   useEffect( async() => { 
//     signIn()
//   }, [])

//   async function signIn() {
//     if (typeof window.web3 !== 'undefined') {
//       // Use existing gateway
//       //window.web3 = new Web3(window.ethereum);
//       window.web3 = new Web3(Web3.givenProvider);
//       window.ethereum.enable()
//         .then(function (accounts) {
//           window.web3.eth.net.getNetworkType()
//           // checks if connected network is mainnet (change this to rinkeby if you wanna test on testnet)
//           .then((network) => {console.log(network);if(network != "main"){alert("You are on " + network+ " network. Change network to Mainnet or you won't be able to do anything here")} });  
//           let wallet = accounts[0]
//           setWalletAddress(wallet)
//           setSignedIn(true)
//           callContractData(wallet)

//       })
//       .catch(function (error) {
//       // Handle error. Likely the user rejected the login
//         console.error(error)
//       })

//     }

//   }
  
//   async function callContractData(wallet) {
//     const contract = new window.web3.eth.Contract(ABI, ADDRESS)
//     setContract(contract)

//     if (walletAddress) {
//       var specials = []
//       for (let i = 0; i < 2222; i++) {
//         specials.push(i);
//       }
//       var addresses = []
//       for (let i = 0; i < specials.length; i++) {
//         addresses.push(walletAddress);
//       }
//       var myOwned = [];
//       const ownedWapuus = await contract.methods.balanceOfBatch(addresses,specials).call()
//       console.log("Owned" , ownedWapuus)
//       ownedWapuus.forEach((owned, key) => {
//         if ( parseInt(owned) ) {
//           myOwned.push(parseInt(specials[key]));
//         }
//       });

//       const items = [...myOwned];
//       items.reverse();
//       console.log("Owned" , items)

//       fetchAPI(parseInt(items[0]).toString(16), 'GET') //convert to hex for api
//         .catch(function (error) {
//           setError(error.message)
//         })
//         .then(function (data) {
//           if (data && data.name) {
//             data.token = items[0];
//             data.additional = items.length;
//             setLatestWapuu(data)
//           }
//         });
      
//     }
//   }

//   if (latestWapuu && latestWapuu.pending !== undefined) { 
//     return (
//       <>
//       <div className="Poppitandfinchsans text-xl text-white text-center mb-4">
//       Whoops, our API hasn't confirmed the finalized transaction yet, give it a bit and try again.
//       </div>
//       <button onClick={() => signIn()} className="Poppitandfinchsans mt-4 rounded text-4xl border-6 bg-blau text-white hover:text-gray p-2 px-6 mb-8">Reveal Again...</button>                
//       </>
//     )
//   }

//   if (!latestWapuu && walletAddress) { 
//     return (
//       <button onClick={() => signIn()} className="Poppitandfinchsans mt-4 rounded text-4xl border-6 bg-blau text-white hover:text-gray p-2 px-6 mb-8">Reveal Now...</button>                
//     )
//   }

//   return (
//     <div className="mb-6 flex flex-col items-center">
//     <div className="flex flex-col items-center mb-2">
//       <div className="flex justify-center">
//         <div className="shadow rounded-lg overflow-hidden max-w-md">
//           <a title="View on OpenSea" target="_blank" href={"https://opensea.io/assets/"+ADDRESS+"/"+latestWapuu.token+"/"}>
//             <img src={latestWapuu.external_url} className="rounded-t-lg w-full" />
//             <div className="p-2 bg-gray-50 text-center">
//               <p className="text-3xl font-bold Poppitandfinchsans text-black">{latestWapuu.name}</p>
//             </div>
//           </a>
//         </div>
//       </div>
//     </div>
//     {latestWapuu.additional > 1 ?
//     <div className="flex Poppitandfinchsans text-xl text-white items-center bg-grey-lighter rounded rounded-r-none mb-4">
//     And {latestWapuu.additional-1} more...
//     </div>
//     : <></>
//     }
//     <div className="Poppitandfinchsans text-4xl text-white text-center bg-grey-lighter rounded rounded-r-none mb-4">
//     Show off your new Wapuu!
//     </div>
    
//     </div>
//   )
// }


// export function RenameNFT() {

//   // FOR WALLET
//   const [signedIn, setSignedIn] = useState(false)
//   const [walletAddress, setWalletAddress] = useState(null)
//   const [contract, setWapuuContract] = useState(null)
//   const [ownedWapuus, setWapuus] = useState(false)
//   const [toRename, setWapuuRename] = useState(null)
//   const [newName, setNewName] = useState("")

//   // UI
//   const [contractError, setError] = useState(null)
//   const [transactionWaiting, setWaiting] = useState(false)
//   const [transactionDone, setDone] = useState(false)
//   const [transactionHash, setTransactionHash] = useState(null)

//   useEffect( async() => { 
//     signIn()
//   }, [])

//   async function signIn() {
//     if (typeof window.web3 !== 'undefined') {
//       // Use existing gateway
//       //window.web3 = new Web3(window.ethereum);
//       window.web3 = new Web3(Web3.givenProvider);
//       window.ethereum.enable()
//         .then(function (accounts) {
//           window.web3.eth.net.getNetworkType()
//           // checks if connected network is mainnet (change this to rinkeby if you wanna test on testnet)
//           .then((network) => {console.log(network);if(network != "main"){alert("You are on " + network+ " network. Change network to Mainnet or you won't be able to do anything here")} });  
//           let wallet = accounts[0]
//           setWalletAddress(wallet)
//           setSignedIn(true)
//           //callContractData(wallet)

//       })
//       .catch(function (error) {
//       // Handle error. Likely the user rejected the login
//         console.error(error)
//       })

//     }

//   }
  
//   async function fetch() {
//     const contract = new window.web3.eth.Contract(ABI, ADDRESS)
//     setWapuuContract(contract)

//     if (walletAddress) {

//       setError(null)

//       fetchAPI("owned/"+walletAddress, 'GET')
//       .catch(function (error) {
//         setError(error.message)
//       })
//       .then(function (data) {
//         if (data && data.owned) {
//           setWapuus(data.owned)
//         } else {
//           setError("Sorry, there was an error getting owned Wapuus.")
//         }
//       });
      
//     }
//   }

//   async function startRename(key) {
//     setWapuuRename(key)
//     setWaiting(false)
//     setDone(false)
//     setError(null)
//   }

//   async function renameWapuu(tokenId, newName) {
//     setError(null)
//     setWaiting(false)
//     setDone(false)
//     if (contract) {
 
//       const price = 0;
     
//       console.log(tokenId, newName)

//       var gasAmount = await contract.methods.changeWapuuName(tokenId, newName).estimateGas({from: walletAddress, value: price})
//       gasAmount = Math.round(gasAmount * 1.1); //add some padding so users don't lose it in a dropped transaction (this is just limit)
//       console.log("gas limit estimation = " + gasAmount + " units");
//       console.log({from: walletAddress, value: price})

//       contract.methods
//         .changeWapuuName(tokenId, newName)
//         .send({from: walletAddress, value: price, gas: String(gasAmount)})
//         .on('error', function(error){
//           setError(error.message)
//           setWaiting(false)
//         })
//         .on('transactionHash', function(transactionHash){ 
//           setWaiting(true)
//           setTransactionHash(transactionHash)
//           console.log("transactionHash", transactionHash)
//           })
//         .then(function(newContractInstance){
//             console.log(newContractInstance) // instance with the new contract address
//             //todo ping opensea to clear metadata
//             const res = fetch("https://api.opensea.io/api/v1/asset/"+ADDRESS+"/"+tokenId+"/?force_update=true", {
//               method: 'GET'
//             })
//             setDone(true)
//             setWaiting(false)
//         });
          
//     } else {
//         console.log("Wallet not connected")
//     }
//   }

//   if (!ownedWapuus) { 
//     return (
//       <>
//       {contractError ? 
//           <div className="flex auth my-8 font-bold justify-center items-center vw2">
//             <span className="rounded montserrat inline-block border-2 border-red-500 bg-red-200 border-opacity-100 no-underline text-red-600 py-2 px-4 mx-4">{contractError}</span>
//           </div>
//           :''}
//       <div className="flex justify-around my-3">
//         <span className="flex Poppitandfinchsans text-3xl text-center text-white">
//         You can now give your non-special edition Wapuus a custom name by writing it to the blockchain! There is no fee other than gas.
//         </span>
//       </div>
//       <div className="text-center">
//         <button onClick={() => fetch()} className="Poppitandfinchsans mt-4 rounded text-4xl border-6 bg-blau text-white hover:text-gray p-2 px-6 mb-8">Fetch Wapuus</button>                
//       </div>
//       </>
//     )
//   }

//   if (ownedWapuus && !ownedWapuus.length) { 
//     return (
//     <>
//     <h1 className="text-center text-5xl Poppitandfinchsans text-white bg-grey-lighter my-4 ml-3">No renameable Wapuus are owned by this wallet.</h1>
//     <div className="flex justify-around mt-10">
//       <span className="Poppitandfinchsans text-3xl text-center text-white">
//       <Link href="/">
//         <a className="underline mr-2">Mint another Wapuu</a>
//       </Link> 
//       <span>and you might just get lucky!</span>
//       </span>
//     </div>
//     </>
//    )
//   }

//   if (ownedWapuus && ownedWapuus.length) { 

//     if ( toRename !== null ) {
//       if ( transactionWaiting ) {
//         return (
//         <div className="flex flex-col items-center">
//             <div className="flex justify-center items-center mb-4">
//               <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-white"></div>
//             </div>
//             <div className="text-center text-5xl Poppitandfinchsans text-white my-4">
//                 Renaming "{ownedWapuus[toRename].name}" to "{newName}"!
//             </div>
//             <div className="text-center text-3xl Poppitandfinchsans text-white bg-grey-lighter my-4 ml-3">
//                 Please be patient, the Ethereum network can be slow. You can also track the <a className="inline underline text-white hover:text-gray-200" href={"https://etherscan.io/tx/" + transactionHash} target="_blank">status of your transaction on Etherscan</a>.
//             </div>
//         </div> 
//         )
//       } else if ( transactionDone ) {
//         return (
//         <div className="flex flex-col items-center">
//             <div className="text-center text-5xl Poppitandfinchsans text-white my-4">
//                 Successfully renamed "{ownedWapuus[toRename].name}" to "{newName}"!
//             </div>
//             <div className="flex flex-col items-center mb-2">
//               <div className="flex justify-center">
//                 <div className="shadow rounded-lg overflow-hidden max-w-md">
//                   <a title="View on OpenSea" target="_blank" href={"https://opensea.io/assets/"+ADDRESS+"/"+ownedWapuus[toRename].tokenId+"/"}>
//                     <img src={ownedWapuus[toRename].external_url} className="rounded-t-lg w-full" />
//                     <div className="p-2 bg-gray-50 text-center">
//                       <p className="text-3xl font-bold Poppitandfinchsans text-black">Wapuu #{ownedWapuus[toRename].tokenId} - {newName}</p>
//                     </div>
//                   </a>
//                 </div>
//               </div>
//             </div>
//             <div className="text-center text-3xl Poppitandfinchsans text-white bg-grey-lighter my-4 ml-3">
//                 Note you will likely have to click the "refresh metadata" button on OpenSea to clear their cache so you can see your new Wapuu name.
//             </div>
//             <div className="p-1 text-center">
//               <button onClick={() => startRename(null)} className="Poppitandfinchsans rounded text-3xl border-6 bg-blau text-white hover:text-gray p-2 px-3 mb-1">Name Another Wapuu</button>                
//             </div>
//         </div> 
//         )
//       } else {

//       return (
//         <div className="mb-6 flex flex-col items-center">

//         {contractError ? 
//           <div className="flex auth my-8 font-bold justify-center items-center vw2">
//             <span className="rounded montserrat inline-block border-2 border-red-500 bg-red-200 border-opacity-100 no-underline text-red-600 py-2 px-4 mx-4">{contractError}</span>
//           </div>
//           :''}

//         <div className="flex flex-col items-center mb-2">
//           <div className="flex justify-center">
//             <div className="shadow rounded-lg overflow-hidden max-w-md">
//                 <img src={ownedWapuus[toRename].external_url} className="rounded-t-lg w-full" />
//                 <div className="p-2 bg-gray-50 text-center">
//                   <p className="text-3xl font-bold Poppitandfinchsans text-black">{ownedWapuus[toRename].name}</p>
//                 </div>
//             </div>
//           </div>
//         </div>
//         <div className="f">
//         <input 
//           type="text"
//           maxLength="20"
//           value={newName}
//           placeholder="New Name"
//           onChange={ e => setNewName(e.target.value) }
//           name="" 
//           className="montserrat text-2xl inline bg-grey-lighter py-2 font-normal text-center rounded text-black font-bold"
//             />
//             <button onClick={() => renameWapuu(ownedWapuus[toRename].tokenId, newName)} className="ml-3 Poppitandfinchsans mt-4 rounded text-2xl border-6 bg-blau text-white hover:text-gray p-2 px-6 mb-8">Name Me!</button>                
//         </div>
//       <div className="flex  mt-6 Poppitandfinchsans text-3xl text-center text-white">
//       <button onClick={() => setWapuuRename(null)} className="Poppitandfinchsans rounded text-2xl border-1 bg-gray-400 rounded text-black p-1 px-4">Cancel</button>
//     </div>

//         </div>
//       )
//         }
//     } else {
//       return (
//         <div className="flex flex-col items-center">
//             <div className="text-center text-4xl Poppitandfinchsans text-white bg-grey-lighter my-4 ml-3">
//                 Here are the renameable Wapuus you own:
//             </div>
//             <div className="flex justify-center">
//               <div className="p-4">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pt-4">
//                   {
//                     ownedWapuus.map((nft, i) => (
//                       <div key={i} className="shadow bg-gray-50 text-black text-justify rounded-lg overflow-hidden">
//                         <img src={nft.external_url} className="rounded-t-lg w-full" />
//                         <div className="p-1 text-center">
//                           <p className="text-2xl font-bold Poppitandfinchsans text-black">{nft.name}</p>
//                         </div>
//                         <div className="p-1 text-center">
//                           <button onClick={() => startRename(i)} className="Poppitandfinchsans rounded text-xl border-6 bg-blau text-white hover:text-gray p-1 px-3 mb-1">Name</button>                
//                         </div>
//                       </div>
//                     ))
//                   }
//                 </div>
//               </div>
//             </div>
//         </div> 
//       )
//     }
//   }
// }