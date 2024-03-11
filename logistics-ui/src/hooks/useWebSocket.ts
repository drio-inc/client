import { useCallback, useEffect, useState } from "react";
import { webSocketService } from "@/state/services/webSocketService";

const useWebSocket = (topic: string) => {
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState<any>(null);

  const handleMessage = useCallback((body: any) => {
    setMessage(body);
  }, []);

  useEffect(() => {
    webSocketService.connect();

    const handleConnection = () => {
      setConnected(true);
      webSocketService.subscribeToTopic(topic, handleMessage);
    };

    const handleDisconnection = () => {
      setConnected(false);
    };

    webSocketService.setOnConnectCallback(handleConnection);
    webSocketService.setOnDisconnectCallback(handleDisconnection);

    return () => {
      webSocketService.unsubscribeFromTopic(topic);
      webSocketService.disconnect();
    };
  }, [handleMessage, topic]);

  return { connected, message };
};

export default useWebSocket;
