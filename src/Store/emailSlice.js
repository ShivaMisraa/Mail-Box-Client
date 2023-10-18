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

const emailSlice = createSlice({
  name: "emails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.emails = action.payload.map((email) => ({
          ...email
        }));
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllEmails = (state) => state.emails.emails;

export default emailSlice.reducer;
