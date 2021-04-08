import { getData } from 'clients';
import { createContext, useState, useContext, useEffect } from 'react';
import { ProductService } from 'services';
import { convertArrayToMapValue } from 'utils/ArrUtils';
import TagTypeProps from 'constants/TagTypeProps';

const SettingContext = createContext({});

export const SettingProvider = ({ children }) => {
  const [settingsTabs, setSettingsTabs] = useState(new Map());

  // config settings tabs
  const getSettingTabs = async () => {
    const settingsTagsResult = await ProductService.getSettingTags({});
    const data = getData(settingsTagsResult);
    const mapSlugToType = convertArrayToMapValue(data, 'slug', 'style');
    setSettingsTabs(mapSlugToType);
  };

  useEffect(() => {
    // load data settings
    if (settingsTabs.size === 0) getSettingTabs();
    //
  }, [settingsTabs.size]);

  const getStyleBySlugOfTag = (slug) =>
    TagTypeProps[settingsTabs.get(slug)] || TagTypeProps.default;

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
