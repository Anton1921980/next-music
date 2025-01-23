const PING_INTERVAL = 4 * 60 * 1000; // 4 minutes

export const startKeepAlive = () => {
  const pingServer = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ping`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
    } catch (error) {
      console.error('Ping failed:', error);
    }
  };

  // Initial ping
  pingServer();

  // Set up interval for subsequent pings
  const intervalId = setInterval(pingServer, PING_INTERVAL);

  // Cleanup function
  return () => clearInterval(intervalId);
};
