import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function deployToMainnet(hardhat: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hardhat;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const contract = await deploy("PoolyPFP", {
    contract: "PoolyPFP",
    from: deployer,
    args: ["Pooly - PFP", "PFP"],
    skipIfAlreadyDeployed: true,
    log: true,
  });
}
