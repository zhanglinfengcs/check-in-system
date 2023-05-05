import { Box } from "@mui/material"

const NoticeForm: React.FC = () => {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <Box
      component='form'
      onSubmit={handleSubmit}
    >
      NoticeForm
    </Box>
  )
}

export default NoticeForm