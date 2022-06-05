import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { Contract, ContractFactory } from 'ethers';
import { ethers } from 'hardhat';

// import sigUtil from 'eth-sig-util';
const sigUtil = require('eth-sig-util');
import { fromHexString } from '../utils/fromHexString';
import createTypedMessage from '../utils/createTypedMessage';
const { getSigners } = ethers;

const CONTRACT_NAME = 'EIP4430Prototype';
const ownerHexPrivateKey = 'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';
const account1PrivKey = '59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d';
const account2PrivKey = '5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a';
const amountToSend = '10';

describe(CONTRACT_NAME, function () {
  let wallet1: SignerWithAddress;
  let wallet2: SignerWithAddress;
  let EIP4430Prototype: Contract;

  let EIP4430PrototypeFactory: ContractFactory;

  before(async () => {
    [wallet1, wallet2] = await getSigners();
    EIP4430PrototypeFactory = await ethers.getContractFactory(CONTRACT_NAME);
  });

  beforeEach(async () => {
    EIP4430Prototype = await EIP4430PrototypeFactory.deploy(wallet1.address);
  });

  /**
   * @test addPublisher(address rootPublisher)
   * -= Expected Behavior =-
   * 1. add `rootPublisher` to the list of publishers
   * 3. emit `RootPublisherAdded` event
   */
  describe('addPublisher(address rootPublisher)', () => {
    it('should SUCCEED to ADD a rootPublisher to AUTHORIZED_ROOT_PUBLISHERS', async () => {
      await expect(EIP4430Prototype.addPublisher(wallet2.address)).to.emit(
        EIP4430Prototype,
        'RootPublisherAdded',
      );
      expect(await EIP4430Prototype.isAuthorizedRootPublisher(wallet2.address)).to.be.true;
    });

    it('should REVERT due to UNAUTHORIZED access', async () => {
      expect(EIP4430Prototype.connect(wallet2).addPublisher(wallet2.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });
  });

  /**
   * @test removePublisher(address rootPublisher)
   * -= Expected Behavior =-
   * 1. remove `rootPublisher` from the list of publishers
   * 3. emit `RootPublisherRemoved` event
   */
  describe('removePublisher(address rootPublisher)', () => {
    it('should SUCCEED to REMOVE a rootPublisher from AUTHORIZED_ROOT_PUBLISHERS', async () => {
      await EIP4430Prototype.addPublisher(wallet2.address);
      expect(await EIP4430Prototype.isAuthorizedRootPublisher(wallet2.address)).to.be.true;
      await expect(EIP4430Prototype.removePublisher(wallet2.address)).to.emit(
        EIP4430Prototype,
        'RootPublisherRemoved',
      );
      expect(await EIP4430Prototype.isAuthorizedRootPublisher(wallet2.address)).to.be.false;
    });

    it('should REVERT due to UNAUTHORIZED access', async () => {
      expect(EIP4430Prototype.connect(wallet2).removePublisher(wallet2.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });
  });

  /**
   * @test setContractMethodMetadata(address target, bytes4 method, bytes4 language, string calldata data)
   * -= Expected Behavior =-
   * 1. add `rootPublisher` to the list of publishers
   * 3. emit `RootPublisherAdded` event
   */
  describe('setContractMethodMetadata(address target, bytes4 method, bytes4 language, string calldata data)', () => {
    it('should SUCCEED to SET contract method metadata', async () => {
      const target = '0x0000000000000000000000000000000000000001';
      const method = '0xa9059cbb';
      const language = '0x01010101';
      const data = 'A public goods API endpoint';

      await expect(
        EIP4430Prototype.setContractMethodMetadata(target, method, language, data),
      ).to.emit(EIP4430Prototype, 'ContractUpdated');
      const metadata = await EIP4430Prototype.getContractMethodMetadata(target, method, language);
      expect(metadata.description).to.eql(data);
    });

    it('should SUCCEED to SET contract method metadata FROM a DELEGATED WALLET', async () => {
      const target = '0x0000000000000000000000000000000000000001';
      const method = '0xa9059cbb';
      const language = '0x01010101';
      const data = 'A public goods API endpoint';

      // Construct Delegation
      const delegation = {
        delegate: wallet2.address,
        authority: '0x0000000000000000000000000000000000000000000000000000000000000000',
        caveats: [],
      };
      const typedMessage = createTypedMessage(
        EIP4430Prototype,
        delegation,
        'Delegation',
        CONTRACT_NAME,
      );
      const privateKey = fromHexString(ownerHexPrivateKey);
      const signature = sigUtil.signTypedData_v4(privateKey as Buffer, typedMessage);

      const signedDelegation = {
        signature,
        delegation,
      };

      const desiredTx = await EIP4430Prototype.populateTransaction.setContractMethodMetadata(
        target,
        method,
        language,
        data,
      );
      const delegatePrivateKey = fromHexString(account1PrivKey);
      const invocationMessage = {
        replayProtection: {
          nonce: '0x01',
          queue: '0x00',
        },
        batch: [
          {
            authority: [signedDelegation],
            transaction: {
              to: EIP4430Prototype.address,
              gasLimit: '10000000000000000',
              data: desiredTx.data,
            },
          },
        ],
      };
      const typedInvocationMessage = createTypedMessage(
        EIP4430Prototype,
        invocationMessage,
        'Invocations',
        CONTRACT_NAME,
      );

      const invocationSig = sigUtil.signTypedData_v4(
        delegatePrivateKey as Buffer,
        typedInvocationMessage,
      );
      const signedInvocation = {
        signature: invocationSig,
        invocations: invocationMessage,
      };

      await EIP4430Prototype.connect(wallet2).invoke([signedInvocation]);
      const metadata = await EIP4430Prototype.getContractMethodMetadata(target, method, language);
      expect(metadata.description).to.eql(data);
    });

    it('should REVERT due to UNAUTHORIZED access', async () => {
      expect(EIP4430Prototype.connect(wallet2).addPublisher(wallet2.address)).to.be.revertedWith(
        'Ownable: caller is not the owner',
      );
    });
  });
});
