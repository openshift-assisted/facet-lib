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
import { MachineType } from './machine-type';

/**
 * 
 * @export
 * @interface ApiClustersMgmtV1MachineTypesGet200Response
 */
export interface ApiClustersMgmtV1MachineTypesGet200Response {
    /**
     * Retrieved list of cloud providers.
     * @type {Array<MachineType>}
     * @memberof ApiClustersMgmtV1MachineTypesGet200Response
     */
    'items'?: Array<MachineType>;
    /**
     * Index of the requested page, where one corresponds to the first page.
     * @type {number}
     * @memberof ApiClustersMgmtV1MachineTypesGet200Response
     */
    'page'?: number;
    /**
     * Maximum number of items that will be contained in the returned page.
     * @type {number}
     * @memberof ApiClustersMgmtV1MachineTypesGet200Response
     */
    'size'?: number;
    /**
     * Total number of items of the collection that match the search criteria, regardless of the size of the page.
     * @type {number}
     * @memberof ApiClustersMgmtV1MachineTypesGet200Response
     */
    'total'?: number;
}

