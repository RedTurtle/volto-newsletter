import React, { useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Form, Icon, Button } from 'design-react-kit/dist/design-react-kit';
import { confirmNewsletterSubscription } from '@package/actions';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { getParentUrl } from '@plone/volto/helpers';

const messages = defineMessages({
  newsletterConfirmSubscribe: {
    id: 'newsletterConfirmSubscribe',
    defaultMessage: 'Conferma',
  },
  newsletterConfirmSubscribeText: {
    id: 'newsletterConfirmSubscribeText',
    defaultMessage: "Conferma l'iscrizione alla newsletter",
  },
  newsletterConfirmSubscribeSuccess: {
    id: 'newsletterConfirmSubscribeSuccess',
    defaultMessage: 'La tua iscrizione è stata confermata',
  },
  newsletterConfirmSubscribeError: {
    id: 'newsletterConfirmSubscribeError',
    defaultMessage:
      'Errore durante la conferma della tua iscrizione. Si prega di riprovare più tardi.',
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
  generic_activate_message_success: {
    id: 'generic_activate_message_success',
    defaultMessage: 'Iscrizione effettuata con successo',
  },
  user_secret_not_found: {
    id: 'user_secret_not_found',
    defaultMessage:
      "Impossibile confermare l'iscrizione. Il link usato non è valido.",
  },
  user_not_found: {
    id: 'user_not_found',
    defaultMessage:
      "Impossibile confermare l'iscrizione. L'email non è valida.",
  },
  unable_to_unsubscribe: {
    id: 'unable_to_unsubscribe',
    defaultMessage:
      "Impossibile confermare l'iscrizione in questo momento. Si prega di riprovare più tardi.",
  },
});

const NewsletterConfirmSubscribe = ({ location, secret, action }) => {
  const intl = useIntl();
  const path = getParentUrl(location.pathname ?? '/');
  const dispatch = useDispatch();
  const { loading, loaded, error, result } = useSelector(
    (state) => state.confirmNewsletterSubscription,
  );
  const { status, errors = [] } = result ?? {};

  useEffect(() => {
    if (loaded && !error && status !== 'error') {
      toast.success(
        intl.formatMessage(messages.newsletterConfirmSubscribeSuccess),
      );
    }
  }, [loaded, error, status, intl]);

  useEffect(() => {
    if (error) {
      toast.error(intl.formatMessage(messages.newsletterConfirmSubscribeError));
    }
  }, [error, intl]);

  const errorsString = JSON.stringify(errors);

  useEffect(() => {
    if (status === 'error' && errors?.length > 0) {
      errors.forEach((error) => {
        if (messages[error]) {
          toast.error(intl.formatMessage(messages[error]));
        } else {
          toast.error(
            intl.formatMessage(messages.newsletterConfirmSubscribeError),
          );
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intl, errorsString, status]);

  const sendFormData = () => {
    dispatch(
      confirmNewsletterSubscription(path, {
        secret,
        action,
      }),
    );
  };

  return (
    <div>
      <h3 className="mt-5">
        {intl.formatMessage(messages.newsletterConfirmSubscribeText)}
      </h3>
      <Form
        action={`${path}/@confirm-subscription-newsletter`}
        className="form-newsletter"
        method="post"
        tag="form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!(loaded && status !== 'error')) {
            sendFormData();
          }
        }}
      >
        <Button
          color="primary"
          className="btn-icon"
          type="submit"
          tag="button"
          icon={false}
          disabled={loading}
        >
          <Icon icon="it-mail" color="white" padding={false} size="" />
          <span>{intl.formatMessage(messages.newsletterConfirmSubscribe)}</span>
        </Button>
      </Form>
    </div>
  );
};

NewsletterConfirmSubscribe.propTypes = {
  location: PropTypes.object.isRequired,
  secret: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
};

export default NewsletterConfirmSubscribe;
