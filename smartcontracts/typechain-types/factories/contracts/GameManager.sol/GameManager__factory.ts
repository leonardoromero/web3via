/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  GameManager,
  GameManagerInterface,
} from "../../../contracts/GameManager.sol/GameManager";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_trustedManager",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "InsuficientGameBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidPrize",
    type: "error",
  },
  {
    inputs: [],
    name: "NoPrizeOrAlreadyClaimed",
    type: "error",
  },
  {
    inputs: [],
    name: "Unauthorized",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "prize",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "GameCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "GameResult",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "prize",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "winner",
        type: "address",
      },
    ],
    name: "PrizeClaimed",
    type: "event",
  },
  {
    inputs: [],
    name: "NFT",
    outputs: [
      {
        internalType: "contract IERC721Mintable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_winner",
        type: "address",
      },
    ],
    name: "airdropPrize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newNFTAddress",
        type: "address",
      },
    ],
    name: "changeNFTAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newManager",
        type: "address",
      },
    ],
    name: "changeTrustedManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "claimPrize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "prize",
        type: "uint256",
      },
    ],
    name: "createGame",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "gamePrize",
    outputs: [
      {
        internalType: "uint256",
        name: "prize",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "gameWinners",
    outputs: [
      {
        internalType: "address[]",
        name: "winners",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "games",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "prize",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "winner",
        type: "address",
      },
    ],
    name: "prizeGameWinner",
    outputs: [
      {
        internalType: "uint256",
        name: "prize",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "address[]",
        name: "_winners",
        type: "address[]",
      },
    ],
    name: "publishGameResult",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedManager",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001495380380620014958339818101604052810190620000379190620000e8565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506200011a565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000620000b08262000083565b9050919050565b620000c281620000a3565b8114620000ce57600080fd5b50565b600081519050620000e281620000b7565b92915050565b6000602082840312156200010157620001006200007e565b5b60006200011184828501620000d1565b91505092915050565b61136b806200012a6000396000f3fe6080604052600436106100a75760003560e01c80637bdd449c116100645780637bdd449c146101bf5780637c0b8de2146101fc57806386261faf14610227578063d709815414610252578063d96357091461027b578063e2080beb146102a4576100a7565b8063117a5b90146100ac5780631f7254f3146100eb57806333711cf814610114578063340a76ef1461013d57806360104cef1461016657806368010c8614610182575b600080fd5b3480156100b857600080fd5b506100d360048036038101906100ce9190610cd5565b6102e1565b6040516100e293929190610d52565b60405180910390f35b3480156100f757600080fd5b50610112600480360381019061010d9190610db5565b61032b565b005b34801561012057600080fd5b5061013b60048036038101906101369190610f4e565b6103d6565b005b34801561014957600080fd5b50610164600480360381019061015f9190610faa565b6105cd565b005b610180600480360381019061017b9190610fd7565b610696565b005b34801561018e57600080fd5b506101a960048036038101906101a49190610cd5565b61079c565b6040516101b69190611017565b60405180910390f35b3480156101cb57600080fd5b506101e660048036038101906101e19190610cd5565b6107bc565b6040516101f391906110f0565b60405180910390f35b34801561020857600080fd5b50610211610860565b60405161021e9190611171565b60405180910390f35b34801561023357600080fd5b5061023c610886565b604051610249919061118c565b60405180910390f35b34801561025e57600080fd5b5061027960048036038101906102749190610cd5565b6108aa565b005b34801561028757600080fd5b506102a2600480360381019061029d9190610faa565b6108b7565b005b3480156102b057600080fd5b506102cb60048036038101906102c69190610db5565b61097f565b6040516102d89190611017565b60405180910390f35b60026020528060005260406000206000915090508060000154908060010154908060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905083565b816002600082815260200190815260200160002060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146103c7576040517f82b4290000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6103d183836109dd565b505050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461045b576040517f82b4290000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60005b815181101561059157600260008481526020019081526020016000206003018282815181106104905761048f6111a7565b5b60200260200101519080600181540180825580915050600190039060005260206000200160009091909190916101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600260008481526020019081526020016000206001015460026000858152602001908152602001600020600401600084848151811061053a576105396111a7565b5b602002602001015173ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508061058a90611205565b905061045e565b507fdd70a6ea8a03765f9fb41f847122dcaab5764ecb37187278123ecb3a09180088826040516105c19190611017565b60405180910390a15050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610652576040517f82b4290000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b80600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b803410156106d0576040517f5f12e2ee00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b336002600084815260200190815260200160002060020160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060026000848152602001908152602001600020600101819055503460026000848152602001908152602001600020600001819055507f4fbf25982cc7ba607825ed540f0e46f875ebfffe4a209e9de3c588906aabd77b82823433604051610790949392919061124d565b60405180910390a15050565b600060026000838152602001908152602001600020600101549050919050565b60606002600083815260200190815260200160002060030180548060200260200160405190810160405280929190818152602001828054801561085457602002820191906000526020600020905b8160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001906001019080831161080a575b50505050509050919050565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6108b481336109dd565b50565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461093c576040517f82b4290000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050565b60006002600084815260200190815260200160002060040160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60006002600084815260200190815260200160002060040160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060006002600085815260200190815260200160002060000154905060008211610a8a576040517f1314196500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81811015610ac4576040517f2a1c3a3f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81600260008681526020019081526020016000206000016000828254610aea9190611292565b9250508190555060008373ffffffffffffffffffffffffffffffffffffffff1683604051610b17906112f7565b60006040518083038185875af1925050503d8060008114610b54576040519150601f19603f3d011682016040523d82523d6000602084013e610b59565b606091505b5050905080610b6757600080fd5b600073ffffffffffffffffffffffffffffffffffffffff16600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614610c4b57600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16636a627842856040518263ffffffff1660e01b8152600401610c18919061118c565b600060405180830381600087803b158015610c3257600080fd5b505af1158015610c46573d6000803e3d6000fd5b505050505b7fbfb36529287d5a1dcbfbbc958f0a7337a1f5bca269edc737da0be1be702f22518385604051610c7c92919061130c565b60405180910390a15050505050565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b610cb281610c9f565b8114610cbd57600080fd5b50565b600081359050610ccf81610ca9565b92915050565b600060208284031215610ceb57610cea610c95565b5b6000610cf984828501610cc0565b91505092915050565b610d0b81610c9f565b82525050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610d3c82610d11565b9050919050565b610d4c81610d31565b82525050565b6000606082019050610d676000830186610d02565b610d746020830185610d02565b610d816040830184610d43565b949350505050565b610d9281610d31565b8114610d9d57600080fd5b50565b600081359050610daf81610d89565b92915050565b60008060408385031215610dcc57610dcb610c95565b5b6000610dda85828601610cc0565b9250506020610deb85828601610da0565b9150509250929050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610e4382610dfa565b810181811067ffffffffffffffff82111715610e6257610e61610e0b565b5b80604052505050565b6000610e75610c8b565b9050610e818282610e3a565b919050565b600067ffffffffffffffff821115610ea157610ea0610e0b565b5b602082029050602081019050919050565b600080fd5b6000610eca610ec584610e86565b610e6b565b90508083825260208201905060208402830185811115610eed57610eec610eb2565b5b835b81811015610f165780610f028882610da0565b845260208401935050602081019050610eef565b5050509392505050565b600082601f830112610f3557610f34610df5565b5b8135610f45848260208601610eb7565b91505092915050565b60008060408385031215610f6557610f64610c95565b5b6000610f7385828601610cc0565b925050602083013567ffffffffffffffff811115610f9457610f93610c9a565b5b610fa085828601610f20565b9150509250929050565b600060208284031215610fc057610fbf610c95565b5b6000610fce84828501610da0565b91505092915050565b60008060408385031215610fee57610fed610c95565b5b6000610ffc85828601610cc0565b925050602061100d85828601610cc0565b9150509250929050565b600060208201905061102c6000830184610d02565b92915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b61106781610d31565b82525050565b6000611079838361105e565b60208301905092915050565b6000602082019050919050565b600061109d82611032565b6110a7818561103d565b93506110b28361104e565b8060005b838110156110e35781516110ca888261106d565b97506110d583611085565b9250506001810190506110b6565b5085935050505092915050565b6000602082019050818103600083015261110a8184611092565b905092915050565b6000819050919050565b600061113761113261112d84610d11565b611112565b610d11565b9050919050565b60006111498261111c565b9050919050565b600061115b8261113e565b9050919050565b61116b81611150565b82525050565b60006020820190506111866000830184611162565b92915050565b60006020820190506111a16000830184610d43565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061121082610c9f565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8203611242576112416111d6565b5b600182019050919050565b60006080820190506112626000830187610d02565b61126f6020830186610d02565b61127c6040830185610d02565b6112896060830184610d43565b95945050505050565b600061129d82610c9f565b91506112a883610c9f565b92508282039050818111156112c0576112bf6111d6565b5b92915050565b600081905092915050565b50565b60006112e16000836112c6565b91506112ec826112d1565b600082019050919050565b6000611302826112d4565b9150819050919050565b60006040820190506113216000830185610d02565b61132e6020830184610d43565b939250505056fea26469706673582212203271b604e8af2b9a86d52f20644b4b34d2125278521aa64f0581ee8f39645b4c64736f6c63430008120033";

type GameManagerConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GameManagerConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class GameManager__factory extends ContractFactory {
  constructor(...args: GameManagerConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _trustedManager: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<GameManager> {
    return super.deploy(
      _trustedManager,
      overrides || {}
    ) as Promise<GameManager>;
  }
  override getDeployTransaction(
    _trustedManager: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_trustedManager, overrides || {});
  }
  override attach(address: string): GameManager {
    return super.attach(address) as GameManager;
  }
  override connect(signer: Signer): GameManager__factory {
    return super.connect(signer) as GameManager__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GameManagerInterface {
    return new utils.Interface(_abi) as GameManagerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): GameManager {
    return new Contract(address, _abi, signerOrProvider) as GameManager;
  }
}
