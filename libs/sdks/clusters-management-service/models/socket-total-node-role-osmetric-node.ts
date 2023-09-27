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
 * Representation of information from telemetry about a the socket capacity by node role and OS.
 * @export
 * @interface SocketTotalNodeRoleOSMetricNode
 */
export interface SocketTotalNodeRoleOSMetricNode {
    /**
     * Representation of the node role for a cluster.
     * @type {Array<string>}
     * @memberof SocketTotalNodeRoleOSMetricNode
     */
    'node_roles'?: Array<string>;
    /**
     * The operating system.
     * @type {string}
     * @memberof SocketTotalNodeRoleOSMetricNode
     */
    'operating_system'?: string;
    /**
     * The total socket capacity of nodes with this set of roles and operating system.
     * @type {number}
     * @memberof SocketTotalNodeRoleOSMetricNode
     */
    'socket_total'?: number;
    /**
     * 
     * @type {string}
     * @memberof SocketTotalNodeRoleOSMetricNode
     */
    'time'?: string;
}

