export { subscribeNewsletter, resetSubscribeNewsletter, unsubscribeNewsletter, resetUnsubscribeNewsletter, confirmNewsletterSubscription, resetConfirmNewsletterSubscription } from './actions';

import Channel from './views/Channel';
import Message from './views/Message';
import NewsletterConfirmSubscribe from './views/NewsletterConfirmSubscribe';
import NewsletterConfirmUnsubscribe from './views/NewsletterConfirmUnsubscribe';
import NewsletterConfirmView from './views/NewsletterConfirmView';

import subscribeSVG from './icons/subscribe.svg';
import NewsletterSubscribeView from 'volto-newsletter/components/Blocks/NewsletterSubscribe/View';
import NewsletterSubscribeEdit from 'volto-newsletter/components/Blocks/NewsletterSubscribe/Edit';

import { subscribeNewsletterReducer, unsubscribeNewsletterReducer, confirmNewsletterSubscriptionReducer } from './reducers';

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

  config.blocks.blocksConfig = {
    ...config.blocks.blocksConfig,
    'newsletter-subscribe': {
      id: 'newsletter-subscribe',
      title: 'Iscrizione newsletter',
      icon: subscribeSVG,
      group: 'newsletter',
      view: NewsletterSubscribeView,
      edit: NewsletterSubscribeEdit,
      restricted: false,
      mostUsed: false,
      security: {
        addPermission: [],
        view: [],
      },
      sidebarTab: 1,
    },
  };
  config.blocks.groupBlocksOrder.push({ id: 'newsletter', title: 'Newsletter' });

  return config;
};

export default applyConfig;

export { Channel, NewsletterConfirmSubscribe, NewsletterConfirmUnsubscribe, NewsletterConfirmView };
