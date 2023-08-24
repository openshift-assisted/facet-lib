import React from 'react';
import { Button, ButtonVariant } from '@patternfly/react-core';
import { AddHostsContext } from '../../../../common';
import { useModalDialogsContext } from '../../hosts/ModalDialogsContext';
import { Cluster } from '@openshift-assisted/types/assisted-installer-service';

const Day2DiscoveryImageModalButton = ({ cluster }: { cluster: Cluster }) => {
  const { day2DiscoveryImageDialog } = useModalDialogsContext();
  const { open } = day2DiscoveryImageDialog;
  const { canEdit } = React.useContext(AddHostsContext);

  return (
    <Button
      variant={ButtonVariant.secondary}
      onClick={() => open({ cluster })}
      id={`bare-metal-inventory-add-host-button-download-discovery-iso`}
      isDisabled={!canEdit}
    >
      Add hosts
    </Button>
  );
};

export default Day2DiscoveryImageModalButton;
