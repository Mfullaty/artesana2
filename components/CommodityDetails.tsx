'use client'

import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, TrendingDownIcon } from "lucide-react";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { DateRange } from "react-day-picker";
import { addMonths, subMonths } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PriceData {
  date: string;
  value: string;
}

interface CommodityData {
  name: string;
  unit: string;
  interval: string;
  data: PriceData[];
}

const CommodityDetails = ({ resource, resourceName }: { resource: string; resourceName: string }) => {
  const [commodityData, setCommodityData] = useState<CommodityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 12),
    to: new Date(),
  });

  useEffect(() => {
    const fetchCommodityData = async () => {
      const response = await fetch(`/api/alphavantage/${resource}`);
      const data = await response.json();
      setCommodityData(data);
      setLoading(false);
    };
    fetchCommodityData();
  }, [resource]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  if (loading || !commodityData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-3/4 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-[120px] mb-2" />
                <Skeleton className="h-4 w-[180px]" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="mb-8">
          <CardHeader>
            <Skeleton className="h-6 w-[200px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-[200px]" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[200px] w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const filteredData = commodityData.data
    .filter((entry) => {
      const entryDate = new Date(entry.date);
      return (
        (!dateRange?.from || entryDate >= dateRange.from) &&
        (!dateRange?.to || entryDate <= dateRange.to)
      );
    })
    .reverse();

  const latestPrice = parseFloat(filteredData[0].value);
  const previousMonthPrice = parseFloat(filteredData[1].value);
  const sixMonthsAgoPrice = parseFloat(filteredData[5]?.value || filteredData[filteredData.length - 1].value);
  const oneYearAgoPrice = parseFloat(filteredData[11]?.value || filteredData[filteredData.length - 1].value);

  const monthlyChange = ((latestPrice - previousMonthPrice) / previousMonthPrice) * 100;
  const sixMonthChange = ((latestPrice - sixMonthsAgoPrice) / sixMonthsAgoPrice) * 100;
  const yearlyChange = ((latestPrice - oneYearAgoPrice) / oneYearAgoPrice) * 100;

  const chartData = {
    labels: filteredData.map((entry) => formatDate(entry.date)),
    datasets: [
      {
        label: `Global Price Index of ${resourceName}`,
        data: filteredData.map((entry) => parseFloat(entry.value)),
        borderColor: "hsl(var(--primary))",
        backgroundColor: "hsl(var(--primary) / 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Global Price Index of ${resourceName} (Monthly)`,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{commodityData.name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Price</CardTitle>
            {monthlyChange >= 0 ? <ArrowUpIcon className="h-4 w-4 text-green-500" /> : <ArrowDownIcon className="h-4 w-4 text-red-500" />}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestPrice.toFixed(2)} {commodityData.unit}</div>
            <p className="text-xs text-muted-foreground">
              {monthlyChange >= 0 ? "+" : ""}{monthlyChange.toFixed(2)}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">6 Month Change</CardTitle>
            {sixMonthChange >= 0 ? <TrendingUpIcon className="h-4 w-4 text-green-500" /> : <TrendingDownIcon className="h-4 w-4 text-red-500" />}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sixMonthChange.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">
              From {formatDate(filteredData[5]?.date || filteredData[filteredData.length - 1].date)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Yearly Change</CardTitle>
            {yearlyChange >= 0 ? <TrendingUpIcon className="h-4 w-4 text-green-500" /> : <TrendingDownIcon className="h-4 w-4 text-red-500" />}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{yearlyChange.toFixed(2)}%</div>
            <p className="text-xs text-muted-foreground">
              From {formatDate(filteredData[11]?.date || filteredData[filteredData.length - 1].date)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Price History</CardTitle>
        </CardHeader>
        <CardContent>
          <Line data={chartData} options={options} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Price Data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <DatePickerWithRange
              dateRange={dateRange}
              onDateRangeChange={(newDateRange) => setDateRange(newDateRange)}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2 bg-muted">Date</th>
                  <th className="px-4 py-2 bg-muted">Price ({commodityData.unit})</th>
                  <th className="px-4 py-2 bg-muted">Change</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((entry, index) => {
                  const currentPrice = parseFloat(entry.value);
                  const previousPrice = index < filteredData.length - 1 ? parseFloat(filteredData[index + 1].value) : currentPrice;
                  const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100;
                  
                  return (
                    <tr key={entry.date} className={index % 2 === 0 ? 'bg-muted/50' : ''}>
                      <td className="px-4 py-2">{formatDate(entry.date)}</td>
                      <td className="px-4 py-2">{currentPrice.toFixed(2)}</td>
                      <td className={`px-4 py-2 ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommodityDetails;