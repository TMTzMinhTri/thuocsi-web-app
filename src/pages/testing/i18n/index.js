import React from 'react';
import { i18n } from 'i18n-lib';

const testingI18n = ({ t }) => (
  <>
    <h1>{t('login.NOT_FOUND')}</h1>
    <h1>{t('login.success')}</h1>
  </>
);

export default i18n.withTranslation('apiErrors')(testingI18n);
