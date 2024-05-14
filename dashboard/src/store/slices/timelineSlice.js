import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    loading: false,
    timeline: [],
    error: null,
    message: null,
  },
  reducers: {
    getAllTimelineRequest(state, action) {
      state.timeline = [];
      state.error = null;
      state.loading = true;
    },
    getAllTimelineSuccess(state, action) {
      state.timeline = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllTimelineFailed(state, action) {
      state.timeline = state.timeline;
      state.error = action.payload;
      state.loading = false;
    },
    addNewTimelineRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewTimelineSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    addNewTimelineFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    deleteTimelineRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteTimelineSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deleteTimelineFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    resetTimelineSlice(state, action) {
      state.error = null;
      state.timeline = state.timeline;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state = state.timeline;
    },
  },
});

export const getAllTimeline = () => async (dispatch) => {
  dispatch(timelineSlice.actions.getAllTimelineRequest());
  try {
    const response = await axios.get(
      "https://mern-stack-portfolio-backend-code.onrender.com/api/v1/timeline/getall",
      { withCredentials: true }
    );
    dispatch(
      timelineSlice.actions.getAllTimelineSuccess(response.data.timelines)
    );
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.getAllTimelineFailed(error.response.data.message)
    );
  }
};

export const addNewTimeline = (data) => async (dispatch) => {
  dispatch(timelineSlice.actions.addNewTimelineRequest());
  try {
    const response = await axios.post(
      "https://mern-stack-portfolio-backend-code.onrender.com/api/v1/timeline/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(
      timelineSlice.actions.addNewTimelineSuccess(response.data.message)
    );
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.addNewTimelineFailed(error.response.data.message)
    );
  }
};
export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(timelineSlice.actions.deleteTimelineRequest());
  try {
    const response = await axios.delete(
      `https://mern-stack-portfolio-backend-code.onrender.com/api/v1/timeline/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      timelineSlice.actions.deleteTimelineSuccess(response.data.message)
    );
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.deleteTimelineFailed(error.response.data.message)
    );
  }
};

export const resetTimelineSlice = () => (dispatch) => {
  dispatch(timelineSlice.actions.resetTimelineSlice());
};

export const clearAllTimelineErrors = () => (dispatch) => {
  dispatch(timelineSlice.actions.clearAllErrors());
};

export default timelineSlice.reducer;
