/* tslint:disable */
/* eslint-disable */
/**
 * Account Management Service API
 * Manage user subscriptions and clusters
 *
 * The version of the OpenAPI document: 0.0.1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 *
 * @export
 * @interface ResourceReviewRequest
 */
export interface ResourceReviewRequest {
  /**
   *
   * @type {string}
   * @memberof ResourceReviewRequest
   */
  account_username?: string;
  /**
   *
   * @type {string}
   * @memberof ResourceReviewRequest
   */
  action?: ResourceReviewRequestActionEnum;
  /**
   *
   * @type {string}
   * @memberof ResourceReviewRequest
   */
  resource_type?: ResourceReviewRequestResourceTypeEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum ResourceReviewRequestActionEnum {
  Get = 'get',
  Delete = 'delete',
  Update = 'update',
}
/**
 * @export
 * @enum {string}
 */
export enum ResourceReviewRequestResourceTypeEnum {
  Cluster = 'Cluster',
  Subscription = 'Subscription',
}
