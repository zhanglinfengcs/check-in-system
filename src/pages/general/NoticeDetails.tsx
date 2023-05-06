import React from "react";
import { useLocation } from "react-router-dom";
import Page from "../../components/Page";
import IButton from "../../components/IButton";
import { NoticeType } from "../../types";
import { FormatDateAndTime } from "../../lib/Format";

const NoticeDetails: React.FC = () => {
  const location = useLocation();
  const notice = location.state.notice as NoticeType;
  return (
    <Page title={`公告详情 - ${notice.title}`}>
      <IButton
        onClick={() => {
          window.history.back();
        }}
      >
        返回
      </IButton>
      <div>
        <span className="mt-6 text-sm text-gray-600 block">
          {`发布于: ${FormatDateAndTime(notice.createdTime)}`}
        </span>
        <span className="mt-2 text-sm text-gray-600 block">
          {`最后编辑于: ${FormatDateAndTime(notice.editTime)}`}
        </span>
        <p className="mt-8 w-4/5 font-medium text-lg">{notice.content}</p>
      </div>
    </Page>
  );
};

export default NoticeDetails;
