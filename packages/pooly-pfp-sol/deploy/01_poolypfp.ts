import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function deployContracts(hardhat: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hardhat;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy("PoolyPFP", {
    contract: "PoolyPFP",
    from: deployer,
    args: ["Pooly - PFP", "PFP"],
    skipIfAlreadyDeployed: true,
    log: true,
  });
}
