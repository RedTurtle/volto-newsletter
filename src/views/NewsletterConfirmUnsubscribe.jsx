import React, { useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Form, Icon, Button } from 'design-react-kit/dist/design-react-kit';
import { confirmNewsletterSubscription } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { getParentUrl } from '@plone/volto/helpers';

const messages = defineMessages({
  newsletterConfirmUnsubscribe: {
    id: 'newsletterConfirmUnsubscribe',
    defaultMessage: 'Conferma',
  },
  newsletterConfirmUnsubscribeText: {
    id: 'newsletterConfirmUnsubscribeText',
    defaultMessage: "Conferma la cancellazione dell'iscrizione alla newsletter",
  },
  newsletterConfirmUnsubscribeSuccess: {
    id: 'newsletterConfirmUnsubscribeSuccess',
    defaultMessage: 'La cancellazione è stata confermata',
  },
  newsletterConfirmUnsubscribeError: {
    id: 'newsletterConfirmUnsubscribeError',
    defaultMessage:
      'Errore durante la cancellazione della tua iscrizione. Si prega di riprovare più tardi.',
  },
  invalid_captcha: {
    id: 'invalid_captcha',
    defaultMessage: 'Captcha non valido',
  },
  message_wrong_captcha: {
    id: 'message_wrong_captcha',
    defaultMessage: 'Captcha non valido',
  },
  generic_delete_message_success: {
    id: 'generic_delete_message_success',
    defaultMessage: 'Iscrizione cancellata con successo',
  },
  user_secret_not_found: {
    id: 'user_secret_not_found',
    defaultMessage:
      "Impossibile cancellare l'iscrizione. Il link usato non è valido.",
  },
  user_not_found: {
    id: 'user_not_found',
    defaultMessage:
      "Impossibile cancellare l'iscrizione. L'email non è iscritta alla newsletter.",
  },
  unable_to_unsubscribe: {
    id: 'unable_to_unsubscribe',
    defaultMessage:
      "Impossibile cancellare l'iscrizione in questo momento. Si prega di riprovare più tardi.",
  },
});

const NewsletterConfirmUnsubscribe = ({ location, secret, action }) => {
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
        intl.formatMessage(messages.newsletterConfirmUnsubscribeSuccess),
      );
    }
  }, [loaded, error, status, intl]);

  useEffect(() => {
    if (error) {
      toast.error(
        intl.formatMessage(messages.newsletterConfirmUnsubscribeError),
      );
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
            intl.formatMessage(messages.newsletterConfirmUnsubscribeError),
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
        {intl.formatMessage(messages.newsletterConfirmUnsubscribeText)}
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
          <span>
            {intl.formatMessage(messages.newsletterConfirmUnsubscribe)}
          </span>
        </Button>
      </Form>
    </div>
  );
};

NewsletterConfirmUnsubscribe.propTypes = {
  location: PropTypes.object.isRequired,
  secret: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
};

export default NewsletterConfirmUnsubscribe;
