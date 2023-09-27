/* tslint:disable */
/* eslint-disable */
/**
 * Authorization Service API
 * Enables access control on resources of OCM services
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
 * @interface ResourceReview
 */
export interface ResourceReview {
  /**
   *
   * @type {string}
   * @memberof ResourceReview
   */
  account_username: string;
  /**
   *
   * @type {string}
   * @memberof ResourceReview
   */
  action: ResourceReviewActionEnum;
  /**
   *
   * @type {Array<string>}
   * @memberof ResourceReview
   */
  cluster_ids: Array<string>;
  /**
   *
   * @type {Array<string>}
   * @memberof ResourceReview
   */
  cluster_uuids: Array<string>;
  /**
   *
   * @type {Array<string>}
   * @memberof ResourceReview
   */
  organization_ids: Array<string>;
  /**
   *
   * @type {string}
   * @memberof ResourceReview
   */
  resource_type: ResourceReviewResourceTypeEnum;
  /**
   *
   * @type {Array<string>}
   * @memberof ResourceReview
   */
  subscription_ids: Array<string>;
}

/**
 * @export
 * @enum {string}
 */
export enum ResourceReviewActionEnum {
  Get = 'get',
  List = 'list',
  Create = 'create',
  Delete = 'delete',
  Update = 'update',
}
/**
 * @export
 * @enum {string}
 */
export enum ResourceReviewResourceTypeEnum {
  Cluster = 'Cluster',
  Subscription = 'Subscription',
}
