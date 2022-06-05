import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function deployToMainnet(hardhat: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hardhat;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const contract = await deploy("PoolyPFPRenderer", {
    contract: "PoolyPFPRenderer",
    from: deployer,
    args: [],
    skipIfAlreadyDeployed: true,
    log: true,
  });
}
