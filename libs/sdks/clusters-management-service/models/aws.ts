/* tslint:disable */
/* eslint-disable */
/**
 * clusters_mgmt
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * Contact: ocm-feedback@redhat.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


// May contain unused imports in some cases
// @ts-ignore
import { AuditLog } from './audit-log';
// May contain unused imports in some cases
// @ts-ignore
import { AwsEtcdEncryption } from './aws-etcd-encryption';
// May contain unused imports in some cases
// @ts-ignore
import { Ec2MetadataHttpTokens } from './ec2-metadata-http-tokens';
// May contain unused imports in some cases
// @ts-ignore
import { PrivateLinkClusterConfiguration } from './private-link-cluster-configuration';
// May contain unused imports in some cases
// @ts-ignore
import { STS } from './sts';

/**
 * _Amazon Web Services_ specific settings of a cluster.
 * @export
 * @interface AWS
 */
export interface AWS {
    /**
     * Customer Managed Key to encrypt EBS Volume
     * @type {string}
     * @memberof AWS
     */
    'kms_key_arn'?: string;
    /**
     * 
     * @type {STS}
     * @memberof AWS
     */
    'sts'?: STS;
    /**
     * AWS access key identifier.
     * @type {string}
     * @memberof AWS
     */
    'access_key_id'?: string;
    /**
     * AWS account identifier.
     * @type {string}
     * @memberof AWS
     */
    'account_id'?: string;
    /**
     * 
     * @type {AuditLog}
     * @memberof AWS
     */
    'audit_log'?: AuditLog;
    /**
     * BillingAccountID is the account used for billing subscriptions purchased via the marketplace
     * @type {string}
     * @memberof AWS
     */
    'billing_account_id'?: string;
    /**
     * 
     * @type {Ec2MetadataHttpTokens}
     * @memberof AWS
     */
    'ec2_metadata_http_tokens'?: Ec2MetadataHttpTokens;
    /**
     * 
     * @type {AwsEtcdEncryption}
     * @memberof AWS
     */
    'etcd_encryption'?: AwsEtcdEncryption;
    /**
     * ID of private hosted zone.
     * @type {string}
     * @memberof AWS
     */
    'private_hosted_zone_id'?: string;
    /**
     * Role ARN for private hosted zone.
     * @type {string}
     * @memberof AWS
     */
    'private_hosted_zone_role_arn'?: string;
    /**
     * Sets cluster to be inaccessible externally.
     * @type {boolean}
     * @memberof AWS
     */
    'private_link'?: boolean;
    /**
     * 
     * @type {PrivateLinkClusterConfiguration}
     * @memberof AWS
     */
    'private_link_configuration'?: PrivateLinkClusterConfiguration;
    /**
     * AWS secret access key.
     * @type {string}
     * @memberof AWS
     */
    'secret_access_key'?: string;
    /**
     * The subnet ids to be used when installing the cluster.
     * @type {Array<string>}
     * @memberof AWS
     */
    'subnet_ids'?: Array<string>;
    /**
     * Optional keys and values that the installer will add as tags to all AWS resources it creates
     * @type {{ [key: string]: string; }}
     * @memberof AWS
     */
    'tags'?: { [key: string]: string; };
}



