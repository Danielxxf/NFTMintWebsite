import React, { Component, useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'

export class Header extends Component {
    render() {
    return<Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Byteland</title>
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/SimpleLightbox/2.1.0/simpleLightbox.min.css" rel="stylesheet" />
        <link href="css/styles.css" rel="stylesheet" />
        <link rel="apple-touch-icon" sizes="180x180" href="assets/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="assets/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="assets/favicon-16x16.png"/>
        <link rel="manifest" href="assets/site.webmanifest"/>
        <link rel="mask-icon" href="assets/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>
        <noscript id="__next_css__DO_NOT_USE__" />
    </Head>
    }
  }

// export class Navigation extends Component {
//   render() {
//     return<nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
//         <div className="container px-4 px-lg-5">
//         <a className="navbar-brand" href="#page-top">Byte Land  -  Cat Season🐈</a>
//         {/* <ConnectButton className="btn btn-primary" signedIn={signedIn} signOut={signOut} signIn={clickSignIn} walletAddress={walletAddress} /> */}
//         </div>
//     </nav>
//   }
// }

export function MintButton(props) {
 
  if (props.signedIn) { 
    if(props.rightNetwork)
      return (
        <>
          <button onClick={props.onClick} className="btn btn-xl btn-primary">Mint {props.nfts} Cats for {(props.price * props.nfts) / (10 ** 18)} FTM</button>
        </>
      )
    else 
      return (
        <>
          <button onClick={props.onClick} className="btn btn-xl btn-primary">Switch to Fantom Opera</button>
          <div className='m-3'>
            <Link href="https://docs.fantom.foundation/tutorials/set-up-metamask">
              <a target="_blank" rel="noreferrer">How to add network Fantom Opera on MetaMask</a>
            </Link>
          </div>
        </>
      ) 
  } else {
    return (
    <>
      <button disabled className="btn btn-primary">PLEASE CONNECT WALLET BEFORE MINT</button>
      <div className="m-3">
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
      <button className="btn btn-primary">Adress: {props.walletAddress.substring(0,6)}...{props.walletAddress.substring(38)}</button>
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