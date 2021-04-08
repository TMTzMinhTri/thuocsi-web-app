import Rollbar from 'rollbar';

export const SCROLLBAR_KEY = process.env.NEXT_PUBLIC_SCROLLBAR_KEY;
const getErrorMessage = (rollbar) => {
  const configure = (payload) => rollbar.configure(payload);
  const critical = (payload) => rollbar.critical(payload);
  const error = (payload) => rollbar.error(payload);
  const warning = (payload) => rollbar.warning(payload);
  const info = (payload) => rollbar.info(payload);
  const debug = (payload) => rollbar.debug(payload);
  return {
    configure,
    critical,
    error,
    warning,
    info,
    debug,
  };
};

const useRollbar = () => {
  const rollbar = new Rollbar({
    accessToken: SCROLLBAR_KEY,
    captureUncaught: true,
    captureUnhandledRejections: true,
  });
  return getErrorMessage(rollbar);
};

export default useRollbar;
