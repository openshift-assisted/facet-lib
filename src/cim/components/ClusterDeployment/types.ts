import { K8sResourceCommon } from 'console-sdk-ai-lib';
import { ClusterDetailsValues } from '../../../common/components/clusterWizard/types';
import { NetworkConfigurationValues } from '../../../common/types/clusters';
import {
  AgentK8sResource,
  ClusterDeploymentK8sResource,
  AgentClusterInstallK8sResource,
  InfraEnvK8sResource,
  SecretK8sResource,
  ConfigMapK8sResource,
} from '../../types';
import { BareMetalHostK8sResource } from '../../types/k8s/bare-metal-host';
import { ClusterImageSetK8sResource } from '../../types/k8s/cluster-image-set';
import { AddHostModalProps, EditBMHModalProps } from '../modals/types';

export type EditAgentModalProps = {
  agent: AgentK8sResource | undefined;
  isOpen: boolean;
  usedHostnames: string[] | undefined;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (agent: AgentK8sResource, hostname: string) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFormSaveError?: (e: any) => void | string;
};

export type ClusterDeploymentHostsTablePropsActions = {
  canEditHost?: (agent: AgentK8sResource) => boolean;
  onEditHost?: (agent: AgentK8sResource) => void;
  canEditRole?: (agent: AgentK8sResource) => boolean;
  onEditRole?: (agent: AgentK8sResource, role: string | undefined) => Promise<AgentK8sResource>;
  canDelete?: (agent?: AgentK8sResource, bmh?: BareMetalHostK8sResource) => boolean;
  // eslint-disable-next-line
  onDeleteHost?: (agent?: AgentK8sResource, bmh?: BareMetalHostK8sResource) => Promise<any>;
  onApprove?: (agent: AgentK8sResource) => Promise<AgentK8sResource>;
  onSelect?: (agent: AgentK8sResource, selected: boolean) => void;
  onEditBMH?: (bmh: BareMetalHostK8sResource) => void;
  canUnbindHost?: (agent?: AgentK8sResource) => [/* enabled */ boolean, /* reason */ string];
  onUnbindHost?: (agent: AgentK8sResource) => void;
};

export type ClusterDeploymentWizardStepsType =
  | 'cluster-details'
  | 'hosts-selection'
  | 'hosts-discovery'
  | 'networking'
  | 'review';

export type ClusterDeploymentDetailsProps = {
  clusterImages: ClusterImageSetK8sResource[];
  clusterDeployment: ClusterDeploymentK8sResource;
  agentClusterInstall: AgentClusterInstallK8sResource;
  agents: AgentK8sResource[];
  usedClusterNames: string[];
  pullSecret?: string;
};

export type ClusterDeploymentDetailsValues = ClusterDetailsValues;
export type ClusterDeploymentNetworkingValues = NetworkConfigurationValues;
export type ClusterDeploymentHostsSelectionValues = {
  autoSelectHosts: boolean;
  hostCount: number;
  useMastersAsWorkers: boolean;
  agentLabels: string[];
  locations: string[];
  selectedHostIds: string[];
  autoSelectedHostIds: string[];
};
export type ClusterDeploymentHostsDiscoveryValues = {
  /* TODO(mlibra): CNV, OCS */
};

export type ScaleUpFormValues = Omit<ClusterDeploymentHostsSelectionValues, 'useMastersAsWorkers'>;

export type ClusterDeploymentDetailsStepProps = ClusterDeploymentDetailsProps & {
  onSaveDetails: (values: ClusterDeploymentDetailsValues) => Promise<string | void>;
  onClose: () => void;
  isPreviewOpen: boolean;
};

export type ClusterDeploymentDetailsNetworkingProps = {
  clusterDeployment: ClusterDeploymentK8sResource;
  agentClusterInstall: AgentClusterInstallK8sResource;
  agents: AgentK8sResource[];
  onSaveNetworking: (values: ClusterDeploymentNetworkingValues) => Promise<string | void>;
  onClose: () => void;
  hostActions: ClusterDeploymentHostsTablePropsActions;
  fetchInfraEnv: (name: string, namespace: string) => Promise<InfraEnvK8sResource>;
  isPreviewOpen: boolean;
};

export type AgentSelectorChangeProps = {
  labels: string[];
  locations: string[];
  autoSelect: boolean;
};

export type ClusterDeploymentHostSelectionStepProps = Omit<
  ClusterDeploymentHostsSelectionProps,
  'onValuesChanged'
> & {
  onSaveHostsSelection: (values: ClusterDeploymentHostsSelectionValues) => Promise<string | void>;
  onClose: () => void;
  hostActions?: ClusterDeploymentHostsTablePropsActions;
};

export type ClusterDeploymentHostsDiscoveryStepProps = Omit<
  ClusterDeploymentHostsDiscoveryProps,
  'onValuesChanged'
> & {
  onSaveHostsDiscovery: (values: ClusterDeploymentHostsDiscoveryValues) => Promise<string | void>;
  onClose: () => void;
};

export type ClusterDeploymentWizardProps = Pick<
  ClusterDeploymentHostsDiscoveryStepProps,
  | 'onSaveHostsDiscovery'
  | 'onDeleteHost'
  | 'canDeleteAgent'
  | 'onSaveAgent'
  | 'canEditHost'
  | 'onSaveBMH'
  | 'onSaveISOParams'
  | 'onCreateBMH'
  | 'getClusterDeploymentLink'
  | 'fetchSecret'
  | 'fetchNMState'
  | 'isBMPlatform'
> & {
  className?: string;

  onClose: () => void;
  onSaveDetails: ClusterDeploymentDetailsStepProps['onSaveDetails'];
  onSaveNetworking: ClusterDeploymentDetailsNetworkingProps['onSaveNetworking'];
  onSaveHostsSelection: ClusterDeploymentHostSelectionStepProps['onSaveHostsSelection'];
  onApproveAgent: InfraEnvAgentTableProps['onApprove'];
  onFinish: () => Promise<AgentClusterInstallK8sResource>;

  hostActions: ClusterDeploymentHostsTablePropsActions;
  clusterImages: ClusterImageSetK8sResource[];
  usedClusterNames: string[];

  clusterDeployment: ClusterDeploymentK8sResource;
  agentClusterInstall: AgentClusterInstallK8sResource;
  agents: AgentK8sResource[];
  aiConfigMap?: ConfigMapK8sResource;
  infraEnv?: InfraEnvK8sResource;
  fetchInfraEnv: (name: string, namespace: string) => Promise<InfraEnvK8sResource>;
  initialStep?: ClusterDeploymentWizardStepsType;
  isPreviewOpen: boolean;
  setPreviewOpen: (open: boolean) => void;
  fetchManagedClusters: () => Promise<K8sResourceCommon[]>;
  fetchKlusterletAddonConfig: () => Promise<K8sResourceCommon[]>;
};

export type FetchSecret = (name: string, namespace: string) => Promise<SecretK8sResource>;

export type ClusterDeploymentHostsSelectionProps = {
  clusterDeployment: ClusterDeploymentK8sResource;
  agentClusterInstall: AgentClusterInstallK8sResource;
  agents: AgentK8sResource[];
  aiConfigMap?: ConfigMapK8sResource;
  hostActions?: ClusterDeploymentHostsTablePropsActions;
};

export type InfraEnvAgentTableProps = ClusterDeploymentHostsTablePropsActions & {
  agents: AgentK8sResource[];
  bareMetalHosts: BareMetalHostK8sResource[];
  infraEnv: InfraEnvK8sResource;
  getClusterDeploymentLink: (cd: { name: string; namespace: string }) => string | React.ReactNode;
  className?: string;
  onChangeHostname: (agent: AgentK8sResource, hostname: string) => Promise<AgentK8sResource>;
  onChangeBMHHostname: (
    bmh: BareMetalHostK8sResource,
    hostname: string,
  ) => Promise<BareMetalHostK8sResource>;
  // eslint-disable-next-line
  onMassDeleteHost?: (agent?: AgentK8sResource, bmh?: BareMetalHostK8sResource) => Promise<any>;
  isBMPlatform: boolean;
};

export type ClusterDeploymentHostsDiscoveryProps = {
  agentClusterInstall: AgentClusterInstallK8sResource;
  agents: AgentK8sResource[];
  bareMetalHosts: BareMetalHostK8sResource[];
  aiConfigMap?: ConfigMapK8sResource;
  infraEnv: InfraEnvK8sResource;
  isBMPlatform: boolean;

  usedHostnames: EditAgentModalProps['usedHostnames'];
  onValuesChanged?: (values: ClusterDeploymentHostsDiscoveryValues) => void;
  onCreateBMH?: AddHostModalProps['onCreateBMH'];
  onDeleteHost: InfraEnvAgentTableProps['onDeleteHost'];
  canDeleteAgent: InfraEnvAgentTableProps['canDelete'];
  onSaveAgent: EditAgentModalProps['onSave'];
  canEditHost: InfraEnvAgentTableProps['canEditHost'];
  canEditRole: InfraEnvAgentTableProps['canEditRole'];
  onEditRole: InfraEnvAgentTableProps['onEditRole'];
  onSaveBMH: EditBMHModalProps['onEdit'];
  onSaveISOParams: AddHostModalProps['onSaveISOParams'];
  onFormSaveError?: EditAgentModalProps['onFormSaveError'];
  fetchSecret: EditBMHModalProps['fetchSecret'];
  fetchNMState: EditBMHModalProps['fetchNMState'];
  getClusterDeploymentLink: InfraEnvAgentTableProps['getClusterDeploymentLink'];
  onChangeBMHHostname: InfraEnvAgentTableProps['onChangeBMHHostname'];
  onApproveAgent: InfraEnvAgentTableProps['onApprove'];
};
