import { formatDate } from "./helpers/formatHelper";
import {
  groupDataByChannel,
  groupDataByDate,
  aggregateData,
  AggregationDate,
} from "./helpers/index";
import { useEffect, useState } from "react";

import BarChart from "./components/BarChart";
import request from "request";

export type AdsSpendObject = {
  date_day: { value: string };
  channel: string;
  ad_spend_usd: number;
};

const AdsSpendGraph = () => {
  const [response, setResponse] = useState<AdsSpendObject[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchAdsSpendData() {
      const options = {
        url: "http://localhost:5001/ads-spend-data",
        headers: { "Content-Type": "application/json" },
      };

      if (!response.length) {
        setLoading(true);
      }

      request(options, (error, response, body) => {
        if (error) {
          console.error("Failed to fetch data, error: ", error);
          setLoading(false);
        } else {
          setResponse(JSON.parse(body));
          setLoading(false);
        }
      });
    }

    fetchAdsSpendData();
  }, [response]);

  const convertData = (data: AdsSpendObject[], date: AggregationDate) => {
    if (!data.length) return null;

    const facebookData = groupDataByChannel(data, "facebook");
    const adwordsData = groupDataByChannel(data, "adwords");

    const facebookGroupedByDate = groupDataByDate(facebookData, date);
    const adwordsGroupedByDate = groupDataByDate(adwordsData, date);
    const labels = groupDataByDate(response, AggregationDate.month);

    const aggregatedDataFacebook = {
      label: "Facebook",
      data: aggregateData(facebookGroupedByDate),
    };
    const aggregatedDataAdwords = {
      label: "Adwords",
      data: aggregateData(adwordsGroupedByDate),
    };

    return {
      labels: Object.keys(labels).map((label) => formatDate(label)),
      dataSets: [aggregatedDataFacebook, aggregatedDataAdwords],
    };
  };

  const data = loading
    ? "loading"
    : convertData(response, AggregationDate.month) ?? null;

  return (
    <div>
      <BarChart chartData={data} />
    </div>
  );
};

export default AdsSpendGraph;
