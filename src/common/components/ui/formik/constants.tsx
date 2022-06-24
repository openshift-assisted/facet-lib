export const CLUSTER_NAME_VALIDATION_MESSAGES = {
  INVALID_LENGTH_OCM: '1-54 characters',
  INVALID_LENGTH_ACM: '2-54 characters',
  INVALID_VALUE: 'Use lowercase alphanumberic characters, or hyphen (-)',
  INVALID_START_END: 'Start and end with a lowercase letter or a number.',
  NOT_UNIQUE: 'Must be unique',
};

export const OCM_CLUSTER_NAME_VALIDATION_MESSAGES = {
  INVALID_LENGTH: CLUSTER_NAME_VALIDATION_MESSAGES.INVALID_LENGTH_OCM,
  INVALID_VALUE: CLUSTER_NAME_VALIDATION_MESSAGES.INVALID_VALUE,
  INVALID_START_END: CLUSTER_NAME_VALIDATION_MESSAGES.INVALID_START_END,
};

export const UNIQUE_OCM_CLUSTER_NAME_VALIDATION_MESSAGES = {
  INVALID_LENGTH: CLUSTER_NAME_VALIDATION_MESSAGES.INVALID_LENGTH_OCM,
  INVALID_VALUE: CLUSTER_NAME_VALIDATION_MESSAGES.INVALID_VALUE,
  INVALID_START_END: CLUSTER_NAME_VALIDATION_MESSAGES.INVALID_START_END,
  NOT_UNIQUE: CLUSTER_NAME_VALIDATION_MESSAGES.NOT_UNIQUE,
};

export const ACM_CLUSTER_NAME_VALIDATION_MESSAGES = {
  INVALID_LENGTH: CLUSTER_NAME_VALIDATION_MESSAGES.INVALID_LENGTH_ACM,
  INVALID_VALUE: CLUSTER_NAME_VALIDATION_MESSAGES.INVALID_VALUE,
  INVALID_START_END: CLUSTER_NAME_VALIDATION_MESSAGES.INVALID_START_END,
  NOT_UNIQUE: CLUSTER_NAME_VALIDATION_MESSAGES.NOT_UNIQUE,
};

export const NAME_VALIDATION_MESSAGES = {
  INVALID_LENGTH: '1-253 characters',
  NOT_UNIQUE: 'Must be unique',
  INVALID_VALUE: 'Use lowercase alphanumberic characters, dot (.) or hyphen (-)',
  INVALID_START_END: 'Must start and end with an lowercase alphanumeric character',
  INVALID_FORMAT: 'Number of characters between dots (.) must be 1-63',
};

export const HOSTNAME_VALIDATION_MESSAGES = {
  ...NAME_VALIDATION_MESSAGES,
  LOCALHOST_ERR: 'Cannot be the word "localhost" or "localhost.localdomain"',
};

export const LOCATION_VALIDATION_MESSAGES = {
  INVALID_LENGTH: '1-63 characters',
  INVALID_VALUE: 'Use alphanumberic characters, dot (.), underscore (_) or hyphen (-)',
  INVALID_START_END: 'Must start and end with an alphanumeric character',
};
