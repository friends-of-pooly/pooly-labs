import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useContractRead } from 'wagmi'
import abi from '@pooly-cards/pooly-pfp-sol/abis/PoolyPFPRenderer.json'

const Home: NextPage = () => {
  

  const { data, isError, isLoading } = useContractRead(
    {
      addressOrName: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      contractInterface: abi,
    },
    'example',
  )

  const [isMounted,setIsMounted] = useState(false); // Need this for the react-tooltip

  useEffect(() => {
      setIsMounted(true);
  },[]);

  return (
    <div className=''>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: 12,
          position: 'absolute',
          right: 0,
        }}
      >
        <ConnectButton />
      </div>
      <div className='' style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}>
          {
            isMounted && !isError &&
            <div dangerouslySetInnerHTML={{ __html: data as unknown as string }} />
          }
      </div>
    </div>
  );
};

export default Home;
