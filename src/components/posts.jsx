import { useState, useEffect } from "react";
import { deletePost, getPost } from "../api/PostApi";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { Form } from "./Form";

export const Posts = () => {
  const [data, setData] = useState([]);
  const [disableID, setDisableID] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [loading, setLoading] = useState(true);

  // get post data from api
  const getApiData = async () => {
    try {
      const res = await getPost();
      if (res.status === 200) {
        setData(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  //handle delete post
  const handleDelete = async (id) => {
    setDisableID(id);
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newPostData = data.filter((curr) => {
          return curr.id !== id;
        });
        setData(newPostData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setDisableID(null);
    }
  };

  //handle edit post
  const handleEdit = (currElem) => setUpdatedData(currElem);

  return (
    <Box>
      <Form
        data={data}
        setData={setData}
        updatedData={updatedData}
        setUpdatedData={setUpdatedData}
      />
      <Grid container spacing={4} maxWidth="lg" sx={{ margin: "0 auto", p: 3 }}>
        {loading
          ? Array.from(new Array(6)).map((_, index) => (
              <Grid item size={{ xs: 12, md: 4 }} key={index}>
                <Card
                  sx={{
                    p: 1,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent>
                    <Skeleton variant="text" width="60%" height={40} />
                    <Skeleton variant="text" width="90%" />
                    <Skeleton variant="text" width="80%" />
                  </CardContent>
                  <CardActions>
                    <Skeleton
                      variant="rectangular"
                      width={80}
                      height={36}
                      sx={{ mr: 1 }}
                    />
                    <Skeleton variant="rectangular" width={80} height={36} />
                  </CardActions>
                </Card>
              </Grid>
            ))
          : data.map((currElem) => {
              const { id, body, title } = currElem;
              return (
                <Grid key={id} size={{ xs: 12, md: 4 }}>
                  <Card
                    sx={{
                      p: 1,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {title}
                      </Typography>
                      <Typography variant="p" component="div">
                        {body}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        variant="contained"
                        onClick={() => handleEdit(currElem)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => handleDelete(id)}
                        disabled={disableID === id}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
      </Grid>
    </Box>
  );
};
