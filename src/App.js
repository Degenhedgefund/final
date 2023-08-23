import './App.css';
import LiveStream from './components/LiveStream';
import BackgroundMusic from './components/BackgroundMusic';
import React, { useState, useEffect  } from 'react';
import Web3 from 'web3';


const CONTRACT_ABI = []; //Contract ABI
const CONTRACT_ADDRESS = '0xd00d42FDA98e968d8EF446a7f8808103fA1b3fD6'; //Contract address


function App() {

  let [isConnected, setIsConnected] = useState(false);
  const [userGambleBalance, setuserGambleBalance] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [tierLevel, setTierLevel] = useState(0);
  const [userRevenueShare, setUserRevenueShare] = useState(0);
  const [account, setAccount] = useState(null);


  const claimRevenueShare = async () => {
    /*     const web3 = await initializeWeb3();
        if (!web3) return;
    
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        try {
            const accounts = await web3.eth.getAccounts();
            const receipt = await contract.methods.claimRevenueShare().send({ from: accounts[0] });
            console.log('Transaction successful:', receipt);
        } catch (error) {ser
            console.error('Error sending transaction:', error);
        } */
      };
    
      const castVote = async (vote) => {
    /*     const web3 = await initializeWeb3();
        if (!web3) return;
    
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        try {
            const accounts = await web3.eth.getAccounts();
            const receipt = await contract.methods.castVote(vote).send({ from: accounts[0] });
            console.log('Transaction successful:', receipt);
        } catch (error) {
            console.error('Error sending transaction:', error);
        } */
      };
    
      const getuserGambleBalance = async () => {
          return Promise.resolve(10000); // Hardcoded value
    /*     const web3 = await initializeWeb3();
        if (!web3) return;
      
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        try {
          const supply = await contract.methods.totalSupply().call(); // Replace with the actual method
          return supply;
        } catch (error) {
          console.error('Error fetching total supply:', error);
        } */
      };
    
      const getTotalRevenue = async () => {
        return Promise.resolve(87); // Hardcoded value
    /*     const web3 = await initializeWeb3();
        if (!web3) return;
      
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        try {
          const revenue = await contract.methods.getTotalRevenue().call(); // Replace with the actual method
          return revenue;
        } catch (error) {
          console.error('Error fetching total revenue:', error);
        } */
      };
      
      const getTierLevel = async () => {
        return Promise.resolve(1); // Hardcoded value
    /*     const web3 = await initializeWeb3();
        if (!web3) return;
      
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        try {
          const tier = await contract.methods.getTierLevel().call(); // Replace with the actual method
          return tier;
        } catch (error) {
          console.error('Error fetching tier level:', error);
        } */
      };
    
      const getUserRevenueShare = async () => {
        return Promise.resolve(0.0001); // Hardcoded value
    /*     const web3 = await initializeWeb3();
        if (!web3) return;
      
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        const accounts = await web3.eth.getAccounts();
        try {
          const share = await contract.methods.getUserRevenueShare(accounts[0]).call(); // Replace with the actual method
          return share;
        } catch (error) {
          console.error('Error fetching user revenue share:', error);
        } */
      };
      

  useEffect(() => {
    getuserGambleBalance().then(supply => setuserGambleBalance(supply));
    getTotalRevenue().then(revenue => setTotalRevenue(revenue));
    getTierLevel().then(tier => setTierLevel(tier));
    getUserRevenueShare().then(share => setUserRevenueShare(share));
  }, []);

    const [config, setConfig] = useState(null);
  
    useEffect(() => {
      fetch(process.env.PUBLIC_URL + '/config.json')
        .then((response) => response.json())
        .then((data) => setConfig(data))
        .catch((error) => console.error('Error fetching config:', error));
    }, []);
  
    if (!config) return <div>Loading...</div>;
  
    const {
      CONTRACT_ABI,
      CONTRACT_ADDRESS,
      GAMES,
      SELECTED_GAMES_INDEXES,
      TOTAL_POT,
      TWITTER_LINK,
      TG_LINK,
      BASE_URL
    } = config;
    

    const initializeWeb3 = async () => {
      let web3;
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          const accounts = await web3.eth.getAccounts();
          setAccount(accounts[0]);
          window.ethereum.on('accountsChanged', async (accounts) => {
            console.log('Account changed:', accounts[0]);
            setAccount(accounts[0]);
          });
        } catch (error) {
          console.error("User denied account access...");
          return null;
        }
      } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } else {
        console.log('Non-Ethereum browser detected. Consider installing MetaMask.');
        return null;
      }
      return web3;
    };

  const connectToWallet = async () => {
    const web3 = await initializeWeb3();
    if (!web3) {
      setIsConnected(false);
      return;
    }

    try {
        const accounts = await web3.eth.getAccounts();
        console.log('Connected to account:', accounts[0]);
        setIsConnected(true);
    } catch (error) {
        console.error('Error connecting to wallet:', error);
        setIsConnected(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
  };
  

    return (
      <div className="App">
        <header className="banner">
        <img src={`${BASE_URL}/images/logoTransparent.png`} alt="Degen Hedge Fund Logo" className="banner-logo"/>
          <h3 className="casino-title">Degen Hedge Fund</h3>

          {/* DEXscreener Link Button */}
          <a href="https://dexscreener.com/ethereum/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640" target="_blank" rel="noopener noreferrer" className="btn-link">
              Chart
          </a>

          {/* Documentation Link/Button */}
          <a href="https://docs.degenhedge.fund/" target="_blank" rel="noopener noreferrer" className="btn-link">
              Docs
          </a>

          {account ? (
            <div className="connected-address">
            Connected to: {account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : ''}
            <br />
            <button className="disconnect-button" onClick={disconnectWallet}>Disconnect</button>
          </div>
      ) : (
        <button className="connect-button" onClick={connectToWallet}>Connect</button>
      )}
        <a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer" className="social-btn twitter-btn">
          <i className="fab fa-twitter"></i>
        </a>
        <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="social-btn tg-btn">
          <i className="fab fa-telegram-plane"></i>
        </a>
        </header>

        <div className="body">
          <br></br>
          <div className='casino-sub-title pulse-effect'>
          Ready to go ALL in?
          </div>
          <LiveStream totalPot={TOTAL_POT}/>
          <BackgroundMusic />
        </div>
        <div className="container mt-5">
              <div className='casino-sub-title'>
              Vote on the next game to play!
              </div>
              <div className="voting-container">
              {SELECTED_GAMES_INDEXES.map((index) => (
                <div className="vote-item" key={index}>
                  <p id={`gameChoice${index + 1}`}>{GAMES[index].name}</p>
                  <p className="vote-percentage">XX%</p>
                  <img src={GAMES[index].image} alt={`Game ${index + 1}`} className="game-image"/>
                  <button className="btn btn-primary" disabled={true} onClick={() => castVote(index + 1)}>
                    Vote!
                  </button>
                </div>
              ))}
            </div>
              <br></br>
            </div>
            <div className="claim-section">
            <div className='casino-sub-title2'>
              Claim your revenue share below!
              </div>
            <div className="claim-info">
              <p className="claim-item">Your $GAMBLE:</p><p className="claim-item">{userGambleBalance}</p>
              <p className="claim-item">Total Revenue:</p><p className="claim-item"> {totalRevenue} ETH</p>
              <p className="claim-item">Tier Level:</p><p className="claim-item"> {tierLevel}</p>
              <p className="claim-item">Your Revenue Share:</p><p className="claim-item"> {(totalRevenue * userRevenueShare).toFixed(2)} ETH</p>
            </div>
            <div className="claim-container">
            <img src={`${BASE_URL}/images/frog1.png`} className="img-fluid d-none d-lg-block" alt="Left Image" />
            <button className="btn btn-claim" disabled={true} onClick={() => claimRevenueShare()}>
                Claim!
            </button>
            <img src={`${BASE_URL}/images/frog2.png`} className="img-fluid d-none d-lg-block" alt="Right Image" />

          </div>

      </div>
        </div>
    );
}


export default App;