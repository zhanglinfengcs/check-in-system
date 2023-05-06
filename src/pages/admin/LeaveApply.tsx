import { List, ListItem, Paper, Stack, Typography } from "@mui/material";
import Page from "../../components/Page";
import * as React from "react";
import { leaveApplyList as initList } from "../../_mock";
import IButton from "../../components/IButton";
import LeaveApplyResultChip from "../../components/LeaveApplyResultChip";
import { LeaveApplyType, LeaveApplyResult } from "../../types";
import { FormatDate } from "../../lib/Format";
import { generalCSS, selectedCSS } from "../../styles";

const LeaveApply: React.FC = () => {
  const [leaveApplyList, setLeaveApplyList] =
    React.useState<LeaveApplyType[]>([]);
  const [selectedId, setSelectedId] = React.useState<string>("");

  React.useEffect(() => {
    //TODO: get leave apply list
    setLeaveApplyList(initList);
    setSelectedId(initList[0].leaveId);
  }, [])
  
  const selectedItem = leaveApplyList.find(
    (item) => item.leaveId === selectedId
  );

  const handleListItemClick = (id: string) => {
    setSelectedId(id);
  };

  const handleApprove = (id: string) => {
    //TODO: send approve request
    const newList = leaveApplyList.map((item) => {
      if (item.leaveId === id) {
        item.result = LeaveApplyResult.Approved;
      }
      return item;
    });
    setLeaveApplyList(newList);
  };

  const handleReject = (id: string) => {
    //TODO: send reject request
    const newList = leaveApplyList.map((item) => {
      if (item.leaveId === id) {
        item.result = LeaveApplyResult.Rejected;
      }
      return item;
    });
    setLeaveApplyList(newList);
  };

  return (
    <Page title="请假申请">
      <Paper elevation={2} sx={{ width: "100%", height: "600px", borderRadius: '8px', overflow: 'hidden'}}>
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
              {leaveApplyList?.map((item) => {
                return (
                  <div className="p-1 mr-1" key={item.leaveId}>
                    <ListItem
                      alignItems="flex-start"
                      sx={
                        selectedId === item.leaveId ? selectedCSS : generalCSS
                      }
                      onClick={() => handleListItemClick(item.leaveId)}
                    >
                      <Stack
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          height: "100%",
                          gap: "10px",
                        }}
                      >
                        <p className="text-lg font-medium text-gray-900 leading-80">
                          {item.title}
                        </p>
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
                              variant="subtitle1"
                              color="text.secondary"
                            >
                              {item.name}
                            </Typography>
                            <LeaveApplyResultChip result={item.result} />
                          </Stack>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="subtitle1"
                              color="text.secondary"
                            >
                              {FormatDate(item.date)}
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
              }}
            >
              <div
                id="title"
                className="font-bold text-gray-900 tracking-wider text-3xl text-center"
              >
                {selectedItem.title}
              </div>
              <div
                id="name"
                className="flex flex-row justify-start items-center mt-16"
              >
                <span className="font-medium text-gray-900 text-lg mr-2">
                  姓名:
                </span>
                {selectedItem.name}
                <span className="font-normal text-gray-700 text-sm ml-2">
                  @{selectedItem.userId}
                </span>
              </div>
              <div
                id="date"
                className="flex flex-row justify-start items-center mt-2"
              >
                <span className="font-medium text-gray-900 text-lg mr-2">
                  日期:
                </span>
                <div className="font-normal text-gray-900 text-sm mr-5">
                  {FormatDate(selectedItem.date)}
                </div>
                <LeaveApplyResultChip result={selectedItem.result} />
              </div>

              <div
                id="content"
                className="font-normal text-gray-900 mt-10 tracking-wide leading-8"
              >
                <span className="font-medium text-gray-900 text-lg mr-2">
                  理由:
                </span>
                {selectedItem.content}
              </div>
              <div
                id="button-group"
                className="flex flex-row justify-end items-center gap-4 mt-8"
              >
                <IButton onClick={() => handleApprove(selectedItem.leaveId)}>
                  同意
                </IButton>
                <IButton onClick={() => handleReject(selectedItem.leaveId)}>
                  拒绝
                </IButton>
              </div>
            </Stack>
          )}
        </Stack>
      </Paper>
    </Page>
  );
};

export default LeaveApply;
