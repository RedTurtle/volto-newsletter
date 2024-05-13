export { subscribeNewsletter, resetSubscribeNewsletter, unsubscribeNewsletter, resetUnsubscribeNewsletter, confirmNewsletterSubscription, resetConfirmNewsletterSubscription } from './actions';

import Channel from './views/Channel';
import { Message } from './views';
import NewsletterConfirmSubscribe from './views/NewsletterConfirmSubscribe';
import NewsletterConfirmUnsubscribe from './views/NewsletterConfirmUnsubscribe';
import NewsletterConfirmView from './views/NewsletterConfirmView';
import MessageFilterBlocks from './config/MessageFilterBlocks';
import { NewsletterMessageToolbar, MessageActionsMenu } from './components/manage';
import { subscribeNewsletterReducer, unsubscribeNewsletterReducer, confirmNewsletterSubscriptionReducer, messageSendReducer, messageTestSendReducer } from './reducers';

const applyConfig = (config) => {
  config.addonReducers = {
    ...config.addonReducers,
    subscribeNewsletter: subscribeNewsletterReducer,
    unsubscribeNewsletter: unsubscribeNewsletterReducer,
    confirmNewsletterSubscription: confirmNewsletterSubscriptionReducer,
    messageSend: messageSendReducer,
    messageTestSend: messageTestSendReducer,
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

  config.settings.appExtras = [
    ...config.settings.appExtras,
    { match: '/**/add', component: MessageFilterBlocks, props: {} },
    { match: '/**/edit', component: MessageFilterBlocks, props: {} },
    {
      match: '',
      component: NewsletterMessageToolbar,
    },
  ];

  config.settings.additionalToolbarComponents = {
    ...(config.settings.additionalToolbarComponents || {}),
    messageActions: { component: MessageActionsMenu, wrapper: null },
  };

  return config;
};

export default applyConfig;

export { Channel, NewsletterConfirmSubscribe, NewsletterConfirmUnsubscribe, NewsletterConfirmView };
