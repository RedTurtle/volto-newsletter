import loadable from '@loadable/component';

/*--------------------------------
--- BUNDLE VoltoFeedbackManage ---
---------------------------------*/
export const NewsletterMessageToolbar = loadable(
  () => import(/* webpackChunkName: "NewsletterMessageView" */ './NewsletterMessageToolbar'), //questo è stato messo in VoltoFeedbackView altrimenti se lo mettiamo in VoltoFeedbackManage viene giu tutto il bundle VoltoFeedbackManage anche da anonimo, perchè questo componente è caricato con appExtras per il path ''
);

export const MessageActionsMenu = loadable(
  () => import(/* webpackChunkName: "NewsletterMessageView" */ './MessageActionsMenu'), //questo è stato messo in VoltoFeedbackView altrimenti se lo mettiamo in VoltoFeedbackManage viene giu tutto il bundle VoltoFeedbackManage anche da anonimo, perchè questo componente è caricato con appExtras per il path ''
);
