import './App.css';
import LiveStream from './components/LiveStream';
import BackgroundMusic from './components/BackgroundMusic';
import React, { useState, useEffect  } from 'react';
import Web3 from 'web3';
import './index.css';


const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_tokenAddress",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "FeeOverflow",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "GameActive",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "GameNotActive",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "LastAction",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NewOwnerIsZeroAddress",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NoChoices",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NoConsecutiveSnapshot",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NoHandoverRequest",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NoRenounce",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NoReward",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NoTier",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "NoTiers",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "max",
        "type": "uint8"
      }
    ],
    "name": "NotAChoice",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "OnlyUpdate",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "OutOfBounds",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ShareTierOverflow",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tiers",
        "type": "uint256"
      }
    ],
    "name": "TierArrayLength",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "TokenTierOverflow",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "Unauthorized",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "VoteActive",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "VoteNotActive",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ZeroAddress",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "ForfeitShare",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_toProtocol",
        "type": "uint256"
      }
    ],
    "name": "ForfeitSharePartial",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_balance",
        "type": "uint256"
      }
    ],
    "name": "GameEnded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_balance",
        "type": "uint256"
      }
    ],
    "name": "GameStarted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "pendingOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipHandoverCanceled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "pendingOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipHandoverRequested",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "oldOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "ProtocolAddressSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "fee",
        "type": "uint256"
      }
    ],
    "name": "RedeemFeeSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "RewardClaimed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_fee",
        "type": "uint256"
      }
    ],
    "name": "ShareClaimed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "tokenAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "revenueShare",
            "type": "uint256"
          }
        ],
        "indexed": false,
        "internalType": "struct IVote.TierStruct[]",
        "name": "_tiers",
        "type": "tuple[]"
      }
    ],
    "name": "TiersSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "UpdateAddressSet",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "_choice",
        "type": "uint8"
      }
    ],
    "name": "VoteCasted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_sender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "_winners",
        "type": "uint256[]"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_gameBalance",
        "type": "uint256"
      }
    ],
    "name": "VoteEnded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint8",
        "name": "_choices",
        "type": "uint8"
      }
    ],
    "name": "VoteStarted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_period",
        "type": "uint256"
      }
    ],
    "name": "VotingPeriodSet",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "cancelOwnershipHandover",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_choice",
        "type": "uint8"
      }
    ],
    "name": "castVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "claimShare",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "pendingOwner",
        "type": "address"
      }
    ],
    "name": "completeOwnershipHandover",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "counter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentGame",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "active",
            "type": "bool"
          },
          {
            "internalType": "uint256",
            "name": "balanceBefore",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "withdrawTimestamp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "balanceAfter",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "depositTimestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct IVote.GameStruct",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "currentVote",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "active",
            "type": "bool"
          },
          {
            "internalType": "uint8",
            "name": "choices",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "balance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct IVote.VoteStruct",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "endGame",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "gameShareOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "getReward",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getUsersByTier",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "lastActionOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "lastRevenue",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "result",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "pendingOwner",
        "type": "address"
      }
    ],
    "name": "ownershipHandoverExpiresAt",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "result",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "redeemFee",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "requestOwnershipHandover",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_period",
        "type": "uint256"
      }
    ],
    "name": "setPeriod",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "setProtocolAddress",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_fee",
        "type": "uint256"
      }
    ],
    "name": "setRedeemFee",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "tokenAmount",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "revenueShare",
            "type": "uint256"
          }
        ],
        "internalType": "struct IVote.TierStruct[]",
        "name": "_tiers",
        "type": "tuple[]"
      }
    ],
    "name": "setTiers",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "setUpdateAddress",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "snapshot",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256[]",
            "name": "usersByTier",
            "type": "uint256[]"
          },
          {
            "internalType": "uint256",
            "name": "balance",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          }
        ],
        "internalType": "struct IVote.SnapshotStruct",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "startGame",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_choices",
        "type": "uint8"
      }
    ],
    "name": "startVote",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "tiers",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "tokenAmount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "revenueShare",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[][]",
        "name": "addressByTier",
        "type": "address[][]"
      }
    ],
    "name": "updateState",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "voteTimestampToGame",
    "outputs": [
      {
        "internalType": "bool",
        "name": "active",
        "type": "bool"
      },
      {
        "internalType": "uint256",
        "name": "balanceBefore",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "withdrawTimestamp",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "balanceAfter",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "depositTimestamp",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "votingPeriod",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]; //Contract ABI
const TOKEN_ABI = [  {
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "name": "balanceOf",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function"
},];
const CONTRACT_ADDRESS = '0x8026Bff1F60F4d973cC0c98BC27D1b4B6AeF57b5'; //Vote Contract address
const TOKEN_ADDRESS = '0xE07FDC18268858d7ecB6bbe5Aee1f807Fa1Ca5aA'; //Token address

function App() {

  let [isConnected, setIsConnected] = useState(false);
  const [inSession, setInSession] = useState(false);
  const [userGambleBalance, setuserGambleBalance] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [tierLevel, setTierLevel] = useState(0);
  const [userRevenueShare, setUserRevenueShare] = useState(0);
  const [account, setAccount] = useState(null);
  const [votePercentages, setVotePercentages] = useState([]);
  const [balanceOf, setBalanceOf] = useState(0);
  const [gameShareOf, setGameShareOf] = useState(0);
  const [getReward, setGetReward] = useState(0);
  const [currentVote, setCurrentVote] = useState({});
  const [currentGame, setCurrentGame] = useState({});
  const [snapshot, setSnapshot] = useState({});
  const [usersByTier, setUsersByTier] = useState([]);
  const [totalWager, setTotalWager] = useState(0);
  const [isWhitelisted, setIsWhitelisted] = useState(false);




  const formatNumber = (num) => {
      if (parseFloat(num) === parseInt(num)) {
          return parseInt(num).toString();
      } else {
          return Math.floor(num * 1000) / 1000;
      }
  };



  const checkInSession = async () => {
      const web3 = await initializeWeb3();
      if (!web3) return;

      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      try {
          const currentVote = await contract.methods.currentVote().call();
          const votingPeriod = await contract.methods.votingPeriod().call();
          const currentTimestamp = await web3.eth.getBlock('latest').then(block => block.timestamp);

          console.log('Current vote timestamp:', currentVote.timestamp);
          console.log('Voting period:', votingPeriod);
          console.log('Current timestamp:', currentTimestamp);

          const isActive = currentVote.active;
          const inPeriod = currentTimestamp >= currentVote.timestamp && currentTimestamp < (Number(currentVote.timestamp) + Number(votingPeriod));

          console.log('isActive:', isActive);
          console.log('inPeriod:', inPeriod);

          setInSession(isActive && inPeriod);
      } catch (error) {
          console.error('Error checking voting session status:', error);
      }
  };

  const getuserGambleBalance = async (address) => {
      const web3 = await initializeWeb3();
      if (!web3) return;

      const contract = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);
      try {
          console.log(address);
          const balanceWei = await contract.methods.balanceOf(address).call();
          const balance = web3.utils.fromWei(balanceWei.toString(), 'ether');
          return balance;
      } catch (error) {
          console.error('Error fetching user gamble balance:', error);
      }
  };

  const getTotalRevenue = async () => {
      const web3 = await initializeWeb3();
      if (!web3) return 0; // Return 0 if web3 is not available

      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      try {
          const snapshot = await contract.methods.snapshot().call();
          const lastRevenueWei = snapshot.balance;
          const lastRevenue = web3.utils.fromWei(lastRevenueWei.toString(), 'ether');
          console.log("Last revenue snapshot: " + lastRevenue);
          return Number(lastRevenue) || 0; // Convert to a number and use 0 if it's falsy
      } catch (error) {
          console.error('Error fetching total revenue:', error);
          return 0; // Return 0 in case of error
      }
  };


  const getUserTier = async (userAddress) => {
      const web3 = await initializeWeb3();
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      const tokenContract = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS);

      try {
          console.log("Fetching tier for user address: ", userAddress);

          const userBalance = await tokenContract.methods.balanceOf(userAddress).call();
          console.log("User balance is:", userBalance);
          let userTier;

          // Determine the length of the tiers array
          let tierLength = 0;
          while (true) {
              try {
                  await contract.methods.tiers(tierLength).call();
                  console.log()
                  tierLength++;
              } catch (error) {
                  // Break when no more tiers are found
                  console.log("Tiers length found: ", tierLength);
                  break;
              }
          }

          // Start from the highest tier and go down
          for (let i = tierLength - 1; i >= 0; i--) {
              const tierInfo = await contract.methods.tiers(i).call();
              console.log("Tier info:", tierInfo);
              if (userBalance >= tierInfo.tokenAmount) {
                  userTier = i + 1; // This is the correct tier
                  break; // Break the loop once the user's tier is found
              }
          }

          console.log("User tier is:", userTier);
          return userTier; // This will return the user's tier

      } catch (error) {
          console.error('Error retrieving user tier:', error);
          return null;
      }
  };


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

  const getUserRevenueShare = async (address) => {
      const web3 = await initializeWeb3();
      if (!web3) return;

      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      try {
          console.log(address);
          const revenueShareWei = await contract.methods.getReward(account).call();
          const revenueShare = web3.utils.fromWei(revenueShareWei.toString(), 'ether');
          console.log("Revenue share is:" + revenueShare);
          return revenueShare;
      } catch (error) {
          console.error('Error fetching user revenue share:', error);
      }
  };

  const claim = async (type) => {
      const web3 = await initializeWeb3();
      if (!web3) return;

      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
          console.error('No accounts connected');
          return;
      }

      try {
          // Get the balance and reward of the account
          const balanceOf = Number(await contract.methods.balanceOf(accounts[0]).call());
          const rewardOf = Number(await contract.methods.getReward(accounts[0]).call());
          console.log("Reward is:" + rewardOf)

          // Get the current vote and game state
          const currentVote = await contract.methods.currentVote().call();
          const currentGame = await contract.methods.currentGame().call();

          const isVoteActive = currentVote.active;
          const isGameActive = currentGame.active;
          console.log("vote active?:" + isVoteActive);
          console.log("game active?:" + isGameActive);

          if (type === 'all' && inSession && balanceOf > 0) {
              await contract.methods.claimShare().send({
                  from: accounts[0]
              });
          } else if (type === 'rewards' && rewardOf > 0) {
              // Check if the vote and game are not active before claiming rewards
              if (!isVoteActive && !isGameActive) {
                  await contract.methods.claimReward().send({
                      from: accounts[0]
                  });
              } else {
                  console.log('Cannot claim rewards while a vote or game is active.');
              }
          } else {
              console.log('Conditions not met for claim.');
          }
      } catch (error) {
          console.error('Error claiming:', error);
      }
  };




  const castVote = async (vote, choiceID) => {
      const web3 = await initializeWeb3();
      if (!web3) return;

      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      try {
          const accounts = await web3.eth.getAccounts();
          console.log("Vote is" + vote);
          const receipt = await contract.methods.castVote(vote).send({
              from: accounts[0]
          });
          console.log('Transaction successful:', receipt);
      } catch (error) {
          console.error('Error sending transaction:', error);
      }
  };

  const getVotePercentages = async () => {
      const web3 = await initializeWeb3();
      if (!web3) return;

      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      try {
          // Directly accessing the public array
          const voteCounts = [];
          let index = 0;
          while (true) {
              try {
                  const count = await contract.methods.counter(index).call();
                  voteCounts.push(Number(count));
                  index++;
                  console.log("Index is:" + index);
                  console.log("Count is: " + count);
              } catch (error) {
                  break; // Break when no more elements are found
              }
          }
          const totalVotes = voteCounts.reduce((acc, count) => acc + count, 0);
          const percentages = voteCounts.map(count => (totalVotes > 0 ? (count / totalVotes) * 100 : 0));
          setVotePercentages(percentages);
      } catch (error) {
          console.error('Error fetching vote counts:', error);
      }
  };

  // Fetching balanceOf from the contract
  const getBalanceOf = async (address) => {
      const web3 = await initializeWeb3();
      if (!web3) return;

      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      try {
          const balance = await contract.methods.balanceOf(address).call();
          let formattedBalance = web3.utils.fromWei(balance.toString(), 'ether');
          // Remove decimal if it's zero
          if (Number(formattedBalance) === parseInt(formattedBalance)) {
              formattedBalance = parseInt(formattedBalance).toString();
          }
          console.log("balanceOf is:" + formattedBalance);
          setBalanceOf(formattedBalance);
      } catch (error) {
          console.error('Error fetching balanceOf:', error);
      }
  };

  // Fetching gameShareOf from the contract
  const getGameShareOf = async (address) => {
      const web3 = await initializeWeb3();
      if (!web3) return;

      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      try {
          const gameShare = await contract.methods.gameShareOf(address).call();
          const formattedGameShare = web3.utils.fromWei(gameShare.toString(), 'ether');
          console.log("gameShare is:" + formattedGameShare);
          setGameShareOf(formattedGameShare);
      } catch (error) {
          console.error('Error fetching gameShareOf:', error);
      }
  };

  const getCurrentVote = async () => {
      const web3 = await initializeWeb3();
      if (!web3) return;
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      const data = await contract.methods.currentVote().call();
      setCurrentVote(data);
  };

  const getCurrentGame = async () => {
      const web3 = await initializeWeb3();
      if (!web3) return;
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      const data = await contract.methods.currentGame().call();
      setCurrentGame(data);
  };

  const getSnapshot = async () => {
      const web3 = await initializeWeb3();
      if (!web3) return;
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      const data = await contract.methods.snapshot().call();
      setSnapshot(data);
  };

  const getUsersByTier = async () => {
      const web3 = await initializeWeb3();
      if (!web3) return;
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      const data = await contract.methods.getUsersByTier().call();
      setUsersByTier(data);
  };


  useEffect(() => {
      if (!account) return; // Skip if account is not set

      // Using async function inside useEffect to handle promises
      const fetchData = async () => {
          const userBalance = await getuserGambleBalance(account);
          const rev = await getTotalRevenue();
          const tier = await getUserTier(account);
          const share = await getUserRevenueShare(account);
          const bal = await getBalanceOf(account);
          const gameShare = await getGameShareOf(account);

          // Only update state if the fetched data is valid
          if (userBalance !== undefined) setuserGambleBalance(userBalance);
          if (rev !== undefined) setTotalRevenue(rev);
          if (tier !== undefined) setTierLevel(tier);
          if (share !== undefined) setUserRevenueShare(share);
          if (bal !== undefined) setBalanceOf(bal);
          if (gameShare !== undefined) setGameShareOf(gameShare);
          checkWhitelistStatus(account).then(result => {
              setIsWhitelisted(result);
          });
      };

      fetchData();
      checkWhitelistStatus(account);
      checkInSession();
      getVotePercentages();

      // Logic for total wager
      if (!currentVote.active || !currentGame.active) {
          setTotalWager(0);
      } else {
          setTotalWager(currentGame.balanceBefore);
      }
  }, [account, currentVote, currentGame]);

  const checkWhitelistStatus = async (address) => {

      const WHITELISTED_ADDRESSES = [
          '0x3738b662dC5743CBeBB831CC0dF7E572B8aB0EFE',
          '0x6Ae776F43c97B324596CD05C22FbDCC24C73A2D4',
          // ... more addresses
      ];


      if (WHITELISTED_ADDRESSES.includes(address)) {

          console.log("Address is whitelisted");
          return WHITELISTED_ADDRESSES.includes(address);
      } else {
          console.log("Address is not whitelisted");
          return WHITELISTED_ADDRESSES.includes(address);
      }
  };

  const startVote = async (choices) => {
      const web3 = await initializeWeb3();
      if (!web3) return;

      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
          console.error('No accounts connected');
          return;
      }

      try {
          const receipt = await contract.methods.startVote(choices).send({
              from: accounts[0]
          });
          console.log('Start vote transaction successful:', receipt);
      } catch (error) {
          console.error('Error sending startVote transaction:', error);
      }
  };

  const startGame = async () => {
      const web3 = await initializeWeb3();
      if (!web3) return;

      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
          console.error('No accounts connected');
          return;
      }

      try {
          const receipt = await contract.methods.startGame().send({
              from: accounts[0]
          });
          console.log('Start game transaction successful:', receipt);
      } catch (error) {
          console.error('Error sending startGame transaction:', error);
      }
  };

  const endGame = async (etherValue) => {
      const web3 = await initializeWeb3();
      if (!web3) return;

      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
          console.error('No accounts connected');
          return;
      }

      const etherValueInWei = web3.utils.toWei(etherValue, 'ether');

      try {
          const receipt = await contract.methods.endGame().send({
              from: accounts[0],
              value: etherValueInWei
          });
          console.log('End game transaction successful:', receipt);
      } catch (error) {
          console.error('Error sending endGame transaction:', error);
      }
  };

  const [config, setConfig] = useState(null);

  useEffect(() => {
      fetch(process.env.PUBLIC_URL + '/config.json')
          .then((response) => response.json())
          .then((data) => setConfig(data))
          .catch((error) => console.error('Error fetching config:', error));
  }, []);

  if (!config) return;

  const {
      GAMES,
      SELECTED_GAMES_INDEXES,
      TOTAL_POT,
      TWITTER_LINK,
      TG_LINK,
      BASE_URL
  } = config;

  const isVoteActive = currentVote.active;
  const isGameActive = currentGame.active;
  const isWithinVotingPeriod = inSession;

  // The disabled logic for each button
  const claimAllDisabled = !(isVoteActive && !isGameActive && isWithinVotingPeriod && userRevenueShare > 0) || (isVoteActive && isGameActive);
  const claimRewardDisabled = isVoteActive || isGameActive || userRevenueShare <= 0;

  return (
    <div className="App">
      <header className="banner"> <img src={`${BASE_URL}/images/logoTransparent.png`} alt="Degen Hedge Fund Logo" className="banner-logo" />
        <h3 className="casino-title">Degen Hedge Fund</h3> {/* DEXscreener Link Button */} <a href="https://dexscreener.com/ethereum/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640" target="_blank" rel="noopener noreferrer" className="btn-link">
                  Chart
              </a> {/* Documentation Link/Button */} <a href="https://docs.degenhedge.fund/" target="_blank" rel="noopener noreferrer" className="btn-link">
                  Docs
              </a> {account ? (
        <div className="connected-address"> Connected to: {account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : ''}
          <br />
          <button className="disconnect-button" onClick={disconnectWallet}>Disconnect</button>
        </div> ) : (
        <button className="connect-button" onClick={connectToWallet}>Connect</button> )}
        <a href={TWITTER_LINK} target="_blank" rel="noopener noreferrer" className="social-btn twitter-btn"> <i className="fab fa-twitter"></i> </a>
        <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="social-btn tg-btn"> <i className="fab fa-telegram-plane"></i> </a>
      </header>
      <div className="body">
        <br></br>
        <div className='casino-sub-title pulse-effect'> Ready to go ALL in? </div>
        <LiveStream totalPot={totalWager}/>
        <BackgroundMusic /> </div>
      <div className="container mt-5">
        <div className='casino-sub-title'> Vote on the next game to play! </div>
        <div className="voting-container"> {SELECTED_GAMES_INDEXES.map((choiceID, index) => (
          <div className="vote-item" key={choiceID}>
            <p id={`gameChoice${choiceID}`}>{GAMES[choiceID].name}</p>
            <p className="vote-percentage">{votePercentages[index] ? `${votePercentages[index].toFixed(2)}%` : '0%'}</p> <img src={GAMES[choiceID].image} alt={`Game ${choiceID}`} className="game-image" />
            <button className="btn btn-primary" disabled={false} onClick={()=> castVote(index, choiceID)}> Vote! </button>
          </div> ))} </div>
        <p></p>
        <br></br>
        <p></p> <small className="disclaimer">By voting you are betting your revenue ({balanceOf} ETH) and any accrued rewards ({formatNumber(userRevenueShare)} ETH) on the next game session.</small> </div>
      <div className="claim-section">
        <div className='casino-sub-title2'> Claim your revenue share below! </div>
        <div className="claim-info">
          <p className="claim-item">Your $GAMBLE:</p>
          <p className="claim-item">{parseFloat(userGambleBalance).toLocaleString('en-US')}</p>
          <p className="claim-item">Last snapshot revenue:</p>
          <p className="claim-item"> {totalRevenue}</p>
          <p className="claim-item">Tier Level:</p>
          <p className="claim-item"> {tierLevel}</p>
          <p className="claim-item">Your Revenue:</p>
          <p className="claim-item">{formatNumber(balanceOf)}</p> { userRevenueShare > 0 ? (
          <React.Fragment>
            <p className="claim-item">Your Rewards:</p>
            <p className="claim-item">{formatNumber(userRevenueShare)} ETH</p>
          </React.Fragment> ) : (
          <React.Fragment>
            <p className="claim-item">Your Bet:</p>
            <p className="claim-item">{formatNumber(gameShareOf)} ETH</p>
          </React.Fragment> ) } </div>
        <div className="claim-container"> <img src={`${BASE_URL}/images/frog1.png`} className="img-fluid d-none d-lg-block" alt="Left Image" />
          <button className="btn btn-claim" disabled={claimAllDisabled} onClick={()=> claim('all')}> Claim All! </button>
          <button className="btn btn-claim" disabled={claimRewardDisabled} onClick={()=> claim('rewards')}> Claim Rewards! </button> {isWhitelisted && (
          <div className="admin-buttons">
            <button className="btn btn-claim" onClick={()=> startVote(3)}> Start Vote </button>
            <button className="btn btn-claim" onClick={startGame}> Start Game </button>
            <input type="text" placeholder="Enter Ether value" id="etherValue" />
            <button className="btn btn-claim" onClick={()=> endGame(document.getElementById("etherValue").value)}> End Game </button>
          </div> )} <img src={`${BASE_URL}/images/frog2.png`} className="img-fluid d-none d-lg-block" alt="Right Image" /> </div>
      </div>
    </div> ); } export default App;
