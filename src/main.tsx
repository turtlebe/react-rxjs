import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { AppSetup } from 'AppSetup';
import './i18n';
import { LoadingBackdrop } from 'components/Backdrop/LoadingBackdrop';

const App = React.lazy(() => import('./App'));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppSetup>
      <Suspense fallback={<LoadingBackdrop loading />}>
        <App />
      </Suspense>
    </AppSetup>
  </React.StrictMode>
);
