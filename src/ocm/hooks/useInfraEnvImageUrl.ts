import React from 'react';
import { Cluster, CpuArchitecture, PresignedUrl } from '../../common';
import { InfraEnvsAPI } from '../services/apis';
import { getErrorMessage } from '../../common/utils';
import { InfraEnvsService } from '../services';

type ImgUrl = {
  url: PresignedUrl['url'];
  error: string;
};

export default function useInfraEnvImageUrl() {
  const getIsoImageUrl = React.useCallback(
    async (clusterId: Cluster['id'], cpuArchitecture: CpuArchitecture): Promise<ImgUrl> => {
      try {
        const infraEnvId = await InfraEnvsService.getInfraEnvId(clusterId, cpuArchitecture);
        if (!infraEnvId) {
          return { url: '', error: `Failed to retrieve the infraEnv for ${clusterId}` };
        }

        const {
          data: { url },
        } = await InfraEnvsAPI.getImageUrl(infraEnvId);
        if (!url) {
          throw 'Failed to retrieve the image URL, the API returned an invalid URL';
        }
        return { url, error: '' };
      } catch (e) {
        return { url: '', error: getErrorMessage(e) };
      }
    },
    [],
  );

  return { getIsoImageUrl };
}
