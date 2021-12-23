import Web3 from "web3";
import Script from 'next/script'
import React, {useState, useEffect} from 'react';
import { Header, MintButton, Navigation, Footer} from '../components/components';
import {ADDRESS, ABI} from "../config.js"


export default function Home() {

  const [signedIn, setSignedIn] = useState(false)

  const [rightNetwork, setRightNetwork] = useState(false)

  const [walletAddress, setWalletAddress] = useState(null)

  // FOR MINTING
  const [how_many_nfts, set_how_many_nfts] = useState(1)

  const [contract, setContract] = useState(null)

  // INFO FROM SMART Contract

  const [totalSupply, setTotalSupply] = useState(0)

  const [saleStarted, setSaleStarted] = useState(false)

  const [nftPrice, setPrice] = useState(0)

  // UI
  const [contractError, setError] = useState(null) 
  const [isMinting, setMinting] = useState(false)
  const [transactionHash, setTransactionHash] = useState(null)

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
          if(network != 250){
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
      if(chainId != 250){
        setRightNetwork(false)
      } else setRightNetwork(true)
    });
  }

  async function signOut() {
    setSignedIn(false)
    // setMinting(false)
    // ethereum.removeListener('accountsChanged', handleAccountsChanged);
    // ethereum.removeListener('chainChanged', handleChainChanged);
  }

  async function switchToRight() {
    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xfa' }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{ chainId: '0xfa', rpcUrl: 'https://rpc.ftm.tools/' /* ... */ }],
          });
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  }
  
  async function callContractData(wallet) {
    if(rightNetwork) {
      const contract = new window.web3.eth.Contract(ABI, ADDRESS)
      setContract(contract)
  
      const salebool = await !contract.methods.paused().call() 
      console.log("saleisActive" , salebool)
      setSaleStarted(salebool)
  
      const totalSupply = await contract.methods.totalSupply().call() 
      console.log("Total Supply" , totalSupply)
      setTotalSupply(totalSupply)
  
      const price = await contract.methods.price().call() 
      console.log("Price" , price)
      setPrice(price)
    }
  }
  
  async function Mint(how_many_nfts) {

    // setMinting(false)
    if (rightNetwork) {
      if (contract) {
        const price = Number(nftPrice) * how_many_nfts 
        var gasAmount = await contract.methods.mint(how_many_nfts).estimateGas({from: walletAddress, value: price})
        gasAmount = Math.round(gasAmount * 1.2); //add some padding so users don't lose it in a dropped transaction (this is just limit)
        console.log("gas limit estimation = " + gasAmount + " units");
        console.log({from: walletAddress, value: price})

        contract.methods
          .mint(how_many_nfts)
          .send({from: walletAddress, value: price, gas: String(gasAmount)})
          .on('error', function(error){
            setError(error.message)
            setMinting(false)
          })
          .on('transactionHash', function(transactionHash){ 
            setMinting(true)
            setTransactionHash(transactionHash)
            console.log("transactionHash", transactionHash)
            })
          .then(function(newContractInstance){
              console.log(newContractInstance) // instance with the new contract address
              callContractData(walletAddress)
              // Router.push('/success')
              //setMinting(false)
          });
            
      } else {
          console.log("Wallet not connected")
      }
    }
    else {
      switchToRight()
    }
};

  return (
    <div>
      <Header/>
      <Navigation signedIn={signedIn} signIn={clickSignIn} walletAddress={walletAddress}/>
      <header className="masthead bg-light">
        <div className="container px-4 px-lg-5 h-100">
          <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
            <div className="col-lg-8 align-self-end">
              <img className="show noselect" src="assets/img/show.gif" width={250}></img>
              <h1 className="text-white font-weight-bold m-4">Byte Cats NFT</h1>
            </div>
            <div className="col-lg-8 align-self-baseline">
              <p className="text-white-75 mb-5" style={{fontSize: '1.4rem'}}>
                These curious cats are the first batch of guests of Byteland.<br />
                This NFT project collected 1,024 unique and randomly generated Byte Cats.<br />
                Need MetaMask wallet and connect to the Fantom Network.<br />
                Each price is only 32 FTM. Take them home and take care of them!
              </p>
              <span className="text-white-75 mb-5" style={{fontSize: '2rem'}}>TOTAL MINTED: {!signedIn ?  <>-</>  :  <>{totalSupply}</> }/1,024</span>
              <div className="text-white-75 mb-3" style={{fontSize: '1.6rem'}}>
                <span>I want  </span>
                <input className="text-white-75 text-center" type="number" min="1" max="10" value={how_many_nfts} onChange={ e => set_how_many_nfts(e.target.value) } name=""/>
                <span>  Byte Cats!</span><br />
                <span>(max: 10)</span>
              </div>
              {/* <button className="btn btn-xl btn-primary">Mint has not started yet.</button> */}
              <MintButton onClick={() => Mint(how_many_nfts)} saleStarted={saleStarted} nfts={how_many_nfts} signedIn={signedIn} price={nftPrice} rightNetwork={rightNetwork}/>
            </div>
          </div>
        </div>
      </header>
      <section className="page-section" id="services">
        <div className="container px-4 px-lg-5">
          <div className="m-5" id="portfolio">
            <div className="container-fluid p-5">
              <div className="row g-0 m-1">
                <div className="col-lg-4 col-sm-6">
                  <a className="portfolio-box" href="assets/img/portfolio/fullsize/1.png" title="Byte Cat">
                    <img className="img-fluid" src="assets/img/portfolio/thumbnails/1.png" alt="..." />
                    <div className="portfolio-box-caption">
                      <div className="project-category text-white-50">Byte Cat</div>
                      <div className="project-name">
                        Background: Haizakura<br/>
                        Body: Pink<br/>
                        Ear: Pink<br/>
                        Eye: Amber<br/>
                        Clothing: None<br/>
                        Head: None<br/>
                        Emotion: Red Exclamation Mark<br/>
                        Accessory: Cone Of Shame - Flower<br/>
                        Accessory: None
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <a className="portfolio-box" href="assets/img/portfolio/fullsize/2.png" title="Byte Cat">
                    <img className="img-fluid" src="assets/img/portfolio/thumbnails/2.png" alt="..." />
                    <div className="portfolio-box-caption">
                      <div className="project-category text-white-50">Byte Cat</div>
                      <div className="project-name">
                        Background: Momo<br/>
                        Body: Blue<br/>
                        Ear: Grey<br/>
                        Eyes: Green<br/>
                        Clothing: Cloak - Black<br/>
                        Head: Beret - Khaki<br/>
                        Emotion: ZzZ<br/>
                        Accessory: None<br/>
                        Accessory: None
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <a className="portfolio-box" href="assets/img/portfolio/fullsize/3.png" title="Byte Cat">
                    <img className="img-fluid" src="assets/img/portfolio/thumbnails/3.png" alt="..." />
                    <div className="portfolio-box-caption">
                      <div className="project-category text-white-50">Byte Cat</div>
                      <div className="project-name">
                        Background: Green<br/>
                        Body: Pink<br/>
                        Ear: Grey<br/>
                        Eyes: Green<br/>
                        Clothing: Sweater - Yellow<br/>
                        Head: None<br/>
                        Emotion: None<br/>
                        Accessory: Cone Of Shame - Flower<br/>
                        Accessory: Bubbles
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <a className="portfolio-box" href="assets/img/portfolio/fullsize/4.png" title="Byte Cat">
                    <img className="img-fluid" src="assets/img/portfolio/thumbnails/4.png" alt="..." />
                    <div className="portfolio-box-caption">
                      <div className="project-category text-white-50">Byte Cat</div>
                      <div className="project-name">
                        Background: Grey<br/>
                        Body: Grey<br/>
                        Ear: Yellow<br/>
                        Eyes: Default<br/>
                        Clothing: Cloak - Red<br/>
                        Head: None<br/>
                        Emotion: None<br/>
                        Accessory: None<br/>
                        Accessory: None
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <a className="portfolio-box" href="assets/img/portfolio/fullsize/5.png" title="Byte Cat">
                    <img className="img-fluid" src="assets/img/portfolio/thumbnails/5.png" alt="..." />
                    <div className="portfolio-box-caption">
                      <div className="project-category text-white-50">Byte Cat</div>
                      <div className="project-name">
                        Background: Dark Green<br/>
                        Body: Blue<br/>
                        Ear: Grey<br/>
                        Eyes: Default<br/>
                        Clothing: None<br/>
                        Head: Santa Hat - Red<br/>
                        Emotion: Music<br/>
                        Accessory: None<br/>
                        Accessory: None
                      </div>
                    </div>
                  </a>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <a className="portfolio-box" href="assets/img/portfolio/fullsize/6.png" title="Byte Cat">
                    <img className="img-fluid" src="assets/img/portfolio/thumbnails/6.png" alt="..." />
                    <div className="portfolio-box-caption p-3">
                      <div className="project-category text-white-50">Byte Cat</div>
                      <div className="project-name">
                        Background: Grey<br/>
                        Body: Brown<br/>
                        Ear: Grey<br/>
                        Eye: Default<br/>
                        Clothing: None<br/>
                        Head: None<br/>
                        Emotion: Check Mark<br/>
                        Accessory: None<br/>
                        Accessory: Christmas Tree
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <h2 className="text-center mt-0">About Byte Cats🐈</h2>
          <hr className="divider divider-dark" />
          <div className="row gx-4 gx-lg-5">
            <div className="col-lg-3 col-md-6 text-center">
              <div className="mt-5">
                <h3 className="h4 mb-2">NFT🐱</h3>
                <p className="text-muted mb-0">Byte cats is an NFT collection of ERC721 token stored on Fantom blockchain. The Metadata of Byte Cats is stored by IPFS distributed file system.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <div className="mt-5">
                <h3 className="h4 mb-2">Rarity😻</h3>
                <p className="text-muted mb-0">There are more than 100 million combinations from 9 feature layers but only generated 2048 Byte Cats, so every Byte Cat is rarity and unique.</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <div className="mt-5">
                <h3 className="h4 mb-2">Community😺</h3>
                <p className="text-muted mb-0">We will use 20% of the income to support the development of the community.<br/>
                Holding Byte Cat is a proof of early supporter. </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <div className="mt-5">
                <h3 className="h4 mb-2">Benevolence😸</h3>
                <p className="text-muted mb-0">After this collection is sold out, we will donate 5% of the income to animal protection organization that accept cryptocurrency donations.<br />
                  Donation result will be public at time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="page-section bg-light" id="about">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-lg-4 text-center">
              <h2 className="text-white mt-0">Follow us🎁</h2>
              <hr className="divider" />
              <a className="m-2 btn btn-light btn-xl" href="https://twitter.com/ByteLandNFT" target="_blank" rel="noreferrer">Twitter</a>
              {/* <a className="m-2 btn btn-light btn-xl" href="https://www.instagram.com/byteland_nft" target="_blank" rel="noreferrer">Instagram</a> */}
              <a className="m-2 btn btn-light btn-xl" href="https://discord.gg/UDxsG3nM6h" target="_blank" rel="noreferrer">Discord</a>
            </div>
          </div>
        </div>
      </section>
      <section className="page-section" id="contact">
        <div className="container px-4 px-lg-5">
          <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-lg-8 col-xl-6 text-center" style={{color: '#212529'}}>
              <h2 className="mt-0">The adventure story of Byteland has just begun...</h2>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" strategy="beforeInteractive"></Script>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/SimpleLightbox/2.1.0/simpleLightbox.min.js" strategy="beforeInteractive"></Script>
      <Script src="js/scripts.js" strategy="beforeInteractive"></Script>
    </div>
  )
}