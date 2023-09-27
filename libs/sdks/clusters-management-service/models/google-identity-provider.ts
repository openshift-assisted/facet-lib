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
 * Details for `google` identity providers.
 * @export
 * @interface GoogleIdentityProvider
 */
export interface GoogleIdentityProvider {
    /**
     * Client identifier of a registered _Google_ project.
     * @type {string}
     * @memberof GoogleIdentityProvider
     */
    'client_id'?: string;
    /**
     * Client secret issued by _Google_.
     * @type {string}
     * @memberof GoogleIdentityProvider
     */
    'client_secret'?: string;
    /**
     * Optional hosted domain to restrict sign-in accounts to.
     * @type {string}
     * @memberof GoogleIdentityProvider
     */
    'hosted_domain'?: string;
}

