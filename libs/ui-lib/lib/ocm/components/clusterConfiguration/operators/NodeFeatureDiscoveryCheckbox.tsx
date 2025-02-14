import React, { useState } from 'react';
import { FormGroup, HelperText, HelperTextItem, Tooltip } from '@patternfly/react-core';
import { getFieldId, PopoverIcon } from '../../../../common';
import { OcmCheckboxField } from '../../ui/OcmFormFields';
import { useNewFeatureSupportLevel } from '../../../../common/components/newFeatureSupportLevels';
import NewFeatureSupportLevelBadge from '../../../../common/components/newFeatureSupportLevels/NewFeatureSupportLevelBadge';
import { SupportLevel } from '@openshift-assisted/types/./assisted-installer-service';

const NODEFEATUREDISCOVERY_FIELD_NAME = 'useNodeFeatureDiscovery';

const NodeFeatureDiscoveryLabel = ({
  disabledReason,
  supportLevel,
}: {
  disabledReason?: string;
  supportLevel?: SupportLevel;
}) => {
  return (
    <>
      <Tooltip hidden={!disabledReason} content={disabledReason}>
        <span>Install Node Feature Discovery </span>
      </Tooltip>
      <PopoverIcon
        id={NODEFEATUREDISCOVERY_FIELD_NAME}
        component={'a'}
        bodyContent={'No additional requirements needed'}
      />
      <NewFeatureSupportLevelBadge featureId="NODE_FEATURE_DISCOVERY" supportLevel={supportLevel} />
    </>
  );
};

const NodeFeatureDiscoveryHelperText = () => {
  return (
    <HelperText>
      <HelperTextItem variant="indeterminate">
        Manage the detection of hardware features and configuration by labeling nodes with
        hardware-specific information.{' '}
      </HelperTextItem>
    </HelperText>
  );
};

const NodeFeatureDiscoveryCheckbox = ({ disabledReason }: { disabledReason?: string }) => {
  const fieldId = getFieldId(NODEFEATUREDISCOVERY_FIELD_NAME, 'input');
  const featureSupportLevel = useNewFeatureSupportLevel();
  const [disabledReasonNmsate, setDisabledReason] = useState<string | undefined>();

  React.useEffect(() => {
    const reason = featureSupportLevel.getFeatureDisabledReason('NODE_FEATURE_DISCOVERY');
    setDisabledReason(reason);
  }, [featureSupportLevel]);
  return (
    <FormGroup isInline fieldId={fieldId}>
      <OcmCheckboxField
        name={NODEFEATUREDISCOVERY_FIELD_NAME}
        label={
          <NodeFeatureDiscoveryLabel
            disabledReason={disabledReason ? disabledReason : disabledReasonNmsate}
            supportLevel={featureSupportLevel.getFeatureSupportLevel('NODE_FEATURE_DISCOVERY')}
          />
        }
        helperText={<NodeFeatureDiscoveryHelperText />}
        isDisabled={!!disabledReason || !!disabledReasonNmsate}
      />
    </FormGroup>
  );
};

export default NodeFeatureDiscoveryCheckbox;
