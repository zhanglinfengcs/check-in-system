import { Box, Paper, Stack, TextField } from "@mui/material"
import IButton from "../../components/IButton"
import { NoticeType } from "../../types";

interface NoticeFormProps {
  noticeList: NoticeType[];
  setNoticeList: React.Dispatch<React.SetStateAction<NoticeType[]>>;
  toggleAddButton: () => void;
}

const NoticeForm: React.FC<NoticeFormProps> = ( { noticeList, setNoticeList, toggleAddButton } ) => {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formDate = new FormData(event.currentTarget)
    console.log(formDate.get('title'))
    console.log(formDate.get('content'))
    setNoticeList([{
      noticeId: Date.now().toString(),
      title: formDate.get('title') as string,
      content: formDate.get('content') as string,
      createdTime: Date.now().toString(),
      editTime: Date.now().toString(), 
    }, ...noticeList])
    toggleAddButton()
  }

  return (
    <Paper
      sx={{
        width: '100%',
      }}
    >
      <Box
        component='form'
        onSubmit={handleSubmit}
      >
        <Stack
          sx={{
            direction: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            p: 2
          }}
        >
          <p className="text-2xl font-medium text-center tracking-wider leading-relaxed">添加公告</p>
          <p className="text-xl text-left mt-5">标题</p> 
          <TextField
            required
            id="outlined-required"
            name="title"
            label="必填"
            sx={{
              width: '100%',
              mt: 1
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
              width: '100%',
              mt: 1
            }}
          />
          <IButton
            type="submit"
            sx={{
              mt: 3
            }}
          >
            发布
          </IButton>
        </Stack>
      </Box>
    </Paper>
  )
}

export default NoticeForm