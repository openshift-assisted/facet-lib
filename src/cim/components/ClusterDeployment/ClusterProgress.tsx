import * as React from 'react';
import { ClusterProgress as CommonClusterProgress } from '../../../common';
import {
  AgentClusterInstallK8sResource,
  AgentK8sResource,
  ClusterDeploymentK8sResource,
} from '../../types';
import { getAICluster } from '../helpers';
import { k8sProxyURL } from '../helpers/proxy';

const getEventsURL = (agentClusterInstall?: AgentClusterInstallK8sResource) => {
  if (agentClusterInstall?.status?.debugInfo?.eventsURL) {
    const eventsURL = new URL(agentClusterInstall.status?.debugInfo?.eventsURL);
    return `${k8sProxyURL}${eventsURL.pathname}${eventsURL.search}`;
  }
  return null;
};

type ClusterProgressProps = {
  clusterDeployment: ClusterDeploymentK8sResource;
  agentClusterInstall?: AgentClusterInstallK8sResource;
  agents: AgentK8sResource[];
  // eslint-disable-next-line
  fetchEvents: (url: string) => Promise<any>;
};

const ClusterProgress: React.FC<ClusterProgressProps> = ({
  clusterDeployment,
  agentClusterInstall,
  agents,
  fetchEvents,
}) => {
  const cluster = getAICluster({ clusterDeployment, agentClusterInstall, agents });
  return (
    <CommonClusterProgress
      cluster={cluster}
      onFetchEvents={async (params, onSuccess, onError) => {
        const eventsURL = getEventsURL(agentClusterInstall);
        if (!eventsURL) {
          onError('Cannot determine events URL');
        }
        try {
          const result = await fetchEvents(eventsURL as string);
          onSuccess(result);
        } catch (e) {
          onError(e.message);
        }
      }}
    />
  );
};

export default ClusterProgress;
