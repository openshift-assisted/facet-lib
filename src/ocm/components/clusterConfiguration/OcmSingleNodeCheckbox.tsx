import * as React from 'react';
import { useField, useFormikContext } from 'formik';
import { Checkbox, FormGroup, Tooltip } from '@patternfly/react-core';
import { ClusterCreateParams, getFieldId, HelperText, useFeature } from '../../../common';
import { useNewFeatureSupportLevel } from '../../../common/components/newFeatureSupportLevels';
import { CheckboxFieldProps } from '../../../common/components/ui/formik/types';
import NewFeatureSupportLevelBadge from '../../../common/components/newFeatureSupportLevels/NewFeatureSupportLevelBadge';
import { useTranslation } from '../../../common/hooks/use-translation-wrapper';

const OcmSingleNodeCheckbox: React.FC<CheckboxFieldProps> = ({ validate, idPostfix, ...props }) => {
  const {
    values: { openshiftVersion },
  } = useFormikContext<ClusterCreateParams>();
  const isSingleNodeOpenshiftEnabled = useFeature('ASSISTED_INSTALLER_SNO_FEATURE');
  const [field, meta, helpers] = useField<'None' | 'Full'>({ name: props.name, validate });
  const featureSupportLevelContext = useNewFeatureSupportLevel();
  const prevVersionRef = React.useRef(openshiftVersion);
  const fieldId = getFieldId(props.name, 'input', idPostfix);
  const { t } = useTranslation();
  const { value } = meta;
  const { setValue } = helpers;
  const isSupportedVersionAvailable = featureSupportLevelContext.isFeatureSupported('SNO');

  const onChanged = React.useCallback(
    (checked: boolean) => setValue(checked ? 'None' : 'Full'),
    [setValue],
  );

  const disabledReason = featureSupportLevelContext.getFeatureDisabledReason('SNO', t);

  React.useEffect(() => {
    if (
      prevVersionRef.current !== openshiftVersion &&
      !featureSupportLevelContext.isFeatureSupported('SNO')
    ) {
      //invoke updating SNO value only if the version changed to not be in danger of touching existing clusters
      onChanged(false);
    }
    prevVersionRef.current = openshiftVersion;
  }, [openshiftVersion, onChanged, featureSupportLevelContext]);

  if (isSingleNodeOpenshiftEnabled && isSupportedVersionAvailable) {
    return (
      <FormGroup isInline fieldId={fieldId}>
        <Tooltip hidden={!disabledReason} content={disabledReason}>
          <Checkbox
            {...field}
            {...props}
            id={fieldId}
            label={
              <>
                {t('ai:Install single node OpenShift (SNO)')}&nbsp;
                <NewFeatureSupportLevelBadge featureId="SNO" openshiftVersion={openshiftVersion} />
              </>
            }
            aria-describedby={`${fieldId}-helper`}
            description={
              <HelperText fieldId={fieldId}>
                {t('ai:SNO enables you to install OpenShift using only one host.')}
              </HelperText>
            }
            isChecked={value === 'None'}
            onChange={onChanged}
            className="with-tooltip"
          />
        </Tooltip>
      </FormGroup>
    );
  }
  return null;
};

export default OcmSingleNodeCheckbox;
