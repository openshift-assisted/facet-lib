import * as React from 'react';
import { useField } from 'formik';
import {
  FormGroup,
  FormHelperText,
  FormSelect,
  FormSelectOption,
  HelperText,
  HelperTextItem,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import { getFieldId } from './utils';
import { SelectFieldProps } from './types';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/js/icons/exclamation-circle-icon';

// Reimplement this component to use custom Select in case of using it along the MultiSelectField component due to visual differences.
// Idea: use Formik's field.multiple to switch among single and multi-selection.
// See: https://www.patternfly.org/v4/components/form-select/design-guidelines#usage
const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  helperText,
  isRequired,
  onChange,
  getHelperText,
  idPostfix,
  labelIcon,
  callFormikOnChange = true,
  ...props
}) => {
  const [field, { touched, error }] = useField<string>(props.name);
  const fieldId = getFieldId(props.name, 'input', idPostfix);
  const isValid = !(touched && error);
  const errorMessage = !isValid ? error : '';
  const hText = getHelperText ? getHelperText(field.value) : helperText;

  return (
    <Stack id={`form-control__${fieldId}`}>
      <StackItem>
        <FormGroup fieldId={fieldId} label={label} isRequired={isRequired} labelIcon={labelIcon}>
          <FormSelect
            {...field}
            {...props}
            id={fieldId}
            validated={isValid ? 'default' : 'error'}
            isRequired={isRequired}
            aria-describedby={`${fieldId}-helper`}
            onChange={(event, value) => {
              //customHandleChange enables calling formik change handler explicitly, useful for example to have the previous value
              callFormikOnChange && field.onChange(event);
              onChange && onChange(value, event);
            }}
          >
            {options.map((option, index) => (
              <FormSelectOption key={option.id || index} {...option} />
            ))}
          </FormSelect>
        </FormGroup>
      </StackItem>
      <StackItem>
        <FormHelperText>
          <HelperText>
            <HelperTextItem
              icon={<ExclamationCircleIcon />}
              variant={errorMessage ? 'error' : 'default'}
            >
              {errorMessage ? errorMessage : hText}
            </HelperTextItem>
          </HelperText>
        </FormHelperText>
      </StackItem>
    </Stack>
  );
};

export default SelectField;
