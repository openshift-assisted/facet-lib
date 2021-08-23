import React from 'react';
import { saveAs } from 'file-saver';
import { GridItem, Alert, AlertVariant, AlertActionLink } from '@patternfly/react-core';
import { toSentence } from '../../../common/components/ui/table/utils';
import { getBugzillaLink } from '../../../common/config';
import { AgentClusterInstallK8sResource } from '../../types';
import { k8sProxyURL } from '../helpers/proxy';

type ClusterInstallationErrorProps = {
  statusInfo: string;
  agentClusterInstall?: AgentClusterInstallK8sResource;
  openshiftVersion?: string;
  backendURL: string;
  title?: string;
};

const getID = (suffix: string) => `cluster-install-error-${suffix}`;

const getLogsURL = (backendURL: string, agentClusterInstall?: AgentClusterInstallK8sResource) => {
  if (agentClusterInstall?.status?.debugInfo?.logsURL) {
    const logsURL = new URL(agentClusterInstall.status?.debugInfo?.logsURL);
    return `${backendURL}${k8sProxyURL}${logsURL.pathname}${logsURL.search}`;
  }
  return null;
};

const ClusterInstallationError: React.FC<ClusterInstallationErrorProps> = ({
  backendURL,
  agentClusterInstall,
  statusInfo,
  openshiftVersion = '4.8',
  title = 'Cluster installation failed',
}) => {
  const logsURL = getLogsURL(backendURL, agentClusterInstall);
  return (
    <GridItem>
      <Alert
        variant={AlertVariant.danger}
        title={title}
        actionLinks={
          <>
            <AlertActionLink
              onClick={() => logsURL && saveAs(logsURL)}
              isDisabled={!logsURL}
              id={getID('button-download-installation-logs')}
            >
              Download Installation Logs
            </AlertActionLink>
            <AlertActionLink
              onClick={() => window.open(getBugzillaLink(openshiftVersion), '_blank')}
              id={getID('button-report-bug')}
            >
              Report a bug
            </AlertActionLink>
          </>
        }
        isInline
      >
        {toSentence(statusInfo)}
      </Alert>
    </GridItem>
  );
};

export default ClusterInstallationError;
