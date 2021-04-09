import Rollbar from 'rollbar';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const SCROLLBAR_KEY = process.env.NEXT_PUBLIC_SCROLLBAR_KEY;

const getErrorMessage = (rollbar) => {
  const configure = (payload) => rollbar.configure(payload);
  const critical = (message) => rollbar.critical(message);
  const error = (message) => rollbar.error(message);
  const warning = (message) => rollbar.warning(message);
  const info = (message) => rollbar.info(message);
  const debug = (message) => rollbar.debug(message);
  return {
    configure,
    critical,
    error,
    warning,
    info,
    debug,
  };
};

const rollbar = new Rollbar({
  accessToken: SCROLLBAR_KEY,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const useRollbar = (user) =>
  getErrorMessage(
    rollbar.configure({
      payload: {
        person: {
          id: user?.customerID || '-----',
          username: user?.username || 'visitors',
        },
        buildId: publicRuntimeConfig.buildId,
      },
    }),
  );

export default useRollbar;
