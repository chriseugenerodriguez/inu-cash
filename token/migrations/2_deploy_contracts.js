const uniCash = artifacts.require("UniCash");
const multiSigWallet = artifacts.require("MultiSigWallet");
const proxy = artifacts.require("Proxy");

module.exports = async function (deployer) {
  const _uniCash = await uniCash.deployed();
  const _multiSigWallet = await multiSigWallet.deployed();
  const _proxy = await proxy.deployed();

  await deployer.deploy(uniCash);
  await deployer.deploy(multiSigWallet);
  await deployer.deploy(
    _proxy,
    _uniCash.address
  );

  console.log("Deployed token => ", _uniCash.address);
  console.log("Deployed multiSigWallet => ", _multiSigWallet.address);
  console.log("Deployed proxy => ", _proxy.address);
};