import { Box, List, ListItem, Paper, Stack, TextField, Typography } from "@mui/material";
import Page from "../../components/Page"
import { postList as initList} from "../../_mock";
import { PostType } from "../../types";
import { useState } from "react";
import IButton from "../../components/IButton";

const generalCSS = {
  borderBottom: "1px solid #ccc",
  ":hover": {
    backgroundColor: "#eee",
    transition: "all 0.3s ease",
  },
};
const selectedCSS = Object.assign({}, generalCSS, {
  backgroundColor: "#eee",
});

const PostsManage: React.FC = () => {
  const [postList, setPostList] = useState<PostType[]>(initList);
  const [selectedId, setSelectedId] = useState<string>(postList[0].postId);

  const selectedItem = postList.find((item) => item.postId === selectedId);

  const handleListItemClick = (id: string) => {
    setSelectedId(id);
  };
  return (
    <Page title="Posts Manage">
      <Paper elevation={2} sx={{ width: "100%", height: "500px" }}>
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "start",
            width: "100%",
            height: "100%",
          }}
        >
          <Stack
            sx={{
              width: "40%",
              height: "100%",
              flexDirection: "column",
              overflow: "auto",
            }}
          >
            <List
              sx={{
                width: "100%",
                bgcolor: "background.paper",
                p: 0,
              }}
            >
              {postList.map((item) => {
                return (
                  <ListItem
                    key={item.postId}
                    alignItems="flex-start"
                    sx={selectedId === item.postId ? selectedCSS : generalCSS}
                    onClick={() => handleListItemClick(item.postId)}
                  >
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        height: "100%",
                        gap: "5px",
                      }}
                    >
                      {item.title}
                      <div>
                        <Stack
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mt: 1,
                          }}
                        >
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {item.publisher}
                          </Typography>
                        </Stack>
                        {item.date}
                      </div>
                    </Stack>
                  </ListItem>
                );
              })}
            </List>
          </Stack>
          {
            selectedItem && (
            <Stack
              sx={{
                py: 2,
                px: 4,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                position: 'relative'
              }}
            >
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField id="outlined-basic" label="Title" variant="outlined" value={selectedItem.title}/>
              </Box>
              <Box
                component="form"
                sx={{
                  '& .MuiTextField-root': { m: 1, width: '100%' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-multiline-static"
                  label="Content"
                  multiline
                  rows={10}
                  value={selectedItem.content}
                />
              </Box>
              <IButton
                sx={{
                  m: 1,
                  position: 'absolute',
                  bottom: '10%',
                  right: '2%'
                }}
              >
                提交
              </IButton>
            </Stack>
          )}
        </Stack>
      </Paper>
    </Page>
  )
}

export default PostsManage