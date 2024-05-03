import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexNonAxisChartSeries, ApexPlotOptions, ApexResponsive, ApexTitleSubtitle, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { project } from '../data';


export type ChartOptions1 = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    labels: any;
};

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    fill: ApexFill;
    dataLabels: ApexDataLabels;
};

export type ChartOptions2 = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    responsive: ApexResponsive[];
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    title: ApexTitleSubtitle;
    legend: ApexLegend;
    fill: ApexFill;
};

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
    @ViewChild("chart") chart!: ChartComponent;
    @ViewChild("chart1") chart1!: ChartComponent;
    @ViewChild("chart2") chart2!: ChartComponent;

    public chartOptions: Partial<ChartOptions> | any;
    public chartOptions2: Partial<ChartOptions2> | any;
    public chartOptions1: Partial<ChartOptions1> | any;
    monthList: any[] = ['All', 'January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    data = project
    cards: any;

    constructor() {
    }

    ngOnInit() {
        //Calling Function to initalize  charts
        this.prepareChart();
    }

    public generateData(baseval: any, count: any, yrange: any) {
        var i = 0;
        var series = [];
        while (i < count) {
            var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
            var y =
                Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
            var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

            series.push([x, y, z]);
            baseval += 86400000;
            i++;
        }
        return series;
    }

    //Filter Data Month wise
    filterData(e: any) {
        this.cards = this.data.schedule[e.value];
        this.chartOptions2.series = this.data.Mrr.series[e.value]
        this.chartOptions1.series = this.data.pagesView.series[e.value];
        this.chartOptions.series = this.data.mrrCountry.series[e.value]
    }

    //Initialize charts
    prepareChart() {
        this.cards = this.data.schedule.All;

        //Bubble Chart
        this.chartOptions = {
            series: this.data.mrrCountry.series.All,
            chart: {
                height: 350,
                toolbar: {
                    show: false
                },
                type: "bubble"
            },
            dataLabels: {
                enabled: false
            },
            fill: {
                opacity: 0.8
            },
            title: {
                text: "MRR Status by Country"
            },
            xaxis: {
                tickAmount: 12,
                type: "category"
            },
            yaxis: {
                max: 70
            }
        };

        //Donut Chart
        this.chartOptions1 = {
            series: this.data.pagesView.series.All,
            chart: {
                type: "donut"
            },
            labels: this.data.pagesView.labels,
            dataLabels: {
                enabled: false, 
              },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: "bottom"
                        }
                    }
                }
            ]
        };

        //Stacked Chart
        this.chartOptions2 = {
            series: this.data.Mrr.series.All,
            chart: {
                type: "bar",
                height: 350,
                stacked: true,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false, 
              },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: "bottom",
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }
            ],
            plotOptions: {
                bar: {
                    horizontal: false
                }
            },
            xaxis: {
                type: "category",
                categories: [
                    "Jan-Feb",
                    "Mar-Apr",
                    "May-Jun",
                    "Jul-Aug",
                    "Sep-Oct",
                    "Nov-Dec"
                ]
            },
            yaxis: {
                min: -4,
                max: 14,
                tickAmount: 9

            },
            title: {
                text: "MRR"
            },
            legend: {
                show: false
            },
            fill: {
                opacity: 1
            }
        };
    }
}
