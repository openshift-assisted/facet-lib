import * as React from 'react';
import { useField } from 'formik';
import classNames from 'classnames';
import {
  FormGroup,
  HelperTextItem,
  TextInput,
  HelperText as PFHelperText,
  HelperTextItemProps,
  Popover,
  PopoverPosition,
  InputGroup,
  Button,
} from '@patternfly/react-core';
import {
  CheckCircleIcon,
  CheckIcon,
  ExclamationCircleIcon,
  InfoCircleIcon,
  TimesIcon,
} from '@patternfly/react-icons';
import { global_palette_green_500 as okColor } from '@patternfly/react-tokens/dist/js/global_palette_green_500';
import { global_danger_color_100 as dangerColor } from '@patternfly/react-tokens/dist/js/global_danger_color_100';
import { global_palette_blue_300 as blueInfoColor } from '@patternfly/react-tokens/dist/js/global_palette_blue_300';

import { InputFieldProps as BaseInputProps } from './types';
import { getFieldId } from './utils';
import HelperText from './HelperText';

import './RichInputField.css';

type RichValidationProps = {
  // eslint-disable-next-line
  value: any;
  error: string | undefined;
  richValidationMessages: { [key: string]: string };
};

export const RichValidation: React.FC<RichValidationProps> = ({
  value,
  error,
  richValidationMessages,
}) => {
  return (
    <PFHelperText component="ul" className="rich-input__rules">
      {Object.keys(richValidationMessages).map((key) => {
        const variant: {
          variant: HelperTextItemProps['variant'];
          icon?: HelperTextItemProps['icon'];
        } = !value
          ? { variant: 'indeterminate' }
          : error?.includes(richValidationMessages[key])
          ? { variant: 'error', icon: <TimesIcon /> }
          : { variant: 'success', icon: <CheckIcon /> };
        return (
          <HelperTextItem key={key} isDynamic component="li" {...variant}>
            {richValidationMessages[key]}
          </HelperTextItem>
        );
      })}
    </PFHelperText>
  );
};

type RichInputFieldPropsProps = BaseInputProps & {
  richValidationMessages: RichValidationProps['richValidationMessages'];
};

const RichInputField: React.FC<RichInputFieldPropsProps> = React.forwardRef(
  (
    {
      label,
      labelIcon,
      helperText,
      isRequired,
      onChange,
      validate,
      idPostfix,
      noDefaultOnChange,
      richValidationMessages,
      ...props
    },
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const [field, { error, value }] = useField({ name: props.name, validate });
    const fieldId = getFieldId(props.name, 'input', idPostfix);
    const isValid = !error?.length;
    return (
      <FormGroup
        fieldId={fieldId}
        label={label}
        helperText={
          typeof helperText === 'string' ? (
            helperText
          ) : (
            <HelperText fieldId={fieldId}>{helperText}</HelperText>
          )
        }
        validated={isValid ? 'default' : 'error'}
        isRequired={isRequired}
        labelIcon={labelIcon}
      >
        <InputGroup
          className={classNames('rich-input__group', { 'rich_input__group--invalid': !isValid })}
        >
          <TextInput
            {...field}
            {...props}
            ref={ref}
            id={fieldId}
            isRequired={isRequired}
            aria-describedby={`${fieldId}-helper`}
            onChange={(value, event) => {
              !popoverOpen && setPopoverOpen(true);
              !noDefaultOnChange && field.onChange(event);
              onChange && onChange(event);
            }}
            className="rich-input__text"
            onBlur={() => setPopoverOpen(false)}
          />
          <Popover
            isVisible={popoverOpen}
            shouldClose={() => setPopoverOpen(false)}
            shouldOpen={() => setPopoverOpen(true)}
            aria-label="validation popover"
            position={PopoverPosition.top}
            bodyContent={
              <RichValidation
                value={value}
                error={error}
                richValidationMessages={richValidationMessages as {}}
              />
            }
          >
            <Button variant="plain" aria-label="Validation">
              {!isValid ? (
                <ExclamationCircleIcon color={dangerColor.value} />
              ) : value ? (
                <CheckCircleIcon color={okColor.value} />
              ) : (
                <InfoCircleIcon color={blueInfoColor.value} />
              )}
            </Button>
          </Popover>
        </InputGroup>
      </FormGroup>
    );
  },
);

export default RichInputField;
