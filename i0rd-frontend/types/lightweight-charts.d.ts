// types/lightweight-charts.d.ts
declare module 'lightweight-charts' {
  import { IChartApi, ISeriesApi, LayoutOptions } from 'lightweight-charts';
  interface IChartApi {
    addLineSeries(options?: any): ISeriesApi<'Line'>;
  }
  interface LayoutOptions {
    background?: string | { type: string; color: string };
    textColor?: string;
  }
}