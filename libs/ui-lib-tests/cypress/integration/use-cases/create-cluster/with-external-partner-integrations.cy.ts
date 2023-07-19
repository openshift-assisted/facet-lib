
import { externalPlatformTypes } from '../../../fixtures/cluster/external-platform-types';
import { clusterDetailsPage } from '../../../views/clusterDetails';
import { commonActions } from '../../../views/common';
import ClusterDetailsForm from '../../../views/forms/ClusterDetailsForm';
import NewClusterPage from '../../../views/pages/NewClusterPage';

describe('Create a new cluster with external partner integrations', () => {
  const setTestStartSignal = (activeSignal: string) => {
    cy.setTestEnvironment({
      activeSignal,
      activeScenario: 'AI_CREATE_MULTINODE',
    });
  };

  before(() => setTestStartSignal(''));
  beforeEach(() => setTestStartSignal(''));

  xcontext('When the feature is disabled:', () => {
    // TODO(jkilzi): Find out how to mock the LibRouter store and features props.
    // This test case is disabled intentionally because it requires tweaking the
    // props passed to the LibRouter in the app.
    it('The user cannot see the external partner integrations oracle option', () => {
      // Disable somehow Features.STANDALONE_DEPLOYMENT_ENABLED_FEATURES.ASSISTED_INSTALLER_PLATFORM_OCI, then...
      // ClusterDetailsForm.externalPartnerIntegrationsControl.findLabel().should('not.exist');
    });
  });

  context('When the feature is enabled:', () => {
    beforeEach(() => {
      NewClusterPage.visit();
    });

    it('Should display correct items in the external platform integration dropdown', () => {
      ClusterDetailsForm.externalPartnerIntegrationsControl.platformIntegrationDropdownButton.click();
      ClusterDetailsForm.externalPartnerIntegrationsControl.platformIntegrationDropdownItems.each(
        (item) => {
          // Get the expected values from the externalPlatformTypes object
          const platformType = item.parent().attr('id');
          const { label, href } = externalPlatformTypes[platformType];

          // Assert the label
          cy.wrap(item).should('contain', label);


          // Assert the href
          if (href) {
            cy.wrap(item)
              .find('a')
              .should('have.attr', 'href', href)
              .and('have.attr', 'target', '_blank')
              .and('have.attr', 'rel', 'noopener noreferrer');
          } else {
            cy.wrap(item).find('a').should('not.exist');
          }
        },
      );
    });

    it('Can select one platform option and cluster is created well', () => {
      clusterDetailsPage.inputClusterName();
      clusterDetailsPage.inputBaseDnsDomain();
      clusterDetailsPage.inputOpenshiftVersion();

      clusterDetailsPage.inputPullSecret();

      ClusterDetailsForm.externalPartnerIntegrationsControl.platformIntegrationDropdownButton.click();
      ClusterDetailsForm.externalPartnerIntegrationsControl
        .getPlatformIntegrationDropdownItemByLabel('Nutanix')
        .click();
      commonActions.verifyNextIsEnabled();
      commonActions.toNextStepAfter('Cluster details');

      cy.wait('@create-cluster').then(({ request }) => {
        expect(request.body.platform.type.valueOf()).to.deep.equal('nutanix');
      });

    it('Selecting external partner integrations checkbox enables custom manifests as well', () => {
      clusterDetailsPage.inputOpenshiftVersion('4.14');
      ClusterDetailsForm.externalPartnerIntegrationsControl.findLabel().click();
      ClusterDetailsForm.customManifestsControl.findCheckbox().should('be.checked');
    });

    it('External partner integrations checkbox is unselected after OCP < v4.14 is selected', () => {
      clusterDetailsPage.inputOpenshiftVersion('4.14');
      ClusterDetailsForm.externalPartnerIntegrationsControl.findLabel().click();
      clusterDetailsPage.inputOpenshiftVersion('4.13');
      ClusterDetailsForm.externalPartnerIntegrationsControl.findCheckbox().should('not.be.checked');
    });

    xit('The minimal ISO is presented by default', () => {
      // TODO(jkilzi): WIP...
      // ClusterDetailsForm.clusterNameControl
      //   .findInputField()
      //   .scrollIntoView()
      //   .type(Cypress.env('CLUSTER_NAME'));
      // ClusterDetailsForm.baseDomainControl.findInputField().scrollIntoView().type('redhat.com');
      // ClusterDetailsForm.openshiftVersionControl.findInputField().scrollIntoView().type('redhat.com');

    });

    //TODO (mortegag) : Add tests for options disabled and tooltips
  });
});
