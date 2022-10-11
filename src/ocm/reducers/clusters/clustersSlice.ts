import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Cluster, ResourceUIState } from '../../../common';
import { ClustersAPI } from '../../services/apis';
import { handleApiError, ocmClient } from '../../api';

export const fetchClustersAsync = createAsyncThunk<Cluster[] | void>(
  'clusters/fetchClustersAsync',
  async () => {
    try {
      const { data } = await ClustersAPI.list();
      const isOcm = !!ocmClient;
      return data.filter((cluster) => (isOcm ? cluster.kind === 'Cluster' : true));
    } catch (e) {
      handleApiError(e, () => {
        void Promise.reject('Failed to fetch clusters.');
      });
      // handleApiError(e, () => {
      //   throw new Error('Failed to fetch clusters.');
      // });
    }
  },
);

type ClustersStateSlice = {
  data: Cluster[];
  uiState: ResourceUIState;
};

const initialState: ClustersStateSlice = { data: [], uiState: ResourceUIState.LOADING };

export const clustersSlice = createSlice({
  initialState,
  name: 'clusters',
  reducers: {
    deleteCluster: (state, action: PayloadAction<Cluster['id']>) => ({
      ...state,
      data: state.data.filter((item: Cluster) => item.id !== action.payload),
    }),
  },
  extraReducers: (builder) => {
    const { LOADED, LOADING, RELOADING, ERROR } = ResourceUIState;
    builder
      .addCase(fetchClustersAsync.pending, (state) => {
        const uiState = state.uiState === LOADED ? RELOADING : LOADING;
        return { ...state, uiState };
      })
      .addCase(fetchClustersAsync.fulfilled, (state, action) => ({
        ...state,
        data: [...(action.payload as Cluster[])],
        uiState: LOADED,
      }))
      .addCase(fetchClustersAsync.rejected, (state) => ({
        ...state,
        uiState: ERROR,
      }));
  },
});

export const { deleteCluster } = clustersSlice.actions;
export default clustersSlice.reducer;
