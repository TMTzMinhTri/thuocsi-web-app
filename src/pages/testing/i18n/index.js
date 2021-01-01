import React from 'react';
import { i18n } from 'i18n-lib';

const testingI18n = ({ t }) => {
  console.log('testting I18n');

  return (
    <>
      <h1>{t('loginNotFound')}</h1>
      <h1>{t('error')}</h1>
    </>
  );
};

export default i18n.withTranslation('apiErrors')(testingI18n);
