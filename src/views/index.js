import loadable from '@loadable/component';

/*--------------------------------
--- BUNDLE VoltoFeedbackManage ---
---------------------------------*/
export const Message = loadable(() => import(/* webpackChunkName: "NewsletterMessageView" */ './Message'));
export const Channel = loadable(() => import(/* webpackChunkName: "NewsletterChannelView" */ './Channel'));
