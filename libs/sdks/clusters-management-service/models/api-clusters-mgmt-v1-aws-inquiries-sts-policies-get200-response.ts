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
import { AWSSTSPolicy } from './awsstspolicy';

/**
 * 
 * @export
 * @interface ApiClustersMgmtV1AwsInquiriesStsPoliciesGet200Response
 */
export interface ApiClustersMgmtV1AwsInquiriesStsPoliciesGet200Response {
    /**
     * Retrieved list of policies.
     * @type {Array<AWSSTSPolicy>}
     * @memberof ApiClustersMgmtV1AwsInquiriesStsPoliciesGet200Response
     */
    'items'?: Array<AWSSTSPolicy>;
    /**
     * Index of the requested page, where one corresponds to the first page.
     * @type {number}
     * @memberof ApiClustersMgmtV1AwsInquiriesStsPoliciesGet200Response
     */
    'page'?: number;
    /**
     * Maximum number of items that will be contained in the returned page.
     * @type {number}
     * @memberof ApiClustersMgmtV1AwsInquiriesStsPoliciesGet200Response
     */
    'size'?: number;
    /**
     * Total number of items of the collection that match the search criteria, regardless of the size of the page.
     * @type {number}
     * @memberof ApiClustersMgmtV1AwsInquiriesStsPoliciesGet200Response
     */
    'total'?: number;
}

