import * as React from 'react';
import { HostsTableEmptyState } from '../../../../common/components/hosts/HostsTable';
import { ClusterHostsTableProps } from '../../../../common/components/hosts/types';
import { isSNO } from '../../../../common/selectors/clusterSelectors';
import { AdditionalNTPSourcesDialogToggle } from '../../hosts/AdditionaNTPSourceDialogToggle';
import { HostsTableModals, useHostsTable } from '../../hosts/use-hosts-table';
import CommonNetworkConfigurationTable from '../../../../common/components/clusterConfiguration/NetworkConfigurationTable';
import useClusterPermissions from '../../../hooks/useClusterPermissions';

const NetworkConfigurationTable = ({
  cluster,
  setDiscoveryHintModalOpen,
  skipDisabled,
}: ClusterHostsTableProps) => {
  const { isViewerMode } = useClusterPermissions();
  const { onEditHost, actionChecks, onEditRole, actionResolver, ...modalProps } = useHostsTable(
    cluster,
    isViewerMode,
  );

  return (
    <>
      <CommonNetworkConfigurationTable
        cluster={cluster}
        skipDisabled={skipDisabled}
        AdditionalNTPSourcesDialogToggleComponent={AdditionalNTPSourcesDialogToggle}
        canEditRole={actionChecks.canEditRole}
        onEditHost={onEditHost}
        onEditRole={onEditRole}
        actionResolver={actionResolver}
      >
        <HostsTableEmptyState
          isSNO={isSNO(cluster)}
          setDiscoveryHintModalOpen={setDiscoveryHintModalOpen}
        />
      </CommonNetworkConfigurationTable>
      <HostsTableModals cluster={cluster} {...modalProps} />
    </>
  );
};

export default NetworkConfigurationTable;
