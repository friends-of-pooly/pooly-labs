import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useContractRead } from 'wagmi'
import abi from '@pooly-cards/pooly-pfp-sol/abis/PoolyPFPRenderer.json'

const Home: NextPage = () => {
  const { data, isError, isLoading } = useContractRead(
    {
      addressOrName: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
      contractInterface: abi,
    },
    'render',
    {
      args: [1],
    }
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
            <div className=''>
              <div dangerouslySetInnerHTML={{ __html: data as unknown as string }} />
            </div>
          }
          {/* {
            isMounted && !isError &&
            // <div dangerouslySetInnerHTML={{ __html: data2 as unknown as string }} />
            <img src={data2}  alt=""/>
          } */}
      </div>
    </div>
  );
};

export default Home;
