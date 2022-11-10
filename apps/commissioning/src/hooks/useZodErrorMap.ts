import { useIntl } from "react-intl";
import { z } from "zod";

export const useZodErrorMap = () => {

  const intl = useIntl()

  const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    // For more information - https://github.com/colinhacks/zod/blob/master/ERROR_HANDLING.md#zodparsedtype
    if (issue.code === z.ZodIssueCode.invalid_type) {
      if (issue.expected === "number") {
        return { message: intl.formatMessage({ defaultMessage: 'Required' }) };
      }
    }
    if (issue.code === z.ZodIssueCode.custom) {
      return {
        message: intl.formatMessage({ defaultMessage: `Field must contain at least {minimum} character(s)` }, { minimum: (issue.params || {}).minimum })
      }
    }
    return { message: ctx.defaultError };
  };

  z.setErrorMap(customErrorMap);
}

