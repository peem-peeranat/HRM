'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import NAVIGATION from './navigationConfig';
import demoTheme from './themeConfig';
import renderContent from './contentRenderer';

function DashboardLayoutBasic(props) {
  const { window } = props;

  const router = useDemoRouter('/employees'); // Set initial path

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  const content = renderContent(router.pathname);

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'ADOP',
        homeUrl: '/home',
      }}
    >
      <DashboardLayout>
        {content}
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBasic;
