import { List, ListItem, Paper, Stack, Typography } from "@mui/material";
import Page from "../../components/Page";
import React, { useState } from "react";
import { leaveApplyList as initList } from "../../_mock";
import IButton from "../../components/IButton";
import LeaveApplyResultChip from "../../components/LeaveApplyResultChip";
import { LeaveApplyType, LeaveResult } from "../../types";

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

const Apply: React.FC = () => {
  const [leaveApplyList, setLeaveApplyList] =
    useState<LeaveApplyType[]>(initList);
  const [selectedId, setSelectedId] = useState<string>(
    leaveApplyList[0].applyId
  );
  const selectedItem = leaveApplyList.find(
    (item) => item.applyId === selectedId
  );

  const handleListItemClick = (id: string) => {
    setSelectedId(id);
  };

  const handleApprove = (id: string) => {
    const newList = leaveApplyList.map((item) => {
      if (item.applyId === id) {
        item.result = LeaveResult.Approved;
      }
      return item;
    });
    setLeaveApplyList(newList);
  };

  const handleReject = (id: string) => {
    const newList = leaveApplyList.map((item) => {
      if (item.applyId === id) {
        item.result = LeaveResult.Rejected;
      }
      return item;
    });
    setLeaveApplyList(newList);
  };

  return (
    <Page title="Apply">
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
              {leaveApplyList?.map((item) => {
                return (
                  <ListItem
                    key={item.applyId}
                    alignItems="flex-start"
                    sx={selectedId === item.applyId ? selectedCSS : generalCSS}
                    onClick={() => handleListItemClick(item.applyId)}
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
                            {item.name}
                          </Typography>
                          <LeaveApplyResultChip result={item.result} />
                        </Stack>
                        {item.date}
                      </div>
                    </Stack>
                  </ListItem>
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
                  Name:
                </span>
                {selectedItem.name}
                <span className="font-normal text-gray-700 text-sm ml-2">
                  {selectedItem.userId}
                </span>
              </div>
              <div
                id="date"
                className="flex flex-row justify-start items-center mt-2"
              >
                <span className="font-medium text-gray-900 text-lg mr-2">
                  Date:
                </span>
                <div className="font-normal text-gray-900 text-sm mr-5">
                  {selectedItem.date}
                </div>
                <LeaveApplyResultChip result={selectedItem.result} />
              </div>

              <div id="content" className="font-normal text-gray-900 mt-10">
                <span className="font-medium text-gray-900 text-lg mr-2">
                  Content:
                </span>
                {selectedItem.content}
              </div>
              <div
                id="button-group"
                className="flex flex-row justify-end items-center gap-4 mt-6"
              >
                <IButton onClick={() => handleApprove(selectedItem.applyId)}>
                  同意
                </IButton>
                <IButton onClick={() => handleReject(selectedItem.applyId)}>
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

export default Apply;
