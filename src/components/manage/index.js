import loadable from '@loadable/component';

/*--------------------------------
--- BUNDLE Views ---
---------------------------------*/

export const ChannelActionsMenu = loadable(() => import(/* webpackChunkName: "NewsletterChannelView" */ './ChannelActionsMenu'));
export const MessageActionsMenu = loadable(() => import(/* webpackChunkName: "NewsletterMessageView" */ './MessageActionsMenu'));
export const ModalSend = loadable(() => import(/* webpackChunkName: "NewsletterMessageView" */ './ModalSend'));
export const ModalTestSend = loadable(() => import(/* webpackChunkName: "NewsletterMessageView" */ './ModalTestSend'));
export const NewsletterChannelToolbar = loadable(() => import(/* webpackChunkName: "NewsletterChannelView" */ './NewsletterChannelToolbar'));
export const NewsletterMessageToolbar = loadable(() => import(/* webpackChunkName: "NewsletterMessageView" */ './NewsletterMessageToolbar'));

/*--------------------------------
--- BUNDLE SendHistoryPanel ---
---------------------------------*/
export const SendHistoryPanel = loadable(() => import(/* webpackChunkName: "ChannelManage" */ './SendHistoryPanel/SendHistoryPanel'));
export const SendHistoryPanelMenu = loadable(() => import(/* webpackChunkName: "ChannelManage" */ './SendHistoryPanel/SendHistoryPanelMenu'));
export const SubscriptionsPanel = loadable(() => import(/* webpackChunkName: "ChannelManage" */ './SubscriptionsPanel/SubscriptionsPanel'));
export const SubscriptionsPanelMenu = loadable(() => import(/* webpackChunkName: "ChannelManage" */ './SubscriptionsPanel/SubscriptionsPanelMenu'));
