export { subscribeNewsletter, resetSubscribeNewsletter, unsubscribeNewsletter, resetUnsubscribeNewsletter, confirmNewsletterSubscription, resetConfirmNewsletterSubscription } from './actions';

import { SendHistoryPanel, SubscriptionsPanel } from './components/manage';
import { Message, Channel } from './views';
import NewsletterConfirmSubscribe from './views/NewsletterConfirmSubscribe';
import NewsletterConfirmUnsubscribe from './views/NewsletterConfirmUnsubscribe';
import NewsletterConfirmView from './views/NewsletterConfirmView';
import MessageFilterBlocks from './config/MessageFilterBlocks';
import { NewsletterMessageToolbar, MessageActionsMenu, NewsletterChannelToolbar, ChannelActionsMenu } from './components/manage';
import { subscribeNewsletterReducer, unsubscribeNewsletterReducer, confirmNewsletterSubscriptionReducer, messageSendReducer, messageTestSendReducer, deleteAllSendHistoryReducer, getSendHistoryReducer, deleteSendHistoryReducer, deleteAllSubscriptionsReducer, getSubscriptionsReducer, deleteSubscriptionsReducer, addSubscriptionReducer, exportSubscriptionsReducer, importSubscriptionsReducer } from './reducers';
const applyConfig = (config) => {
  config.addonReducers = {
    ...config.addonReducers,
    subscribeNewsletter: subscribeNewsletterReducer,
    unsubscribeNewsletter: unsubscribeNewsletterReducer,
    confirmNewsletterSubscription: confirmNewsletterSubscriptionReducer,
    messageSend: messageSendReducer,
    messageTestSend: messageTestSendReducer,
    deleteAllSendHistory: deleteAllSendHistoryReducer,
    getSendHistory: getSendHistoryReducer,
    deleteSendHistory: deleteSendHistoryReducer,
    deleteAllSubscriptions: deleteAllSubscriptionsReducer,
    getSubscriptions: getSubscriptionsReducer,
    deleteSubscriptions: deleteSubscriptionsReducer,
    addSubscription: addSubscriptionReducer,
    exportSubscriptions: exportSubscriptionsReducer,
    importSubscriptions: importSubscriptionsReducer,
  };

  config.addonRoutes = [
    ...config.addonRoutes,
    {
      path: '/**/confirm-subscription',
      component: NewsletterConfirmView,
    },
    {
      path: '/**/send-history',
      component: SendHistoryPanel,
    },
    {
      path: '/**/subscriptions',
      component: SubscriptionsPanel,
    },
  ];

  config.settings.nonContentRoutes = [...config.settings.nonContentRoutes, /\/send-history$/, /\/subscriptions$/];

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
    {
      match: '',
      component: NewsletterChannelToolbar,
    },
  ];

  config.settings.additionalToolbarComponents = {
    ...(config.settings.additionalToolbarComponents || {}),
    messageActions: { component: MessageActionsMenu, wrapper: null },
    channelActions: { component: ChannelActionsMenu, wrapper: null },
  };

  return config;
};

export default applyConfig;

export { Channel, NewsletterConfirmSubscribe, NewsletterConfirmUnsubscribe, NewsletterConfirmView };
