import { useEffect } from "react";
import { useIntl } from "react-intl";
import { z, ZodParsedType } from "zod";

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
      let message = intl.formatMessage({ defaultMessage: "Invalid" });     
      
      switch (issue.code) {
          case z.ZodIssueCode.invalid_type:
              if (issue.received === ZodParsedType.undefined) {
                  message = intl.formatMessage({ defaultMessage: "Required" });
              }
              else {
                  message = intl.formatMessage({ defaultMessage: `Expected {expected}, received {received}` }, { expected: issue.expected, received: issue.received });
              }
              break;
          case z.ZodIssueCode.invalid_literal:
              message = intl.formatMessage({ defaultMessage: `Invalid literal value, expected {values}` }, { values: JSON.stringify(issue.expected) });
              break;
          case z.ZodIssueCode.unrecognized_keys:
              message = intl.formatMessage({ defaultMessage: `Unrecognized key(s) in object: {keys}` }, { keys: issue.keys.join(", ") });
              break;
          case z.ZodIssueCode.invalid_union:
              message = intl.formatMessage({ defaultMessage: `Invalid input` });
              break;
          case z.ZodIssueCode.invalid_union_discriminator:
              message = intl.formatMessage({ defaultMessage: `Invalid discriminator value. Expected {values}` }, { values: issue.options.join(", ") });
              break;
          case z.ZodIssueCode.invalid_enum_value:
              message = intl.formatMessage({ defaultMessage: `Invalid enum value. Expected {values}, received '{received}'` }, { values: issue.options.join(", "), received: issue.received });
              break;
          case z.ZodIssueCode.invalid_arguments:
              message = intl.formatMessage({ defaultMessage: `Invalid function arguments` });
              break;
          case z.ZodIssueCode.invalid_return_type:
              message = intl.formatMessage({ defaultMessage: `Invalid function return type` });
              break;
          case z.ZodIssueCode.invalid_date:
              message = intl.formatMessage({ defaultMessage: `Invalid date` });
              break;
          case z.ZodIssueCode.invalid_string:
              if (typeof issue.validation === "object") {
                  if ("startsWith" in issue.validation) {
                      message = intl.formatMessage({ defaultMessage: `Invalid input: must start with "{startsWith}"` }, { startsWith: issue.validation.startsWith });
                  }
                  else if ("endsWith" in issue.validation) {
                      message = intl.formatMessage({ defaultMessage: `Invalid input: must end with "{endsWith}"` }, { endsWith: issue.validation.endsWith });
                  }
              }
              else if (issue.validation !== "regex") {
                  message = intl.formatMessage({ defaultMessage: `Invalid {validation}` }, { validation: issue.validation });
              }
              break;
          case z.ZodIssueCode.too_small:
              if (issue.type === "array")
                  message = intl.formatMessage({ defaultMessage: `Array must contain at least {minimum} element(s)` }, { minimum: issue.minimum });
              else if (issue.type === "string")
                  message = intl.formatMessage({ defaultMessage: `String must contain at least {minimum} character(s)` }, { minimum: issue.minimum });
              else if (issue.type === "number")
                  message = intl.formatMessage({ defaultMessage: `Number must be greater than or equal to {minimum}` }, { minimum: issue.minimum });
              else if (issue.type === "date")
                  message = intl.formatMessage({ defaultMessage: `Date must be greater than or equal to {minimum}` }, { minimum: issue.minimum });
              break;
          case z.ZodIssueCode.too_big:
              if (issue.type === "array")
                  message = intl.formatMessage({ defaultMessage: `Array must contain at most {maximum} element(s)` }, { maximum: issue.maximum });
              else if (issue.type === "string")
                  message = intl.formatMessage({ defaultMessage: `String must contain at most {maximum} characters` }, { maximum: issue.maximum });
              else if (issue.type === "number")
                  message = intl.formatMessage({ defaultMessage: `Number must be less than or equal to {maximum}` }, { maximum: issue.maximum });
              else if (issue.type === "date")
                  message = intl.formatMessage({ defaultMessage: `Date must be smaller than or equal to {maximum}` }, { maximum: new Date(issue.maximum) });
              break;
          case z.ZodIssueCode.custom:
              message = intl.formatMessage({ defaultMessage: `Invalid input` });
              break;
          case z.ZodIssueCode.invalid_intersection_types:
              message = intl.formatMessage({ defaultMessage: `Intersection results could not be merged` });
              break;
          case z.ZodIssueCode.not_multiple_of:
              message = intl.formatMessage({ defaultMessage: `Number must be a multiple of {multipleOf}` }, { multipleOf: issue.multipleOf });
              break;
          default:
              message = ctx.defaultError;
      }
      return { message };
    };

    z.setErrorMap(customErrorMap);
  }, [intl]);

}


