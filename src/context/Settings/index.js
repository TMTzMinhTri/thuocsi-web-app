import { getData } from 'clients';
import setting from 'pages/api/setting';
import { createContext, useState, useContext, useEffect } from 'react';
import { ProductService } from 'services';
import { convertArrayToMap } from 'utils/ArrUtils';

const SettingContext = createContext({});

export const SettingProvider = ({ children }) => {
  const [settingsTabs, setSettingsTabs] = useState({});

  // config settings tabs
  const getSettingTabs = async () => {
    console.log('set setting tabs ', settingsTabs);
    const settingsTagsResult = await ProductService.getListTabs({});
    const data = getData(settingsTagsResult);
    const mapSlugToType = convertArrayToMap(data, 'slug');
    setSettingsTabs(mapSlugToType);
  };

  useEffect(() => {
    // load data settings
    if (!settingsTabs || settingsTabs.length === 0) getSettingTabs();

    //
  }, []);

  const getStyleBySlugOfTag = (slug) => {
    console.log('get styles by slug of tag');
    console.log(setting, slug);
    return settingsTabs[slug];
  };

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
