import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import zhCN from "dayjs/locale/zh-cn";
dayjs.locale(zhCN)
dayjs.extend(relativeTime)

export const FormatDate = (date: string) => {
  return dayjs(Number(date)).format("YYYY-MM-DD");
}

export const FormatDateAndTime = (date: string) => {
  return dayjs(Number(date)).format("YYYY-MM-DD HH:mm:ss");
}

export const FormatDateToRecent = (date: string) => {
  return dayjs(Number(date)).fromNow(true);
}