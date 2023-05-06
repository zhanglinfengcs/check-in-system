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
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  selectedItem: NoticeType | undefined;
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

  const handleSelectedItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    if (type === "title") {
      const newList = noticeList.map((item) => {
        if (item.noticeId === selectedId) {
          item.title = e.target.value;
        }
        return item;
      })
      setNoticeList(newList);
    } else if (type === "content") {
      const newList = noticeList.map((item) => {
        if (item.noticeId === selectedId) {
          item.content = e.target.value;
        }
        return item;
      })
      setNoticeList(newList);
    }
  };
  const handleSubmit = () => {
    //TODO: update notice 
    const newList = noticeList.map((item) => {
      if (item.noticeId === selectedId) {
        item.title = selectedItem?.title as string;
        item.content = selectedItem?.content as string;
        item.editTime = Date.now().toString();
      }
      return item;
    });
    setNoticeList(newList);
  };

  const handleDelete = () => {
    //TODO: delete notice
    const newList = noticeList.filter((item) => item.noticeId !== selectedId);
    setNoticeList(newList);
    setSelectedId(newList[0]?.noticeId);
  }

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
        {selectedItem ? (
          <Stack
            sx={{
              py: 2,
              px: 4,
              width: "80%",
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
                value={selectedItem.title}
                onChange={(e) => handleSelectedItemChange(e, "title")}
              />
              <TextField
                id="outlined-multiline-static"
                label="内容"
                multiline
                rows={10}
                value={selectedItem.content}
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
                  {"创建于: " + FormatDateAndTime(selectedItem.createdTime)}
                </Typography>
                <Typography variant="subtitle2">
                  {"最近一次编辑于: " +
                    FormatDateToRecent(selectedItem.editTime) +
                    "以前"}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  m: 1,
                  position: "absolute",
                  bottom: "10%",
                  right: "2%",
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2
                }}
              >
                <IButton
                  onClick={handleSubmit}
                >
                  提交
                </IButton>
                <IButton
                  onClick={handleDelete}
                >
                  删除
                </IButton>
              </Stack>
            </Box>
          </Stack>
        )
        : (
          <div className="text-center font-medium text-2xl mt-4">
            无记录
          </div>
        )
      }
      </Stack>
    </Paper>
  );
};

export default NoticeManagePanel;
