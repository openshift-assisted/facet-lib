import React, { useState } from 'react';
import { FormGroup, HelperText, HelperTextItem, Tooltip } from '@patternfly/react-core';
import { ExternalLinkAltIcon } from '@patternfly/react-icons/dist/js/icons/external-link-alt-icon';
import { useFormikContext } from 'formik';
import {
  ClusterOperatorProps,
  CNV_LINK,
  getFieldId,
  OperatorsValues,
  PopoverIcon,
} from '../../../../common';
import CnvHostRequirements from './CnvHostRequirements';
import { getCnvIncompatibleWithLvmReason } from '../../featureSupportLevels/featureStateUtils';
import { OcmCheckboxField } from '../../ui/OcmFormFields';
import { useNewFeatureSupportLevel } from '../../../../common/components/newFeatureSupportLevels';

const CNV_FIELD_NAME = 'useContainerNativeVirtualization';

const CnvLabel = ({
  clusterId,
  disabledReason,
  isVersionEqualsOrMajorThan4_15,
}: {
  clusterId: ClusterOperatorProps['clusterId'];
  disabledReason?: string;
  isVersionEqualsOrMajorThan4_15: boolean;
}) => {
  return (
    <>
      <Tooltip hidden={!disabledReason} content={disabledReason}>
        <span>Install OpenShift Virtualization </span>
      </Tooltip>
      <PopoverIcon
        component={'a'}
        headerContent="Additional requirements"
        bodyContent={
          <CnvHostRequirements
            clusterId={clusterId}
            isVersionEqualsOrMajorThan4_15={isVersionEqualsOrMajorThan4_15}
          />
        }
      />
    </>
  );
};

const CnvHelperText = () => {
  return (
    <HelperText>
      <HelperTextItem variant="indeterminate">
        Run virtual machines alongside containers on one platform.{' '}
        <a href={CNV_LINK} target="_blank" rel="noopener noreferrer">
          {'Learn more'} <ExternalLinkAltIcon />
        </a>
      </HelperTextItem>
    </HelperText>
  );
};

const CnvCheckbox = ({
  clusterId,
  isVersionEqualsOrMajorThan4_15,
}: {
  clusterId: ClusterOperatorProps['clusterId'];
  isVersionEqualsOrMajorThan4_15: boolean;
}) => {
  const fieldId = getFieldId(CNV_FIELD_NAME, 'input');

  const featureSupportLevel = useNewFeatureSupportLevel();
  const { values } = useFormikContext<OperatorsValues>();
  const [disabledReason, setDisabledReason] = useState<string | undefined>();

  React.useEffect(() => {
    let reason = featureSupportLevel.getFeatureDisabledReason('CNV');
    if (!reason) {
      const lvmSupport = featureSupportLevel.getFeatureSupportLevel('LVM');
      reason = getCnvIncompatibleWithLvmReason(values, lvmSupport);
    }
    setDisabledReason(reason);
  }, [values, featureSupportLevel]);

  return (
    <FormGroup isInline fieldId={fieldId}>
      <OcmCheckboxField
        name={CNV_FIELD_NAME}
        label={
          <CnvLabel
            clusterId={clusterId}
            disabledReason={disabledReason}
            isVersionEqualsOrMajorThan4_15={isVersionEqualsOrMajorThan4_15}
          />
        }
        helperText={<CnvHelperText />}
        isDisabled={!!disabledReason}
      />
    </FormGroup>
  );
};

export default CnvCheckbox;
