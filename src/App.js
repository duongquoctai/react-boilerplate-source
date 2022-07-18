import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ToastContainer } from 'react-toastify';
import { store } from './redux/store';
import routes, { renderRoutes } from '~/routes';
import ScrollToTop from '~/components/ScrollToTop';
import LoadingScreen from '~/components/LoadingScreen';
import ThemeConfig from './theme';
// ----------------------------------------------------------------------
import 'lazysizes';
import './_mock_api_';
import './utils/i18n';
import './utils/highlight';
import 'intersection-observer';
import 'simplebar/src/simplebar.css';
import 'slick-carousel/slick/slick.css';
import 'react-image-lightbox/style.css';
import 'react-quill/dist/quill.snow.css';
import 'slick-carousel/slick/slick-theme.css';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-toastify/dist/ReactToastify.css';

const history = createBrowserHistory();

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Provider store={store}>
        <ThemeConfig>
          <Router history={history}>
            <ScrollToTop />
            <ToastContainer
              position="bottom-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            {renderRoutes(routes)}
          </Router>
        </ThemeConfig>
      </Provider>
    </Suspense>
  );
}

export default App;
