import { HardhatRuntimeEnvironment } from "hardhat/types";

export default async function deployContracts(hardhat: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hardhat;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const token = await deploy("ERC20", {
    contract: "Token",
    from: deployer,
    args: ['PublicGoods Protocol', 'PGP'],
    skipIfAlreadyDeployed: true,
    log: true,
  });
  
  const svgColor = await deploy("SVGColor", {
    contract: "SVGColor",
    from: deployer,
    args: [],
    skipIfAlreadyDeployed: true,
    log: true,
  });

  await deploy("PoolyPFPRenderer", {
    contract: "PoolyPFPRenderer",
    from: deployer,
    args: [token.address, svgColor.address],
    skipIfAlreadyDeployed: true,
    log: true,
  });
}
