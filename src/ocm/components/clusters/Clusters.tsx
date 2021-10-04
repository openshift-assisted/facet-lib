import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import {
  Button,
  ButtonVariant,
  PageSectionVariants,
  TextContent,
  Text,
  PageSection,
} from '@patternfly/react-core';
import { AddCircleOIcon } from '@patternfly/react-icons';

import { selectClusterTableRows, selectClustersUIState } from '../../selectors/clusters';
import {
  ResourceUIState,
  Alerts,
  LoadingState,
  ErrorState,
  EmptyState,
  useAlerts,
  AlertsContextProvider,
} from '../../../common';
import ClustersTable from './ClustersTable';
import { fetchClustersAsync, deleteCluster } from '../../reducers/clusters/clustersSlice';
import { deleteCluster as ApiDeleteCluster } from '../../api/clusters';
import { handleApiError, getErrorMessage } from '../../api/utils';
import ClusterBreadcrumbs from './ClusterBreadcrumbs';
import { routeBasePath } from '../../config';
import HostsService from '../../api/services/HostsService';

type ClustersProps = RouteComponentProps;

const Clusters: React.FC<ClustersProps> = ({ history }) => {
  const { LOADING, EMPTY, ERROR, RELOADING } = ResourceUIState;
  const { addAlert } = useAlerts();
  const clusterRows = useSelector(selectClusterTableRows);
  const clustersUIState = useSelector(selectClustersUIState);
  const uiState = React.useRef(clustersUIState);
  if (clustersUIState !== RELOADING) {
    uiState.current = clustersUIState;
  }
  const dispatch = useDispatch();
  const fetchClusters = React.useCallback(() => dispatch(fetchClustersAsync()), [dispatch]);
  const deleteClusterAsync = React.useCallback(
    async (clusterId) => {
      try {
        // 0. get the f**ing infra-env-id
        const infraEnvId = 'ed8b0040-8c3f-4d7d-80c3-828be23e6f0a';
        // 1. remove all hosts: needs we need infra-env-id
        await HostsService.deleteAllHosts(infraEnvId);
        // 2. call await ApiDeleteCluster(clusterId);
        await ApiDeleteCluster(clusterId);
        // remove infraEnv: needs infra-env-id
        // await InfraEnvService.deleteInfraEnv(clusterId)
        dispatch(deleteCluster(clusterId));
      } catch (e) {
        return handleApiError(e, () =>
          addAlert({
            title: 'Cluster could not be deleted',
            message: getErrorMessage(e),
          }),
        );
      }
    },
    [dispatch, addAlert],
  );

  React.useEffect(() => {
    fetchClusters();
  }, [fetchClusters]);

  switch (uiState.current) {
    case LOADING:
      return (
        <PageSection variant={PageSectionVariants.light} isFilled>
          <LoadingState />
        </PageSection>
      );
    case ERROR:
      return (
        <PageSection variant={PageSectionVariants.light} isFilled>
          <ErrorState title="Failed to fetch clusters." fetchData={fetchClusters} />
        </PageSection>
      );
    case EMPTY:
      return (
        <PageSection variant={PageSectionVariants.light} isFilled>
          <EmptyState
            icon={AddCircleOIcon}
            title="Create new assisted cluster"
            content="There are no clusters yet. This wizard is going to guide you through the OpenShift cluster deployment."
            primaryAction={
              <Button
                variant={ButtonVariant.primary}
                onClick={() => history.push(`${routeBasePath}/clusters/~new`)}
                id="empty-state-new-cluster-button"
                data-ouia-id="button-create-new-cluster"
              >
                Create New Cluster
              </Button>
            }
          />
        </PageSection>
      );
    default:
      return (
        <>
          <ClusterBreadcrumbs />
          <PageSection variant={PageSectionVariants.light}>
            <TextContent>
              <Text component="h1">Assisted Clusters</Text>
            </TextContent>
          </PageSection>
          <PageSection variant={PageSectionVariants.light} isFilled>
            <Alerts />
            <ClustersTable rows={clusterRows} deleteCluster={deleteClusterAsync} />
          </PageSection>
        </>
      );
  }
};

const ClustersPage: React.FC<RouteComponentProps> = (props) => (
  <AlertsContextProvider>
    <Clusters {...props} />
  </AlertsContextProvider>
);

export default ClustersPage;
