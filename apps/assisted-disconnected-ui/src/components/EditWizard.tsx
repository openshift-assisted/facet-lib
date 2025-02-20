import {
  AlertsContextProvider,
  CpuArchitecture,
  ErrorState,
  ResourceUIState,
} from '@openshift-assisted/ui-lib/common';
import {
  ClusterLoading,
  ClusterWizardContextProvider,
  useClusterPolling,
  ClusterWizard,
  useInfraEnv,
  ModalDialogsContextProvider,
  ClusterDefaultConfigurationProvider,
  ClusterUiError,
  OpenshiftVersionsContextProvider,
  NewFeatureSupportLevelProvider,
} from '@openshift-assisted/ui-lib/ocm';
import { PageSection, PageSectionVariants } from '@patternfly/react-core';
import { useParams } from 'react-router-dom-v5-compat';

const EditWizard = () => {
  const { clusterId } = useParams<{ clusterId: string }>() as { clusterId: string };
  const { cluster, uiState, errorDetail } = useClusterPolling(clusterId);
  const pullSecret = '';
  const {
    infraEnv,
    isLoading: infraEnvLoading,
    error: infraEnvError,
    updateInfraEnv,
  } = useInfraEnv(
    clusterId,
    cluster?.cpuArchitecture
      ? (cluster.cpuArchitecture as CpuArchitecture)
      : CpuArchitecture.USE_DAY1_ARCHITECTURE,
    cluster?.name,
    pullSecret,
    cluster?.openshiftVersion,
  );

  if (uiState === ResourceUIState.LOADING || infraEnvLoading || !cluster || !infraEnv) {
    return <ClusterLoading />;
  }

  if (uiState === ResourceUIState.POLLING_ERROR || infraEnvError) {
    return (
      <PageSection variant={PageSectionVariants.light} isFilled>
        <ErrorState
          title="Failed to fetch the cluster"
          content={errorDetail?.message || infraEnvError}
        />
      </PageSection>
    );
  }

  return (
    <AlertsContextProvider>
      <ModalDialogsContextProvider>
        <ClusterDefaultConfigurationProvider
          loadingUI={<ClusterLoading />}
          errorUI={<ClusterUiError />}
        >
          <OpenshiftVersionsContextProvider>
            <NewFeatureSupportLevelProvider loadingUi={<ClusterLoading />}>
              <PageSection variant={PageSectionVariants.light}>
                <ClusterWizardContextProvider cluster={cluster} infraEnv={infraEnv}>
                  <ClusterWizard
                    cluster={cluster}
                    infraEnv={infraEnv}
                    updateInfraEnv={updateInfraEnv}
                  />
                </ClusterWizardContextProvider>
              </PageSection>
            </NewFeatureSupportLevelProvider>
          </OpenshiftVersionsContextProvider>
        </ClusterDefaultConfigurationProvider>
      </ModalDialogsContextProvider>
    </AlertsContextProvider>
  );
};

export default EditWizard;
