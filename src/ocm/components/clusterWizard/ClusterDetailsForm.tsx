import React from 'react';
import isUndefined from 'lodash/isUndefined';
import { useLocation } from 'react-router-dom';
import { Formik, FormikHelpers } from 'formik';
import {
  Cluster,
  ClusterCreateParams,
  V2ClusterUpdateParams,
  ManagedDomain,
  ClusterWizardStep,
  ClusterWizardStepHeader,
  getClusterDetailsValidationSchema,
  InfraEnv,
  getRichTextValidation,
} from '../../../common';
import { Grid, GridItem } from '@patternfly/react-core';
import { canNextClusterDetails } from './wizardTransition';
import { OpenshiftVersionOptionType, getFormikErrorFields } from '../../../common';
import ClusterWizardFooter from './ClusterWizardFooter';
import ClusterWizardHeaderExtraActions from '../clusterConfiguration/ClusterWizardHeaderExtraActions';
import { ocmClient } from '../../api';
import { useFeatureSupportLevel } from '../../../common/components/featureSupportLevels';
import { ClusterDetailsService } from '../../services';
import { OcmClusterDetailsValues } from '../../services/types';
import { OcmClusterDetailsFormFields } from '../clusterConfiguration/OcmClusterDetailsFormFields';
import useClusterPermissions from '../../hooks/useClusterPermissions';

type ClusterDetailsFormProps = {
  cluster?: Cluster;
  infraEnv?: InfraEnv;
  pullSecret: string;
  managedDomains: ManagedDomain[];
  ocpVersions: OpenshiftVersionOptionType[];
  usedClusterNames: string[];
  navigation: React.ReactNode;
  moveNext: () => void;
  handleClusterCreate: (params: ClusterCreateParams) => Promise<void>;
  handleClusterUpdate: (clusterId: Cluster['id'], params: V2ClusterUpdateParams) => Promise<void>;
};

const ClusterDetailsForm: React.FC<ClusterDetailsFormProps> = (props) => {
  const {
    cluster,
    infraEnv,
    pullSecret,
    managedDomains,
    ocpVersions,
    usedClusterNames = [],
    moveNext,
    handleClusterUpdate,
    handleClusterCreate,
    navigation,
  } = props;

  const { search } = useLocation();
  const { isViewerMode } = useClusterPermissions();
  const featureSupportLevels = useFeatureSupportLevel();
  const handleSubmit = React.useCallback(
    async (values: OcmClusterDetailsValues) => {
      const params = ClusterDetailsService.getClusterCreateParams(values);
      if (cluster) {
        await handleClusterUpdate(cluster.id, params);
      } else {
        await handleClusterCreate(params);
      }
    },
    [cluster, handleClusterCreate, handleClusterUpdate],
  );

  const handleOnNext = (
    dirty: boolean,
    submitForm: FormikHelpers<unknown>['submitForm'],
    cluster?: Cluster,
  ): (() => Promise<void> | void) => {
    if (isViewerMode || (!dirty && !isUndefined(cluster) && canNextClusterDetails({ cluster }))) {
      return moveNext;
    }
    return submitForm;
  };

  const initialValues = React.useMemo(
    () =>
      ClusterDetailsService.getClusterDetailsInitialValues({
        infraEnv,
        cluster,
        pullSecret,
        managedDomains,
        ocpVersions,
        urlSearchParams: search,
      }),
    [cluster, pullSecret, managedDomains, ocpVersions, infraEnv],
  );

  const validationSchema = getClusterDetailsValidationSchema({
    usedClusterNames,
    featureSupportLevels,
    pullSecretSet: cluster?.pullSecretSet,
    ocpVersions,
    isOcm: true,
  });

  return (
    <Formik
      initialValues={initialValues}
      validate={getRichTextValidation(validationSchema)}
      onSubmit={handleSubmit}
    >
      {({ submitForm, isSubmitting, isValid, dirty, setFieldValue, errors, touched }) => {
        const errorFields = getFormikErrorFields(errors, touched);
        const toggleRedHatDnsService = (checked: boolean) =>
          setFieldValue('baseDnsDomain', checked ? managedDomains.map((d) => d.domain)[0] : '');

        const form = (
          <>
            <Grid hasGutter>
              <GridItem>
                <ClusterWizardStepHeader
                  extraItems={<ClusterWizardHeaderExtraActions cluster={cluster} />}
                >
                  Cluster details
                </ClusterWizardStepHeader>
              </GridItem>
              <GridItem span={12} lg={10} xl={9} xl2={7}>
                <OcmClusterDetailsFormFields
                  toggleRedHatDnsService={toggleRedHatDnsService}
                  versions={ocpVersions}
                  forceOpenshiftVersion={cluster?.openshiftVersion}
                  isPullSecretSet={!!cluster?.pullSecretSet}
                  defaultPullSecret={pullSecret}
                  isOcm={!!ocmClient}
                  managedDomains={managedDomains}
                  clusterExists={!!cluster}
                />
              </GridItem>
            </Grid>
          </>
        );

        const canMoveToNext =
          !isSubmitting && isValid && (dirty || (cluster && canNextClusterDetails({ cluster })));
        const footer = (
          <ClusterWizardFooter
            cluster={cluster}
            errorFields={errorFields}
            isSubmitting={isSubmitting}
            isNextDisabled={!(isViewerMode || canMoveToNext)}
            onNext={handleOnNext(dirty, submitForm, cluster)}
          />
        );
        return (
          <ClusterWizardStep navigation={navigation} footer={footer}>
            {form}
          </ClusterWizardStep>
        );
      }}
    </Formik>
  );
};

export default ClusterDetailsForm;
