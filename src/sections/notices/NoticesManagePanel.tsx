import * as React from "react";
import {
  Box,
  List,
  ListItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import IButton from "../../components/IButton";
import { FormatDateAndTime, FormatDateToRecent } from "../../lib/Format";
import { NoticeType } from "../../types";
import { generalCSS, selectedCSS } from "../../styles";

interface NoticeManagePanelProps {
  noticeList: NoticeType[];
  setNoticeList: React.Dispatch<React.SetStateAction<NoticeType[]>>;
  selectedId: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
  selectedItem: NoticeType | null;
}

const NoticeManagePanel: React.FC<NoticeManagePanelProps> = ({
  noticeList,
  setNoticeList,
  selectedId,
  setSelectedId,
  selectedItem,
}) => {

  const handleListItemClick = (id: string) => {
    setSelectedId(id);
  };

  const [currentNotice, setCurrentNotice] = React.useState<NoticeType | null>(selectedItem);

  React.useEffect(() => {
    setCurrentNotice(selectedItem);

    return () => {
      setCurrentNotice(null);
    }
  }, [selectedItem])

  const handleSelectedItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    if (type === "title") {
      setCurrentNotice({...currentNotice, title: e.target.value} as NoticeType)
    } else if (type === "content") { 
      setCurrentNotice({...currentNotice, content: e.target.value} as NoticeType)
    }
  };

  const handleSubmit = () => {
    if (currentNotice === null) return

    const formData = new FormData();
    formData.append('noticeId', currentNotice.noticeId as string)
    formData.append('title', currentNotice.title as string)
    formData.append('content', currentNotice.content as string)
    formData.append('editTime', Date.now().toString())

    async function updateNotice() {
      const response = await fetch("http://127.0.0.1:8000/notice", {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })
      const data = await response.json()
      console.log('update notice data', data)
      if (data.status === 200) {
        const newList = noticeList.map((item) => {
          if (item.noticeId === selectedId) {
            item.title = currentNotice?.title as string;
            item.content = currentNotice?.content as string;
            item.editTime = Date.now().toString();
          }
          return item;
        });
        setNoticeList(newList);
        setCurrentNotice({...currentNotice, editTime: Date.now().toString()} as NoticeType)
      } else {
        console.log('update notice failed')
      }
    }

    updateNotice()
  };

  const handleDelete = () => {
    if (selectedId === null) return

    const formData = new FormData();
    formData.append('noticeId', selectedId)

    async function deleteNotice() {
      const response = await fetch("http://127.0.0.1:8000/notice", {
        method: "DELETE",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      })

      const data = await response.json()
      console.log('delete notice data', data)
      if (data.status === 200) {
        const newList = noticeList.filter((item) => item.noticeId !== selectedId);
        setNoticeList(newList);
        let nextSelectedId = null
        if (newList.length > 0)
          nextSelectedId = newList[0].noticeId
        setSelectedId(nextSelectedId)
      } else {
        console.log('delete notice failed')
      }
    }

    deleteNotice()
  };

  return (
    <Paper
      elevation={2}
      sx={{
        width: "100%",
        height: "600px",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      {noticeList.length > 0 ? (
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
                      sx={
                        selectedId === item.noticeId ? selectedCSS : generalCSS
                      }
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
                        <p className="text-lg font-medium text-gray-900 leading-80">
                          {item.title}
                        </p>
                        <div>
                          <Stack
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "start",
                              mt: 1,
                              gap: "2px",
                            }}
                          >
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="subtitle2"
                              color="text.primary"
                            >
                              {"创建于: " + FormatDateAndTime(item.createdTime)}
                            </Typography>
                            <Typography variant="subtitle2">
                              {"最近一次编辑于: " +
                                FormatDateToRecent(item.editTime) +
                                "以前"}
                            </Typography>
                          </Stack>
                        </div>
                      </Stack>
                    </ListItem>
                  </div>
                );
              })}
            </List>
          </Stack>
          {currentNotice && (
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
                  label="标题"
                  variant="outlined"
                  value={currentNotice?.title}
                  onChange={(e) => handleSelectedItemChange(e, "title")}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="内容"
                  multiline
                  rows={10}
                  value={currentNotice?.content}
                  onChange={(e) => handleSelectedItemChange(e, "content")}
                />
                <Stack
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "start",
                    mt: 1,
                    ml: 1,
                    gap: "2px",
                  }}
                >
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="subtitle2"
                    color="text.primary"
                  >
                    {"创建于: " + FormatDateAndTime(currentNotice.createdTime)}
                  </Typography>
                  <Typography variant="subtitle2">
                    {"最近一次编辑于: " +
                      FormatDateToRecent(currentNotice.editTime) +
                      "以前"}
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    m: 1,
                    position: "absolute",
                    bottom: "10%",
                    right: "2%",
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                  }}
                >
                  <IButton onClick={handleSubmit}>提交</IButton>
                  <IButton onClick={handleDelete}>删除</IButton>
                </Stack>
              </Box>
            </Stack>
          )}
        </Stack>
      ) : (
        <div className="text-center font-medium text-2xl mt-4">
          {noticeList.length > 0 ? "请点击左侧列表中的公告" : "暂无公告"}
        </div>
      )}
    </Paper>
  );
};

export default NoticeManagePanel;
