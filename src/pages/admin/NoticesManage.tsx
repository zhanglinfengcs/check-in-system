import {
  Box,
  List,
  ListItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Page from "../../components/Page";
import { postList as initList } from "../../_mock";
import { NoticeType } from "../../types";
import { useState } from "react";
import IButton from "../../components/IButton";
import { FormatDateAndTime, FormatDateToRecent } from "../../lib/Format";

const generalCSS = {
  borderRadius: "10px",
  ":hover": {
    backgroundColor: "#ede9fe",
    transition: "all 0.3s ease",
  },
};
const selectedCSS = Object.assign({}, generalCSS, {
  backgroundColor: "#ede9fe",
});

const NoticesManage: React.FC = () => {
  const [noticeList, setNoticeList] = useState<NoticeType[]>(initList);
  const [selectedId, setSelectedId] = useState<string>(noticeList[0].noticeId);

  const selectedItem = noticeList.find((item) => item.noticeId === selectedId);

  const handleListItemClick = (id: string) => {
    setSelectedId(id);
  };
  return (
    <Page title="Notices Manage">
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
              {noticeList.map((item) => {
                return (
                  <div className="p-2 mr-1" key={item.noticeId}>
                    <ListItem
                      alignItems="flex-start"
                      sx={selectedId === item.noticeId ? selectedCSS : generalCSS}
                      onClick={() => handleListItemClick(item.noticeId)}
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
                              variant="subtitle2"
                              color="text.primary"
                            >
                              {'创建于: ' + FormatDateAndTime(item.createdTime)}
                            </Typography>
                          </Stack>
                          <Typography
                            variant="subtitle2"
                          >
                            {'最近一次编辑于: ' + FormatDateToRecent(item.editTime) + '以前'}
                          </Typography>
                        </div>
                      </Stack>
                    </ListItem>
                  </div>
                );
              })}
            </List>
          </Stack>
          {selectedItem && (
            <Stack
              sx={{
                py: 2,
                px: 4,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                position: "relative",
              }}
            >
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "100%" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  value={selectedItem.title}
                />
              </Box>
              <Box
                component="form"
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "100%" },
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
                  position: "absolute",
                  bottom: "10%",
                  right: "2%",
                }}
              >
                提交
              </IButton>
            </Stack>
          )}
        </Stack>
      </Paper>
    </Page>
  );
};

export default NoticesManage;
