import * as React from 'react';
import { expandable, ICell, IRowData, sortable } from '@patternfly/react-table';
import { Host, HostsTable, HostsTableActions, HostsTableProps } from '../../../common';
import { AdditionalNTPSourcesDialogToggle } from '../../../ocm/components/hosts/AdditionaNTPSourceDialogToggle';
import { AgentK8sResource } from '../../types';
import { ClusterDeploymentHostsTablePropsActions } from '../ClusterDeployment/types';
import { getAIHosts, hostToAgent } from '../helpers';

type GetAgentCallback = <R>(
  agentCallback: ((agent: AgentK8sResource) => R) | undefined,
  agents: AgentK8sResource[],
) => ((host: Host) => R) | undefined;

const getAgentCallback: GetAgentCallback = (agentCallback, agents) =>
  agentCallback ? (host) => agentCallback(hostToAgent(agents, host)) : undefined;

export const useAgentTableActions = ({
  onDeleteHost,
  onEditRole,
  onEditHost,
  canDelete,
  canEditHost,
  canEditRole,
  onHostSelected,
  agents,
}: ClusterDeploymentHostsTablePropsActions & {
  agents: AgentK8sResource[];
  onHostSelected?: (agent: AgentK8sResource, selected: boolean) => void;
}): HostsTableActions =>
  React.useMemo(
    () => ({
      onDeleteHost: onDeleteHost
        ? (event: React.MouseEvent, rowIndex: number, rowData: IRowData) => {
            const agent = agents.find(
              (a) => a.metadata?.uid === rowData.host.id,
            ) as AgentK8sResource;
            onDeleteHost(agent);
          }
        : undefined,
      onEditRole: onEditRole
        ? (host: Host, role: string | undefined) => {
            const agent = agents.find((a) => a.metadata?.uid === host.id) as AgentK8sResource;
            return onEditRole(agent, role);
          }
        : undefined,
      onEditHost: getAgentCallback(onEditHost, agents),
      canDelete: getAgentCallback(canDelete, agents),
      canEditHost: getAgentCallback(canEditHost, agents),
      canEditRole: getAgentCallback(canEditRole, agents),
      onHostSelected: onHostSelected
        ? (host: Host, selected: boolean) => {
            const agent = agents.find((a) => a.metadata?.uid === host.id) as AgentK8sResource;
            onHostSelected(agent, selected);
          }
        : undefined,
    }),
    [
      onDeleteHost,
      onEditHost,
      onEditRole,
      canDelete,
      canEditHost,
      canEditRole,
      onHostSelected,
      agents,
    ],
  );

const defaultAgentTableColumns = [
  { title: 'Hostname', transforms: [sortable], cellFormatters: [expandable] },
  { title: 'Role', transforms: [sortable] },
  { title: 'Status', transforms: [sortable] },
  { title: 'Discovered At', transforms: [sortable] },
  { title: 'CPU Cores', transforms: [sortable] }, // cores per machine (sockets x cores)
  { title: 'Memory', transforms: [sortable] },
  { title: 'Disk', transforms: [sortable] },
  { title: '' },
];

export const getAgentTableColumns = (
  patchFunc?: (colIndex: number, colDefault: ICell) => ICell,
) => {
  if (patchFunc) {
    return defaultAgentTableColumns
      .map((col, colIndex) => patchFunc(colIndex, col))
      .filter(Boolean);
  }
  return defaultAgentTableColumns;
};

type AgentTableProps = ClusterDeploymentHostsTablePropsActions & {
  agents: AgentK8sResource[];
  className?: string;
  columns?: HostsTableProps['columns'];
  hostToHostTableRow?: HostsTableProps['hostToHostTableRow'];
  onHostSelected?: (agent: AgentK8sResource, selected: boolean) => void;
  selectedHostIds?: string[];
};

const AgentTable: React.FC<AgentTableProps> = ({
  agents,
  className,
  columns = getAgentTableColumns(),
  hostToHostTableRow,
  selectedHostIds,
  ...hostActions
}) => {
  const tableCallbacks = useAgentTableActions({
    ...hostActions,
    agents,
  });
  const restHosts = getAIHosts(agents);

  return (
    <HostsTable
      hosts={restHosts}
      EmptyState={() => <div>no hosts</div>}
      columns={columns}
      className={`agents-table ${className || ''}`}
      AdditionalNTPSourcesDialogToggleComponent={AdditionalNTPSourcesDialogToggle}
      hostToHostTableRow={hostToHostTableRow}
      selectedHostIds={selectedHostIds}
      {...tableCallbacks}
    />
  );
};

export default AgentTable;
