import * as React from 'react';
import { Form } from '@patternfly/react-core';
import { useFormikContext } from 'formik';

import { HostsNetworkConfigurationControlGroup } from './HostsNetworkConfigurationControlGroup';
import {
  ClusterDetailsValues,
  isSNO,
  ManagedDomain,
  OpenshiftVersionOptionType,
  PullSecret,
  ocmClusterNameValidationMessages,
  uniqueOcmClusterNameValidationMessages,
  CLUSTER_NAME_MAX_LENGTH,
  StaticTextField,
  useFeature,
  ClusterCreateParams,
  getSupportedCpuArchitectures,
  PlatformType,
} from '../../../common';
import DiskEncryptionControlGroup from '../../../common/components/clusterConfiguration/DiskEncryptionFields/DiskEncryptionControlGroup';
import { useTranslation } from '../../../common/hooks/use-translation-wrapper';
import {
  OcmCheckboxField,
  OcmInputField,
  OcmRichInputField,
  OcmSelectField,
} from '../ui/OcmFormFields';
import OcmOpenShiftVersion from './OcmOpenShiftVersion';
import OcmOpenShiftVersionSelect from './OcmOpenShiftVersionSelect';
import CustomManifestCheckbox from './CustomManifestCheckbox';
import CpuArchitectureDropdown, {
  architectureData,
  CpuArchitectureItem,
} from './CpuArchitectureDropdown';
import OcmSNOControlGroup from './OcmSNOControlGroup';
import useSupportLevelsAPI from '../../hooks/useSupportLevelsAPI';
import { useOpenshiftVersions } from '../../hooks';
import { ExternalPlatformDropdown, ExternalPlatformType } from './ExternalPlatformDropdown';
import { useOracleDropdownItemState } from '../../hooks/useOracleDropdownItemState';
import { useClusterWizardContext } from '../clusterWizard/ClusterWizardContext';

export type OcmClusterDetailsFormFieldsProps = {
  forceOpenshiftVersion?: string;
  isBaseDnsDomainDisabled?: boolean;
  defaultPullSecret?: string;
  isOcm: boolean;
  managedDomains?: ManagedDomain[];
  versions: OpenshiftVersionOptionType[];
  toggleRedHatDnsService?: (checked: boolean) => void;
  isPullSecretSet: boolean;
  clusterExists: boolean;
  clusterCpuArchitecture?: string;
  clusterId?: string;
  clusterPlatform?: PlatformType;
};

const BaseDnsHelperText = ({ name, baseDnsDomain }: { name?: string; baseDnsDomain?: string }) => (
  <>
    All DNS records must be subdomains of this base and include the cluster name. This cannot be
    changed after cluster installation. The full cluster address will be: <br />
    <strong>
      {name || '[Cluster Name]'}.{baseDnsDomain || '[example.com]'}
    </strong>
  </>
);

export const OcmClusterDetailsFormFields = ({
  managedDomains = [],
  toggleRedHatDnsService,
  isBaseDnsDomainDisabled,
  versions,
  isPullSecretSet,
  defaultPullSecret,
  forceOpenshiftVersion,
  isOcm,
  clusterExists,
  clusterCpuArchitecture,
  clusterId,
  clusterPlatform,
}: OcmClusterDetailsFormFieldsProps) => {
  const { values, setFieldValue } = useFormikContext<ClusterDetailsValues>();
  const { name, baseDnsDomain, highAvailabilityMode, useRedHatDnsService } = values;
  const nameInputRef = React.useRef<HTMLInputElement>();

  const { t } = useTranslation();
  const isSingleClusterFeatureEnabled = useFeature('ASSISTED_INSTALLER_SINGLE_CLUSTER_FEATURE');
  const isMultiArchSupported = useFeature('ASSISTED_INSTALLER_MULTIARCH_SUPPORTED');
  const isOracleCloudPlatformIntegrationEnabled = useFeature('ASSISTED_INSTALLER_PLATFORM_OCI');
  const {
    values: { openshiftVersion },
  } = useFormikContext<ClusterCreateParams>();
  const { getCpuArchitectures } = useOpenshiftVersions();
  const cpuArchitecturesByVersionImage = getCpuArchitectures(openshiftVersion);
  const clusterWizardContext = useClusterWizardContext();
  const featureSupportLevelData = useSupportLevelsAPI(
    'features',
    values.openshiftVersion,
    values.cpuArchitecture,
  );
  const cpuArchitectures = React.useMemo(
    () => getSupportedCpuArchitectures(isMultiArchSupported, cpuArchitecturesByVersionImage),
    [cpuArchitecturesByVersionImage, isMultiArchSupported],
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const cpuArchitecture = (architectureData[values.cpuArchitecture] as CpuArchitectureItem).label;
  const oracleDropdownItemState = useOracleDropdownItemState(
    clusterExists,
    featureSupportLevelData,
  );
  const [customManifestsCheckboxDisabled, setCustomManifestsCheckboxDisabled] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const handleExternalPartnerIntegrationsChange = React.useCallback(
    (selectedPlatform: ExternalPlatformType) => {
      const isOracleSelected = selectedPlatform === 'oci';
      if (isOracleSelected) {
        setFieldValue('addCustomManifest', isOracleSelected, false);
        clusterWizardContext.setAddCustomManifests(isOracleSelected);
      }
      setCustomManifestsCheckboxDisabled(isOracleSelected);

    },
    [clusterWizardContext, setFieldValue],
  );

  return (
    <Form id="wizard-cluster-details__form">
      <OcmRichInputField
        ref={nameInputRef}
        label="Cluster name"
        name="name"
        placeholder={isOcm ? '' : 'Enter cluster name'}
        isRequired
        richValidationMessages={
          useRedHatDnsService
            ? uniqueOcmClusterNameValidationMessages(t)
            : ocmClusterNameValidationMessages(t)
        }
        maxLength={CLUSTER_NAME_MAX_LENGTH}
      />
      {!!managedDomains.length && toggleRedHatDnsService && (
        <OcmCheckboxField
          name="useRedHatDnsService"
          label="Use a temporary 60-day domain"
          helperText="A base domain will be provided for temporary, non-production clusters."
          onChange={toggleRedHatDnsService}
        />
      )}
      {useRedHatDnsService ? (
        <OcmSelectField
          label="Base domain"
          name="baseDnsDomain"
          helperText={<BaseDnsHelperText name={name} baseDnsDomain={baseDnsDomain} />}
          options={managedDomains.map((d) => ({
            label: `${d.domain || ''} (${d.provider || ''})`,
            value: d.domain,
          }))}
          isRequired
        />
      ) : (
        <OcmInputField
          label="Base domain"
          name="baseDnsDomain"
          helperText={<BaseDnsHelperText name={name} baseDnsDomain={baseDnsDomain} />}
          placeholder="example.com"
          isDisabled={isBaseDnsDomainDisabled || useRedHatDnsService}
          isRequired
        />
      )}
      {/* TODO(mlibra): For single-cluster: We will probably change this to just a static text */}
      {forceOpenshiftVersion ? (
        <OcmOpenShiftVersion
          versions={versions}
          openshiftVersion={forceOpenshiftVersion}
          clusterCpuArchitecture={clusterCpuArchitecture}
          withPreviewText
          withMultiText
        />
      ) : (
        <OcmOpenShiftVersionSelect versions={versions} />
      )}
      {clusterExists ? (
        <StaticTextField name="cpuArchitecture" label="CPU architecture" isRequired>
          {cpuArchitecture}
        </StaticTextField>
      ) : (
        <CpuArchitectureDropdown
          openshiftVersion={openshiftVersion}
          cpuArchitectures={cpuArchitectures}
        />
      )}
      <OcmSNOControlGroup
        highAvailabilityMode={highAvailabilityMode}
        featureSupportLevelData={featureSupportLevelData ?? undefined}
      />

      {!isPullSecretSet && <PullSecret isOcm={isOcm} defaultPullSecret={defaultPullSecret} />}

      <ExternalPlatformDropdown
        showOciOption={isOracleCloudPlatformIntegrationEnabled}
        selectedPlatform={clusterPlatform === 'baremetal' ? 'none' : clusterPlatform || 'none'}
        disabledOciTooltipContent={oracleDropdownItemState?.disabledReason}
        isOciDisabled={oracleDropdownItemState?.isDisabled || false}
        onChange={handleExternalPartnerIntegrationsChange}
        dropdownIsDisabled={clusterPlatform === 'oci'}
      />

      <CustomManifestCheckbox
        clusterId={clusterId || ''}
        isDisabled={customManifestsCheckboxDisabled}
      />

      {
        // Reason: In the single-cluster flow, the Host discovery phase is replaced by a single one-fits-all ISO download
        !isSingleClusterFeatureEnabled && (
          <HostsNetworkConfigurationControlGroup clusterExists={clusterExists} />
        )
      }

      <DiskEncryptionControlGroup
        values={values}
        isDisabled={isPullSecretSet}
        isSNO={isSNO({ highAvailabilityMode })}
      />
    </Form>
  );
};
