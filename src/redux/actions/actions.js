export const setJobsRequest = () => ({
  type: "SET_JOBS_REQUEST",
});

export const setJobsSuccess = (jobs) => ({
  type: "SET_JOBS_SUCCESS",
  payload: jobs,
});

export const setJobsFailure = (error) => ({
  type: "SET_JOBS_FAILURE",
  payload: error,
});

export const addToFavorites = (jobData) => ({
  type: "ADD_TO_FAVORITES",
  payload: jobData,
});

export const removeFromFavorites = (jobId) => ({
  type: "REMOVE_FROM_FAVORITES",
  payload: jobId,
});
