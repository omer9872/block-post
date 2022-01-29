const PostStorage = artifacts.require("PostStorage");

module.exports = function (deployer) {
  deployer.deploy(PostStorage);
};
