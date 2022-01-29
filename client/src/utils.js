import Web3 from "web3";
import PostStorage from "./contracts/PostStorage.json";

const customEvent = new CustomEvent('web3init', { detail: { isInitialized: true } });

export class PostStorageContract {

  web3 = undefined;
  accounts = [];
  contract = undefined;

  constructor() {
    this.getWeb3()
      .then(async (w3) => {
        // set web3
        this.web3 = w3;
        console.log("web3 initialized...");
        // set accounts...
        const acc = await w3.eth.getAccounts();
        this.accounts = acc;
        console.log("accounts initialized...");
        // set contract...
        const networkId = await w3.eth.net.getId();
        const deployedNetwork = PostStorage.networks[networkId];
        const instance = new w3.eth.Contract(
          PostStorage.abi,
          deployedNetwork && deployedNetwork.address,
        );
        this.contract = instance;
        console.log("contract initialized...");
        document.dispatchEvent(customEvent);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getIsInitialized() {
    return this.web3 && this.contract && this.accounts.length > 0;
  }

  getUsername = async () => {
    if (this.web3 && this.contract) {
      return await this.contract.methods.getUsername(this.accounts[0]).call()
    } else {
      return undefined
    }
  }

  setUsername = (username) => {
    if (this.web3 && this.contract) {
      this.contract.methods.setUsername(username).send({ from: this.accounts[0] })
        .then(_ => {
          return true
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  getWeb3 = () => {
    return new Promise((resolve, reject) => {
      window.addEventListener("load", async () => {

        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          try {
            await window.ethereum.enable();
            resolve(web3);
          } catch (error) {
            reject(error);
          }
        }

        else if (window.web3) {
          const web3 = window.web3;
          console.log("Injected web3 detected.");
          resolve(web3);
        }

        else {
          const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
          const web3 = new Web3(provider);
          console.log("No web3 instance injected, using Local web3.");
          resolve(web3);
        }

      });
    })
  }

}
