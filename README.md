# volto-newsletter

Volto addon for newsletter integration. For now, it only works with [rer.newsletter](https://github.com/redturtle/rer.newsletter) and with [design-comuni-plone-theme](https://github.com/italia/design-comuni-plone-theme).

Install with mrs-developer (see [Volto docs](https://6.docs.plone.org/volto/addons/index.html)) or with:

```bash
yarn add volto-newsletter
```

## Usage

This add-on adds the necessary views for the Channel content-type.

It requires an environment variable `RAZZLE_HONEYPOT_FIELD` in order to work, and it has to be the same value of the `HONEYPOT_FIELD` env var set on the backend.

## Translations

This addon has Italian and English localizations.
