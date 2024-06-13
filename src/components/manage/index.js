import loadable from '@loadable/component';

/*--------------------------------
--- BUNDLE Views ---
---------------------------------*/

export const ChannelActionsMenu = loadable(
  () =>
    import(/* webpackChunkName: "NewsletterManage" */ './ChannelActionsMenu'),
);
export const MessageActionsMenu = loadable(
  () =>
    import(/* webpackChunkName: "NewsletterManage" */ './MessageActionsMenu'),
);
export const ModalSend = loadable(
  () => import(/* webpackChunkName: "NewsletterManage" */ './ModalSend'),
);
export const ModalTestSend = loadable(
  () => import(/* webpackChunkName: "NewsletterManage" */ './ModalTestSend'),
);
export const NewsletterChannelToolbar = loadable(
  () =>
    import(
      /* webpackChunkName: "NewsletterManage" */ './NewsletterChannelToolbar'
    ),
);
export const NewsletterMessageToolbar = loadable(
  () =>
    import(
      /* webpackChunkName: "NewsletterManage" */ './NewsletterMessageToolbar'
    ),
);

/*--------------------------------
--- BUNDLE SendHistoryPanel ---
---------------------------------*/
export const SendHistoryPanel = loadable(
  () =>
    import(
      /* webpackChunkName: "NewsletterManage" */ './SendHistoryPanel/SendHistoryPanel'
    ),
);
export const SubscriptionsPanel = loadable(
  () =>
    import(
      /* webpackChunkName: "NewsletterManage" */ './SubscriptionsPanel/SubscriptionsPanel'
    ),
);
export const SubscriptionsPanelMenu = loadable(
  () =>
    import(
      /* webpackChunkName: "NewsletterManage" */ './SubscriptionsPanel/SubscriptionsPanelMenu'
    ),
);
