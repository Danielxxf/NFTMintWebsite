import React, { Component, useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image';

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

export class Navigation extends Component {
  render() {
    return<nav className="navbar navbar-expand-lg navbar-light fixed-top py-3" id="mainNav">
      <div className="container px-4 px-lg-5">
        <Link href="/">
          <a className="navbar-brand">Byteland</a>
        </Link>
        <div>
          <ConnectButton signedIn={this.props.signedIn} signIn={this.props.signIn} walletAddress={this.props.walletAddress} />
        </div>
      </div>
    </nav>
  }
}

export class Footer extends Component {
  render() {
    return<footer className="py-1">
      <div className="container px-4 px-lg-5">
        <div className="small text-center">Copyright © 2021 - Byteland</div>
      </div>
    </footer>
  }
}

export const ImageWithFallback = (props) => {
    const { src, fallbackSrc, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);

    return (
      <Image {...rest} src={imgSrc} onError={() => {setImgSrc(fallbackSrc);}} width={"100%"} height={"100%"}/>
    );
};

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
          <button onClick={props.onClick} className="btn btn-xl btn-primary">Connect to Fantom Opera</button>
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
      <>
        <Link href='/mycats'>
          <button className="btn btn-primary">My NFTs</button>
        </Link>
        <button className="btn btn-primary">Adress: {props.walletAddress.substring(0,6)}...{props.walletAddress.substring(38)}</button>
      </>
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

export function ItemGroup(props){
  var sortedMetaData = props.metaData.sort(function(a,b){
    return parseInt(a.tokenId)>parseInt(b.tokenId) ? 1:-1
  })

  // Aready get metadata
  if(sortedMetaData.length > 0){
    return (<>
      {sortedMetaData.map(
        (jsonData)=>(
            <Item key={jsonData.tokenId} itemData={jsonData}></Item>
        )
      )}
    </>)
  }

  // Loading
  else {
    return (
    <>
      <h2 className="text-white-75 text-center">Loading...</h2>
    </>
    )
  }
}

export function Item(props){
  return(
    <div className="col-lg-2 col-sm-6 m-2 text-white-75 text-center" style={{fontSize: '1.5rem'}}>
      {props.itemData.name}
      <div className="portfolio-box" href={props.itemData.image} title={props.itemData.name}>
        Score: {props.itemData.score}<br/>Rank: {props.itemData.rank}<br/>
        <img className="img-fluid show noselect" src={props.itemData.image} alt="..."/>
        <div className="portfolio-box-caption">
          <div className="project-name show p-2" style={{color: '#000', background:'rgba(255, 255, 255, 0.9)', fontSize: '1.2rem'}}>
            <a href={props.itemData.image} style={{color: '#2E9AFE'}} target="_blank" rel="noreferrer">ImageURI</a><br/>
            {/* {props.itemData.attributes.map(itemdata=>(
                <div key={}>{itemdata.trait_type}: {itemdata.value}<br/></div>
            ))} */}
            Background: {props.itemData.attributes[0].value}<br/>
            Body: {props.itemData.attributes[1].value}<br/>
            Ear: {props.itemData.attributes[2].value}<br/>
            Eye: {props.itemData.attributes[3].value}<br/>
            Clothing: {props.itemData.attributes[4].value}<br/>
            Head: {props.itemData.attributes[5].value}<br/>
            Emotion: {props.itemData.attributes[6].value}<br/>
            Accessory: {props.itemData.attributes[7].value}<br/>
            Accessory: {props.itemData.attributes[8].value}
          </div>
        </div>
      </div>
    </div>
  )
}