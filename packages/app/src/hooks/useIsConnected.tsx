import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

const useIsConnected = () => {
  const { isConnected: _isConnected } = useAccount();
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    setIsConnected(_isConnected);
  }, [_isConnected]);
  return { isConnected };
};

export default useIsConnected;
