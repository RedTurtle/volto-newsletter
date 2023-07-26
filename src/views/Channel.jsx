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
  RichTextArticle,
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
  subscribeNewsletterLabel: {
    id: 'Iscriviti per ricevere la newsletter',
    defaultMessage: 'Iscriviti per riceverla',
  },
  newsletterPrivacyStatement: {
    id: 'newsletterPrivacyStatement',
    defaultMessage: 'Informativa sulla privacy',
  },
  unsubscribeNewsletterLabel: {
    id: 'unsubscribeNewsletterLabel',
    defaultMessage: 'Rimuovi la tua iscrizione alla newsletter',
  },
  newsletterSubscriptionThankyou: {
    id: 'newsletterSubscriptionThankyou',
    defaultMessage:
      'Grazie per esserti iscritto alla newsletter. Controlla la tua casella di posta elettronica per verificare la tua iscrizione.',
  },
  newsletterUnsubscriptionConfirmation: {
    id: 'newsletterUnsubscriptionConfirmation',
    defaultMessage:
      "La tua richiesta di cancellazione dell'iscrizione alla newsletter è stata inviata. Controlla la tua casella di posta elettronica per verificare l'operazione.",
  },
  newsletterSubscriptionError: {
    id: 'newsletterSubscriptionError',
    defaultMessage:
      "Si è verificato un errore durante l'invio della richiesta. Si prega di riprovare più tardi.",
  },
  user_subscribe_success: {
    id: 'user_subscribe_success',
    defaultMessage: 'Richiesta di iscrizione inviata',
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
    defaultMessage: 'Richiesta di cancellazione inviata',
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
    result: subscribeResult,
  } = useSelector((state) => state.subscribeNewsletter);
  const { status: subscribeStatus, errors: subscribeErrors = [] } =
    subscribeResult ?? {};

  const {
    loading: unsubscribeLoading,
    loaded: unsubscribeLoaded,
    error: unsubscribeError,
    result: unsubscribeResult,
  } = useSelector((state) => state.unsubscribeNewsletter);
  const { status: unsubscribeStatus, errors: unsubscribeErrors = [] } =
    unsubscribeResult ?? {};

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
    if (subscribeLoaded && subscribeStatus !== 'error') {
      setEmail('');
      setSubHoney('');
      if (messages[subscribeStatus]) {
        toast.success(intl.formatMessage(messages[subscribeStatus]));
      } else {
        toast.success(subscribeStatus);
      }
      return () => {
        dispatch(resetSubscribeNewsletter());
      };
    }
  }, [dispatch, intl, subscribeLoaded, subscribeStatus]);

  // Unsubscribe success
  useEffect(() => {
    if (unsubscribeLoaded && unsubscribeStatus !== 'error') {
      setUnsubEmail('');
      setUnsubHoney('');
      if (messages[unsubscribeStatus]) {
        toast.success(intl.formatMessage(messages[unsubscribeStatus]));
      } else {
        toast.success(unsubscribeStatus);
      }
      return () => {
        dispatch(resetUnsubscribeNewsletter());
      };
    }
  }, [dispatch, intl, unsubscribeLoaded, unsubscribeStatus]);

  // Subscribe generic error
  // TODO TEST
  useEffect(() => {
    if (subscribeError) {
      toast.error(intl.formatMessage(messages.newsletterSubscriptionError));
    }
  }, [subscribeError, intl]);

  // Unsubscribe generic error
  // TODO TEST
  useEffect(() => {
    if (unsubscribeError) {
      toast.error(intl.formatMessage(messages.newsletterSubscriptionError));
    }
  }, [unsubscribeError, intl]);

  // Subscribe form error
  // TODO TEST
  const subErrorsString = JSON.stringify(subscribeErrors);

  useEffect(() => {
    if (subscribeStatus === 'error' && subscribeErrors?.length > 0) {
      subscribeErrors.forEach((error) => {
        if (messages[error]) {
          toast.error(intl.formatMessage(messages[error]));
        } else {
          toast.error(intl.formatMessage(messages.newsletterSubscriptionError));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intl, subErrorsString, subscribeStatus]);

  // Unsubscribe form error
  // TODO TEST
  const unsubErrorsString = JSON.stringify(unsubscribeErrors);

  useEffect(() => {
    if (unsubscribeStatus === 'error' && unsubscribeErrors?.length > 0) {
      unsubscribeErrors.forEach((error) => {
        if (messages[error]) {
          toast.error(intl.formatMessage(messages[error]));
        } else {
          toast.error(intl.formatMessage(messages.newsletterSubscriptionError));
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intl, unsubErrorsString, unsubscribeStatus]);

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
              <article
                id="subscribe-form"
                className="it-page-section anchor-offset"
              >
                <h4 id="header-subscribe-form">
                  {intl.formatMessage(messages.subscribeNewsletterLabel)}
                </h4>
                {subscribeLoaded && subscribeStatus !== 'error' && (
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
                    if (!(subscribeLoaded && subscribeStatus !== 'error')) {
                      sendSubscribeForm();
                    }
                  }}
                >
                  {!(subscribeLoaded && subscribeStatus !== 'error') && (
                    <>
                      <Label
                        className="text-white fw-semibold active"
                        htmlFor="input-newsletter"
                        style={{
                          transition: 'none 0 ease 0',
                        }}
                        tag="label"
                        widths={['xs', 'sm', 'md', 'lg', 'xl']}
                      >
                        {intl.formatMessage(messages.subscribeNewsletterLabel)}
                      </Label>
                      <Input
                        type="email"
                        id="input-newsletter"
                        name="input-newsletter"
                        placeholder="mail@example.com"
                        className="mb-3"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
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
              </article>
            )}
            <RichTextArticle
              tag_id={'text-body'}
              title={intl.formatMessage(messages.newsletterPrivacyStatement)}
              show_title={false}
              data={content.privacy}
            ></RichTextArticle>
            <article
              id="unsubscribe-form"
              className="it-page-section anchor-offset mt-5"
            >
              <h4 id="header-unsubscribe-form">
                {intl.formatMessage(messages.unsubscribeNewsletterLabel)}
              </h4>
              {unsubscribeLoaded && unsubscribeStatus !== 'error' && (
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
                  if (!(unsubscribeLoaded && unsubscribeStatus !== 'error')) {
                    sendUnsubscribeForm();
                  }
                }}
              >
                {!(unsubscribeLoaded && unsubscribeStatus !== 'error') && (
                  <>
                    <Label
                      className="text-white fw-semibold active"
                      htmlFor="input-newsletter"
                      style={{
                        transition: 'none 0 ease 0',
                      }}
                      tag="label"
                      widths={['xs', 'sm', 'md', 'lg', 'xl']}
                    >
                      {intl.formatMessage(messages.unsubscribeNewsletterLabel)}
                    </Label>
                    <Input
                      type="email"
                      id="input-newsletter"
                      name="input-newsletter"
                      placeholder="mail@example.com"
                      className="mb-3"
                      value={unsubEmail}
                      onChange={(e) => {
                        setUnsubEmail(e.target.value);
                      }}
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
            </article>
          </section>
        </div>
      </div>
    </>
  );
};

export default Channel;
