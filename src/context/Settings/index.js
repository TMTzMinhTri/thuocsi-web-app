import { getData } from 'clients';
import { createContext, useState, useContext, useEffect } from 'react';
import { ProductService } from 'services';
import { convertArrayToMap } from 'utils/ArrUtils';

const SettingContext = createContext({});

export const SettingProvider = ({ children }) => {
  const [settingsTabs, setSettingsTabs] = useState(new Map());

  // config settings tabs
  const getSettingTabs = async () => {
    const settingsTagsResult = await ProductService.getSettingTags({});
    const data = getData(settingsTagsResult);
    const mapSlugToType = convertArrayToMap(data, 'slug');
    setSettingsTabs(mapSlugToType);
  };

  useEffect(() => {
    // load data settings
    if (settingsTabs.size === 0) getSettingTabs();

    //
  }, []);

  const getStyleBySlugOfTag = (slug) => settingsTabs.get(slug);

  return (
    <SettingContext.Provider
      value={{
        settingsTabs,
        getStyleBySlugOfTag,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export const useSetting = () => useContext(SettingContext);

export default {
  SettingContext,
  useSetting,
};
