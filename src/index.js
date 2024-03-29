export {
  subscribeNewsletter,
  resetSubscribeNewsletter,
  unsubscribeNewsletter,
  resetUnsubscribeNewsletter,
  confirmNewsletterSubscription,
  resetConfirmNewsletterSubscription,
} from './actions';

import Channel from './views/Channel';
import Message from './views/Message';
import NewsletterConfirmSubscribe from './views/NewsletterConfirmSubscribe';
import NewsletterConfirmUnsubscribe from './views/NewsletterConfirmUnsubscribe';
import NewsletterConfirmView from './views/NewsletterConfirmView';

import {
  subscribeNewsletterReducer,
  unsubscribeNewsletterReducer,
  confirmNewsletterSubscriptionReducer,
} from './reducers';

const applyConfig = (config) => {
  config.addonReducers = {
    ...config.addonReducers,
    subscribeNewsletter: subscribeNewsletterReducer,
    unsubscribeNewsletter: unsubscribeNewsletterReducer,
    confirmNewsletterSubscription: confirmNewsletterSubscriptionReducer,
  };

  config.addonRoutes = [
    ...config.addonRoutes,
    {
      path: '/**/confirm-subscription',
      component: NewsletterConfirmView,
    },
  ];

  config.views.contentTypesViews = {
    ...config.views.contentTypesViews,
    Channel,
    Message,
  };

  return config;
};

export default applyConfig;

export {
  Channel,
  NewsletterConfirmSubscribe,
  NewsletterConfirmUnsubscribe,
  NewsletterConfirmView,
};
