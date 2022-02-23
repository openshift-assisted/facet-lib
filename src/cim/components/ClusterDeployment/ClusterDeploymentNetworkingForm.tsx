import * as React from 'react';
import {
  Alert,
  Form,
  Grid,
  GridItem,
  Spinner,
  Text,
  TextContent,
  TextVariants,
  Checkbox,
  Split,
  SplitItem,
  Stack,
  StackItem,
} from '@patternfly/react-core';
import {
  ClusterDefaultConfig,
  CLUSTER_DEFAULT_NETWORK_SETTINGS_IPV4,
  getHostSubnets,
  SecurityFields,
  NetworkConfiguration,
  ProxyFields,
  ProxyInputFields,
} from '../../../common';
import ClusterDeploymentHostsNetworkTable from './ClusterDeploymentHostsNetworkTable';
import { getAICluster } from '../helpers';
import {
  AgentClusterInstallK8sResource,
  AgentK8sResource,
  ClusterDeploymentK8sResource,
  InfraEnvK8sResource,
} from '../../types';
import {
  ClusterDeploymentHostsTablePropsActions,
  ClusterDeploymentNetworkingValues,
} from './types';
import { useFormikContext } from 'formik';

// TODO(mlibra): So far a constant. Should be queried from somewhere.
export const defaultNetworkSettings: ClusterDefaultConfig = CLUSTER_DEFAULT_NETWORK_SETTINGS_IPV4;

type ClusterDeploymentNetworkingFormProps = {
  clusterDeployment: ClusterDeploymentK8sResource;
  agentClusterInstall: AgentClusterInstallK8sResource;
  agents: AgentK8sResource[];
  onValuesChanged?: (values: ClusterDeploymentNetworkingValues) => void;
  hostActions: ClusterDeploymentHostsTablePropsActions;
  infraEnvWithProxy: InfraEnvK8sResource | undefined;
  sameProxies: boolean;
  infraEnvsError: string | undefined;
  infraEnvsLoading: boolean;
};

const ClusterDeploymentNetworkingForm: React.FC<ClusterDeploymentNetworkingFormProps> = ({
  clusterDeployment,
  agentClusterInstall,
  agents,
  onValuesChanged,
  infraEnvWithProxy,
  sameProxies,
  infraEnvsError,
  infraEnvsLoading,
  ...rest
}) => {
  const { values, touched, setFieldValue, setFieldTouched } = useFormikContext<
    ClusterDeploymentNetworkingValues
  >();
  React.useEffect(() => onValuesChanged?.(values), [onValuesChanged, values]);
  const [editProxy, setEditProxy] = React.useState(false);

  const isVipDhcpAllocationDisabled = true; // So far not supported

  const cluster = getAICluster({
    clusterDeployment,
    agentClusterInstall,
    agents,
  });

  const hostSubnets = React.useMemo(() => getHostSubnets(cluster), [cluster]);

  React.useEffect(() => {
    if (!!infraEnvWithProxy && !touched.enableProxy) {
      setFieldTouched('enableProxy', true);
      setFieldValue('enableProxy', true);
      if (sameProxies) {
        setFieldValue('httpProxy', infraEnvWithProxy.spec?.proxy?.httpProxy);
        setFieldValue('httpsProxy', infraEnvWithProxy.spec?.proxy?.httpsProxy);
        setFieldValue('noProxy', infraEnvWithProxy.spec?.proxy?.noProxy);
      }
    }
  }, [infraEnvWithProxy, sameProxies, setFieldValue, touched.enableProxy, setFieldTouched]);

  let proxyConfig = <ProxyFields />;
  if (infraEnvWithProxy) {
    if (!sameProxies) {
      proxyConfig = (
        <>
          <TextContent>
            <Text component="h2">Cluster-wide proxy</Text>
            <Text component={TextVariants.p}>
              The hosts you selected are using different proxy settings. Configure a proxy that will
              be applied for these hosts. <b>Configure at least one of the proxy settings below.</b>
            </Text>
          </TextContent>
          <ProxyInputFields />
        </>
      );
    } else {
      proxyConfig = (
        <>
          <Checkbox
            id="edit-proxy"
            label="Edit cluster-wide proxy settings"
            onChange={setEditProxy}
            isChecked={editProxy}
            body={editProxy && <ProxyInputFields />}
          />
        </>
      );
    }
  }
  return (
    <Form>
      <Stack hasGutter>
        <StackItem>
          <Grid hasGutter>
            <GridItem span={12} lg={10} xl={9} xl2={7}>
              <NetworkConfiguration
                cluster={cluster}
                hostSubnets={hostSubnets}
                isVipDhcpAllocationDisabled={isVipDhcpAllocationDisabled}
                defaultNetworkSettings={defaultNetworkSettings}
                hideManagedNetworking
              />
            </GridItem>
          </Grid>
        </StackItem>
        {infraEnvsError ? (
          <StackItem>
            <Alert title={infraEnvsError} variant="danger" isInline />
          </StackItem>
        ) : infraEnvsLoading ? (
          <StackItem>
            <Split hasGutter>
              <SplitItem>
                <Spinner isSVG size="md" />
              </SplitItem>
              <SplitItem>Loading proxy configuration</SplitItem>
            </Split>
          </StackItem>
        ) : (
          <StackItem>{proxyConfig}</StackItem>
        )}
        <StackItem>
          <SecurityFields clusterSshKey={cluster.sshPublicKey} />
        </StackItem>
        <StackItem>
          <TextContent>
            <Text component="h2">Host inventory</Text>
          </TextContent>
          <ClusterDeploymentHostsNetworkTable
            clusterDeployment={clusterDeployment}
            agentClusterInstall={agentClusterInstall}
            agents={agents}
            {...rest}
          />
        </StackItem>
      </Stack>
    </Form>
  );
};

export default ClusterDeploymentNetworkingForm;
