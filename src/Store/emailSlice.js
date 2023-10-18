import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  emails: [],
  status: "idle",
  error: null,
};

export const fetchEmails = createAsyncThunk("emails/fetchEmails", async () => {
  const response = await fetch(
    "https://mail-box-client-171d8-default-rtdb.firebaseio.com/email.json"
  );
  const data = await response.json();

  if (data) {
    const emailArray = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));

    return emailArray;
  } else {
    return [];
  }
});

export const fetchEmailsPeriodically = createAsyncThunk(
  "emails/fetchEmailsPeriodically",
  async (_, { dispatch }) => {
    setInterval(async () => {
      try {
        const response = await fetch(
          "https://mail-box-client-171d8-default-rtdb.firebaseio.com/email.json"
        );
        const data = await response.json();

        if (data) {
          const emailArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          dispatch(emailSlice.actions.fetchEmailsFulfilled(emailArray));
        } else {
          dispatch(emailSlice.actions.fetchEmailsFulfilled([]));
        }
      } catch (error) {
        dispatch(emailSlice.actions.fetchEmailsRejected(error.message));
      }
    }, 2000); // 2000 milliseconds (2 seconds)
  }
);

const emailSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {
    fetchEmailsFulfilled: (state, action) => {
      state.status = "succeeded";
      state.emails = action.payload;
    },
    fetchEmailsRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.emails = action.payload;
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllEmails = (state) => state.emails.emails;

export const { fetchEmailsFulfilled, fetchEmailsRejected } = emailSlice.actions;

export default emailSlice.reducer;
