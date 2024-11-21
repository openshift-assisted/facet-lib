import * as React from 'react';
import { Alert, Stack, StackItem } from '@patternfly/react-core';
import { AgentClusterInstallK8sResource, ClusterDeploymentK8sResource, OsImage } from '../../types';
import { ClusterImageSetK8sResource } from '../../types/k8s/cluster-image-set';
import { getOCPVersions, getSelectedVersion } from '../helpers';
import { useTranslation } from '../../../common/hooks/use-translation-wrapper';
import {
  ClusterDetailsFormFields,
  ClusterDetailsFormFieldsProps,
} from './ClusterDetailsFormFields';
import { useFormikContext } from 'formik';
import { ClusterDetailsValues, CpuArchitecture, SupportedCpuArchitecture } from '../../../common';

type ClusterDeploymentDetailsFormProps = {
  clusterImages: ClusterImageSetK8sResource[];
  clusterDeployment?: ClusterDeploymentK8sResource;
  agentClusterInstall?: AgentClusterInstallK8sResource;
  extensionAfter?: ClusterDetailsFormFieldsProps['extensionAfter'];
  isNutanix?: boolean;
  osImages?: OsImage[];
};

const ClusterDeploymentDetailsForm: React.FC<ClusterDeploymentDetailsFormProps> = ({
  agentClusterInstall,
  clusterDeployment,
  clusterImages,
  extensionAfter,
  isNutanix,
  osImages,
}) => {
  const { t } = useTranslation();
  const ocpVersions = React.useMemo(
    () => getOCPVersions(clusterImages, isNutanix, osImages),
    [clusterImages, isNutanix, osImages],
  );

  const forceOpenshiftVersion = agentClusterInstall
    ? getSelectedVersion(clusterImages, agentClusterInstall)
    : undefined;
  const isEditFlow = !!clusterDeployment;

  const { values } = useFormikContext<ClusterDetailsValues>();

  const cpuArchitectures = React.useMemo(() => {
    const cpuArchitectures = [CpuArchitecture.x86, CpuArchitecture.ARM, CpuArchitecture.s390x];
    if (!osImages) {
      return cpuArchitectures;
    }

    const openshiftVersion = ocpVersions
      .find((ver) => ver.value === values.openshiftVersion)
      ?.version.split('.')
      .slice(0, 2)
      .join('.');

    return osImages
      .filter((osImage) => osImage.openshiftVersion === openshiftVersion)
      .map((osImage) => osImage.cpuArchitecture as SupportedCpuArchitecture);
  }, [osImages, ocpVersions, values.openshiftVersion]);

  return (
    <Stack hasGutter>
      {isEditFlow && (
        <StackItem>
          <Alert
            isInline
            variant="info"
            title={t('ai:Some details are not editable after the draft cluster was created.')}
          />
        </StackItem>
      )}
      <StackItem>
        <ClusterDetailsFormFields
          versions={ocpVersions}
          isEditFlow={isEditFlow}
          forceOpenshiftVersion={forceOpenshiftVersion}
          extensionAfter={extensionAfter}
          isNutanix={isNutanix}
          cpuArchitectures={cpuArchitectures}
        />
      </StackItem>
    </Stack>
  );
};

export default ClusterDeploymentDetailsForm;
