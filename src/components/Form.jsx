import { Alert, Box, Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { addPost, updatePost } from "../api/PostApi";
import { useEffect } from "react";

export const Form = ({ data, setData, updatedData, setUpdatedData }) => {
  const [inputData, setInputData] = useState({
    title: "",
    body: "",
  });
  const [alert, setAlert] = useState(false);

  let isEmpty = Object.keys(updatedData).length === 0;

  //setting data which needs to be updated to input fields
  useEffect(() => {
    updatedData &&
      setInputData({
        title: updatedData.title || "",
        body: updatedData.body || "",
      });
  }, [updatedData]);

  //handle change of input fields
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  //add post data
  const addPostData = async () => {
    const res = await addPost(inputData);
    try {
      if (res.status === 201) {
        setData([...data, res.data]);
        setInputData({ title: "", body: "" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setAlert(true);
    }
  };

  //Update post data
  const updatePostData = async () => {
    const res = await updatePost(updatedData.id, inputData);

    try {
      if (res.status === 200) {
        setData((prev) => {
          return prev.map((curr) => {
            return curr.id === res.data.id ? res.data : curr;
          });
        });
        setInputData({ title: "", body: "" });
        setUpdatedData({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    let formType = e.nativeEvent.submitter.name;

    if (formType === "Add") addPostData();
    else if (formType === "Edit") updatePostData();
  };

  return (
    <Box
      component="form"
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 2,
        p: 3,
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" textAlign="center">
        Post Form
      </Typography>

      <TextField
        label="Title"
        name="title"
        required
        fullWidth
        value={inputData.title}
        onChange={handleChange}
      />

      <TextField
        label="Body"
        name="body"
        required
        fullWidth
        value={inputData.body}
        onChange={handleChange}
      />

      <Button
        type="submit"
        name={isEmpty ? "Add" : "Edit"}
        variant="contained"
        fullWidth
      >
        {isEmpty ? "Add" : "Edit"}
      </Button>

      {alert && (
        <Alert severity="success">New post data successfully added.</Alert>
      )}
    </Box>
  );
};
