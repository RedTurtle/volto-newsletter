import loadable from '@loadable/component';

/*--------------------------------
--- Toolbars ---
--- Mounted on every route via appExtras (match: ''), so they must stay
--- synchronous: their own permission check (content type + can_manage)
--- only runs once mounted, and wrapping them in loadable() previously
--- forced anonymous visitors to download the whole NewsletterManage
--- chunk (toolbars + action menus + send/subscriptions panels) on every
--- page just to find out the check fails.
---------------------------------*/
export { NewsletterChannelToolbar } from './NewsletterChannelToolbar';
export { NewsletterMessageToolbar } from './NewsletterMessageToolbar';

/*--------------------------------
--- BUNDLE Actions ---
--- Only opened from within a toolbar once it has already decided (via
--- the synchronous check above) that the current user can manage the
--- content, so it's safe to keep these lazy in their own chunk.
---------------------------------*/
export const ChannelActionsMenu = loadable(
  () =>
    import(/* webpackChunkName: "NewsletterActions" */ './ChannelActionsMenu'),
);
export const MessageActionsMenu = loadable(
  () =>
    import(/* webpackChunkName: "NewsletterActions" */ './MessageActionsMenu'),
);
export const ModalSend = loadable(
  () => import(/* webpackChunkName: "NewsletterActions" */ './ModalSend'),
);
export const ModalTestSend = loadable(
  () => import(/* webpackChunkName: "NewsletterActions" */ './ModalTestSend'),
);

/*--------------------------------
--- BUNDLE SendHistoryPanel ---
--- Only mounted on the /send-history route.
---------------------------------*/
export const SendHistoryPanel = loadable(
  () =>
    import(
      /* webpackChunkName: "NewsletterSendHistory" */ './SendHistoryPanel/SendHistoryPanel'
    ),
);

/*--------------------------------
--- BUNDLE SubscriptionsPanel ---
--- Only mounted on the /subscriptions route.
---------------------------------*/
export const SubscriptionsPanel = loadable(
  () =>
    import(
      /* webpackChunkName: "NewsletterSubscriptions" */ './SubscriptionsPanel/SubscriptionsPanel'
    ),
);
export const SubscriptionsPanelMenu = loadable(
  () =>
    import(
      /* webpackChunkName: "NewsletterSubscriptions" */ './SubscriptionsPanel/SubscriptionsPanelMenu'
    ),
);
