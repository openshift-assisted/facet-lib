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



/**
 * Hypershift configuration.
 * @export
 * @interface HypershiftConfig
 */
export interface HypershiftConfig {
    /**
     * Boolean flag indicating if the cluster should be creating using _Hypershift_.  By default this is `false`.  To enable it the cluster needs to be ROSA cluster and the organization of the user needs to have the `hypershift` capability enabled.
     * @type {boolean}
     * @memberof HypershiftConfig
     */
    'enabled'?: boolean;
    /**
     * Contains the name of the current management cluster for this Hypershift cluster. Empty for non Hypershift clusters.
     * @type {string}
     * @memberof HypershiftConfig
     */
    'management_cluster'?: string;
}

