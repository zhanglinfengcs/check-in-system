import { LeaveType} from "../../types";
import {Card, CardContent, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";


function LeaveHistoryItem( props: LeaveType ) {
  return (
     <Card sx={{ minWidth: 275, width: '100%' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {/* be{bull}nev{bull}o{bull}lent */}
          {props.title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {/* adjective */}
          {props.date}
        </Typography>
        <Typography variant="body1">
          {/* well meaning and kindly. {'"a benevolent smile"'} */}
          {props.result}
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  )
}

function LeaveHistory({props}: {props: LeaveType[]}) {
  return (
     <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        width: "80%",
        gap: 3,
        mb: 3
      }}
     >
      {
        props.map((item, index) => {
          return (<LeaveHistoryItem {...item} key={index}/>)
        })
      }
     </Stack>
  )
}

export default LeaveHistory