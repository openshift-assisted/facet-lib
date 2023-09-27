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
 * Representation of a autoscaling in a node pool.
 * @export
 * @interface NodePoolAutoscaling
 */
export interface NodePoolAutoscaling {
    /**
     * Indicates the type of this object. Will be \'NodePoolAutoscaling\' if this is a complete object or \'NodePoolAutoscalingLink\' if it is just a link.
     * @type {string}
     * @memberof NodePoolAutoscaling
     */
    'kind'?: string;
    /**
     * Unique identifier of the object.
     * @type {string}
     * @memberof NodePoolAutoscaling
     */
    'id'?: string;
    /**
     * Self link.
     * @type {string}
     * @memberof NodePoolAutoscaling
     */
    'href'?: string;
    /**
     * The maximum number of replicas for the node pool.
     * @type {number}
     * @memberof NodePoolAutoscaling
     */
    'max_replica'?: number;
    /**
     * The minimum number of replicas for the node pool.
     * @type {number}
     * @memberof NodePoolAutoscaling
     */
    'min_replica'?: number;
}

