import moment from "moment";
import { AdsSpendObject } from "../AdsSpendGraph";

export enum AggregationDate {
  year,
  month,
  day,
}
const DATES: {
  [AggregationDate.year]: string;
  [AggregationDate.month]: string;
  [AggregationDate.day]: string;
} = {
  [AggregationDate.year]: "YYYY",
  [AggregationDate.month]: "YYYY-MM",
  [AggregationDate.day]: "YYYY-MM-DD",
};

type GroupedByDateData = { [key: string]: AdsSpendObject[] };

export const groupDataByChannel = (
  dataSet: AdsSpendObject[],
  channel: string
) => {
  return dataSet.filter((data: AdsSpendObject) => data.channel === channel);
};

export const groupDataByDate = (
  data: AdsSpendObject[],
  aggregationDate: AggregationDate
): GroupedByDateData => {
  const formatDate = DATES[aggregationDate];

  return data.reduce((acc: GroupedByDateData, curr): GroupedByDateData => {
    const date = moment(curr.date_day.value).format(formatDate);

    return {
      ...acc,
      [date]: acc[date] ? [...acc[date], curr] : [curr],
    };
  }, {});
};

export const aggregateData = (
  dataGroupedByDate: GroupedByDateData
): number[] => {
  const aggregatedData: number[] = [];

  for (const date in dataGroupedByDate) {
    const recordsPerDate = dataGroupedByDate[date];

    const totalUsd = recordsPerDate.reduce(
      (acc: number, curr: AdsSpendObject) => (acc += curr.ad_spend_usd),
      0
    );
    aggregatedData.push(totalUsd);
  }

  return aggregatedData;
};
