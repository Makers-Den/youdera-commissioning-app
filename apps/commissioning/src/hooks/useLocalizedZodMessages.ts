import { useEffect } from "react";
import { useIntl } from "react-intl";
import { z } from "zod";

/**
 * You only need to use this hook once top level so we localize all the generic validations.
 * 
 * If you need to add a schema specific localized message, that should be defined when you define the schema,
 * in the component render, so you can pass it `intl`.
 */
export const useLocalizedZodMessages = () => {
  const intl = useIntl()

  useEffect(() => {
    const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
      // For more information - https://github.com/colinhacks/zod/blob/master/ERROR_HANDLING.md#zodparsedtype
      if (issue.code === z.ZodIssueCode.invalid_type) {
        if (issue.expected === "number") {
          return { message: intl.formatMessage({ defaultMessage: 'Required' }) };
        }
      }

      // TODO: this is incorrect. 
      // We do not want all of our custom issues to have this message
      if (issue.code === z.ZodIssueCode.custom) {
        return {
          message:
            intl.formatMessage({
                defaultMessage: `Field must contain at least {minimum} character(s)` 
              }, 
              {
                minimum: (issue.params || {}).minimum 
              }
            )
        };
      }

      return { message: ctx.defaultError };
    };

    z.setErrorMap(customErrorMap);
  }, [intl]);

}

