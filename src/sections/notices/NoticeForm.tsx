import { Box, Paper, Stack, TextField } from "@mui/material";
import IButton from "../../components/IButton";
import { NoticeType } from "../../types";
import { faker } from "@faker-js/faker";

interface NoticeFormProps {
  noticeList: NoticeType[];
  setNoticeList: React.Dispatch<React.SetStateAction<NoticeType[]>>;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>
  toggleAddButton: () => void;
}

const NoticeForm: React.FC<NoticeFormProps> = ({
  noticeList,
  setNoticeList,
  toggleAddButton,
  setSelectedId
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextNoticeId = faker.datatype.uuid()
    const formData = new FormData();
    formData.append("noticeId", nextNoticeId);
    formData.append("title", form.get("title") as string);
    formData.append("content", form.get("content") as string);
    formData.append("createdTime", Date.now().toString());
    formData.append("editTime", Date.now().toString());

    async function addNotice() {
      const response = await fetch('http://127.0.0.1:8000/notice', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        body: formData
      })

      const data = await response.json()
      console.log('add notice data', data)
      if (data.status === 200) {
        setNoticeList([
          {
            noticeId: nextNoticeId,
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            createdTime: Date.now().toString(),
            editTime: Date.now().toString(),
          },
          ...noticeList,
        ]);
        setSelectedId(nextNoticeId)
        toggleAddButton();
      } else {
        console.log('add notice failed')
      }
    }


    addNotice()
  };

  return (
    <Paper
      sx={{
        width: "100%",
      }}
    >
      <Box component="form" onSubmit={handleSubmit}>
        <Stack
          sx={{
            direction: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            p: 2,
          }}
        >
          <p className="text-2xl font-medium text-center tracking-wider leading-relaxed">
            添加公告
          </p>
          <p className="text-xl text-left mt-5">标题</p>
          <TextField
            required
            id="outlined-required"
            name="title"
            label="必填"
            sx={{
              width: "100%",
              mt: 1,
            }}
          />
          <p className="text-xl text-left mt-5">内容</p>
          <TextField
            required
            multiline
            name="content"
            id="outlined-required"
            label="必填"
            rows={4}
            sx={{
              width: "100%",
              mt: 1,
            }}
          />
          <IButton
            type="submit"
            sx={{
              mt: 3,
            }}
          >
            发布
          </IButton>
        </Stack>
      </Box>
    </Paper>
  );
};

export default NoticeForm;
