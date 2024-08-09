import React, { useState, createRef, useCallback, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Grid } from 'semantic-ui-react';
import { Form, Label, Input, Button } from 'design-react-kit';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';
import {
  SideMenu,
  PageHeader,
  RichTextSection,
  SkipToMainContent,
} from 'design-comuni-plone-theme/components/ItaliaTheme/View';
import {
  subscribeNewsletter,
  resetSubscribeNewsletter,
  unsubscribeNewsletter,
  resetUnsubscribeNewsletter,
} from '../actions';
import HoneypotWidget from './HoneypotWidget/HoneypotWidget';

const messages = defineMessages({
  subscribe: {
    id: 'Subscribe',
    defaultMessage: 'Iscriviti',
  },
  unsubscribe: {
    id: 'Unsubscribe',
    defaultMessage: 'Cancella iscrizione',
  },
  subscribeNewsletterHeader: {
    id: 'subscribeNewsletterHeader',
    defaultMessage: 'Iscriviti per ricevere la newsletter',
  },
  subscribeNewsletterLabel: {
    id: 'subscribeNewsletterLabel',
    defaultMessage:
      'Inserisci il tuo indirizzo email per iscriverti alla newsletter',
  },
  newsletterPrivacyStatement: {
    id: 'newsletterPrivacyStatement',
    defaultMessage: 'Informativa sulla privacy',
  },
  unsubscribeNewsletterHeader: {
    id: 'unsubscribeNewsletterHeader',
    defaultMessage: 'Rimuovi la tua iscrizione alla newsletter',
  },
  unsubscribeNewsletterLabel: {
    id: 'unsubscribeNewsletterLabel',
    defaultMessage:
      'Inserisci il tuo indirizzo email per cancellarti dalla newsletter',
  },
  newsletterSubscriptionThankyou: {
    id: 'newsletterSubscriptionThankyou',
    defaultMessage:
      "Grazie per esserti iscritto alla newsletter. Controlla la tua casella di posta elettronica per confermare l'iscrizione.",
  },
  newsletterUnsubscriptionConfirmation: {
    id: 'newsletterUnsubscriptionConfirmation',
    defaultMessage:
      "La tua richiesta di cancellazione dell'iscrizione alla newsletter è stata inviata. Controlla la tua casella di posta elettronica per confermare la cancellazione.",
  },
  newsletterSubscriptionError: {
    id: 'newsletterSubscriptionError',
    defaultMessage:
      "Si è verificato un errore durante l'invio della richiesta. Si prega di riprovare più tardi.",
  },
  user_subscribe_success: {
    id: 'user_subscribe_success',
    defaultMessage:
      "Richiesta di iscrizione inviata. Controlla la tua casella di posta elettronica per confermare l'iscrizione.",
  },
  invalid_captcha: {
    id: 'invalid_captcha',
    defaultMessage: 'Captcha non valido',
  },
  message_wrong_captcha: {
    id: 'message_wrong_captcha',
    defaultMessage: 'Captcha non valido',
  },
  user_already_subscribed: {
    id: 'user_already_subscribed',
    defaultMessage: "L'indirizzo email è già iscritto alla newsletter",
  },
  user_unsubscribe_success: {
    id: 'user_unsubscribe_success',
    defaultMessage:
      'Richiesta di cancellazione inviata. Controlla la tua casella di posta elettronica per confermare la cancellazione.',
  },
  unsubscribe_generic: {
    id: 'unsubscribe_generic',
    defaultMessage:
      'Errore durante la richiesta. Si prega di riprovare più tardi.',
  },
});

const Channel = ({ content, location }) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const {
    loading: subscribeLoading,
    loaded: subscribeLoaded,
    error: subscribeError,
  } = useSelector((state) => state.subscribeNewsletter);
  const {
    loading: unsubscribeLoading,
    loaded: unsubscribeLoaded,
    error: unsubscribeError,
  } = useSelector((state) => state.unsubscribeNewsletter);

  const [email, setEmail] = useState('');
  const [unsubEmail, setUnsubEmail] = useState('');
  const [subHoney, setSubHoney] = useState('');
  const [unsubHoney, setUnsubHoney] = useState('');

  const [sideMenuElements, setSideMenuElements] = useState(null);
  let documentBody = createRef();
  const path = location.pathname ?? '/';

  let fieldHoney = process.env.RAZZLE_HONEYPOT_FIELD;
  if (__CLIENT__) {
    fieldHoney = window.env.RAZZLE_HONEYPOT_FIELD;
  }

  const sendSubscribeForm = () => {
    dispatch(
      subscribeNewsletter(path, {
        email,
        [fieldHoney]: subHoney,
      }),
    );
  };

  const sendUnsubscribeForm = () => {
    dispatch(
      unsubscribeNewsletter(path, {
        email: unsubEmail,
        [fieldHoney]: unsubHoney,
      }),
    );
  };

  let action = path?.length > 1 ? path.replace(/\//g, '') : path;
  if (action?.length > 0) {
    action = action?.replace(/-/g, '_');
  } else {
    action = 'homepage';
  }

  // Populate side menu
  useEffect(() => {
    if (documentBody.current) {
      if (__CLIENT__) {
        setSideMenuElements(documentBody.current);
      }
    }
  }, [documentBody]);

  // Subscribe success
  useEffect(() => {
    if (subscribeLoaded && !subscribeError) {
      setEmail('');
      setSubHoney('');
      toast.success(intl.formatMessage(messages.user_subscribe_success));
      return () => {
        dispatch(resetSubscribeNewsletter());
      };
    }
  }, [dispatch, intl, subscribeLoaded, subscribeError]);

  // Unsubscribe success
  useEffect(() => {
    if (unsubscribeLoaded && !unsubscribeError) {
      setUnsubEmail('');
      setUnsubHoney('');
      toast.success(intl.formatMessage(messages.user_unsubscribe_success));
      return () => {
        dispatch(resetUnsubscribeNewsletter());
      };
    }
  }, [dispatch, intl, unsubscribeLoaded, unsubscribeError]);

  // Subscribe generic error
  // TODO TEST
  useEffect(() => {
    if (subscribeError) {
      const message =
        subscribeError?.response?.body?.message ||
        intl.formatMessage(messages.newsletterSubscriptionError);
      toast.error(message);
    }
  }, [subscribeError, intl]);

  // Unsubscribe generic error
  // TODO TEST
  useEffect(() => {
    if (unsubscribeError) {
      const message =
        unsubscribeError?.response?.body?.message ||
        intl.formatMessage(messages.newsletterSubscriptionError);
      toast.error(message);
    }
  }, [unsubscribeError, intl]);

  return (
    <>
      <div className="container px-4 my-4 channel-view">
        <SkipToMainContent />
        <PageHeader
          content={content}
          readingtime={null}
          showreadingtime={false}
          showdates={false}
          showtassonomiaargomenti={false}
        />

        <div className="row border-top row-column-border row-column-menu-left">
          <aside className="col-lg-4">
            {__CLIENT__ && (
              <SideMenu data={sideMenuElements} content_uid={content?.UID} />
            )}
          </aside>
          <section
            ref={documentBody}
            id="main-content-section"
            className="col-lg-8 it-page-sections-container"
          >
            {content.is_subscribable && (
              <section id="subscribe-form" className="it-page-section mb-5">
                <h2 id="header-subscribe-form" className="mb-3 h4">
                  {intl.formatMessage(messages.subscribeNewsletterHeader)}
                </h2>
                {subscribeLoaded && !subscribeError && (
                  <p>
                    {intl.formatMessage(
                      messages.newsletterSubscriptionThankyou,
                    )}
                  </p>
                )}

                <Form
                  action={`${path}/@subscribe-newsletter`}
                  className="form-newsletter"
                  method="post"
                  tag="form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!(subscribeLoaded && !subscribeError)) {
                      sendSubscribeForm();
                    }
                  }}
                >
                  {!(subscribeLoaded && !subscribeError) && (
                    <>
                      <Input
                        type="email"
                        id="subscribe-input-newsletter"
                        name="subscribe-input-newsletter"
                        placeholder="mail@example.com"
                        className="mb-3"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        label={intl.formatMessage(
                          messages.subscribeNewsletterLabel,
                        )}
                      />
                      <HoneypotWidget
                        updateFormData={(_, value) => {
                          setSubHoney(value);
                        }}
                        field={fieldHoney}
                      />
                      <Button
                        color="primary"
                        className="btn-icon"
                        type="submit"
                        tag="button"
                        icon={false}
                        disabled={subscribeLoading}
                      >
                        <Icon
                          icon="it-mail"
                          color="white"
                          padding={false}
                          size=""
                        />
                        <span>{intl.formatMessage(messages.subscribe)}</span>
                      </Button>
                    </>
                  )}
                </Form>
              </section>
            )}
            <RichTextSection
              tag_id={'text-body'}
              title={intl.formatMessage(messages.newsletterPrivacyStatement)}
              show_title={false}
              data={content.privacy}
            ></RichTextSection>
            <section id="unsubscribe-form" className="it-page-section mb-5">
              <h2 id="header-unsubscribe-form" className="mb-3 h4">
                {intl.formatMessage(messages.unsubscribeNewsletterHeader)}
              </h2>
              {unsubscribeLoaded && !unsubscribeError && (
                <p>
                  {intl.formatMessage(
                    messages.newsletterUnsubscriptionConfirmation,
                  )}
                </p>
              )}
              <Form
                action={`${path}/@unsubscribe-newsletter`}
                className="form-newsletter"
                method="post"
                tag="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!(unsubscribeLoaded && !unsubscribeError)) {
                    sendUnsubscribeForm();
                  }
                }}
              >
                {!(unsubscribeLoaded && !unsubscribeError) && (
                  <>
                    <Input
                      type="email"
                      id="unsubscribe-input-newsletter"
                      name="unsubscribe-input-newsletter"
                      placeholder="mail@example.com"
                      className="mb-3"
                      value={unsubEmail}
                      onChange={(e) => {
                        setUnsubEmail(e.target.value);
                      }}
                      label={intl.formatMessage(
                        messages.unsubscribeNewsletterLabel,
                      )}
                    />
                    <HoneypotWidget
                      updateFormData={(_, value) => {
                        setUnsubHoney(value);
                      }}
                      field={fieldHoney}
                    />
                    <Button
                      color="primary"
                      className="btn-icon"
                      type="submit"
                      tag="button"
                      icon={false}
                      disabled={unsubscribeLoading}
                    >
                      <Icon
                        icon="it-mail"
                        color="white"
                        padding={false}
                        size=""
                      />
                      <span>{intl.formatMessage(messages.unsubscribe)}</span>
                    </Button>
                  </>
                )}
              </Form>
            </section>
          </section>
        </div>
      </div>
    </>
  );
};

export default Channel;
