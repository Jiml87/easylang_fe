export const required = (value: any) => (value ? undefined : 'Required field');

export const minLen = (minNumber: number) => (value: string) =>
  value.length < minNumber ? `Min length is ${minNumber} symbols` : undefined;

export const maxLen = (maxNumber: number) => (value: string) =>
  value.length > maxNumber ? `Max length is ${maxNumber} symbols` : undefined;

// eslint-disable-next-line no-unused-vars
type Validator = ((value: any) => undefined | string)[];

export const composeValidators =
  (...validators: Validator) =>
  (value: any) =>
    validators.reduce(
      (error, validator) => error || validator(value),
      undefined as string | undefined,
    );
