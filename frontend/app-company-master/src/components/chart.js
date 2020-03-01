import React from 'react';
import {Line} from 'react-chartjs-2';
import { connect } from 'react-redux';
import { DateRangePicker, Toggle } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

const data5 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  pointDot: true,
  showLines: false,
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    }
  ],

};



const options= {
    legend: {
      display: true
    },
    scales: {
        xAxes: [{
            type: "time",
            time: {                        
              parser: 'MMM DD HH:mm:ss',
              unit: 'minutes',
              unitStepSize: 5,
              round: 'second',
              displayFormats: {
                millisecond: 'MMM DD HH:mm:ss',
                seconds: 'MMM DD HH:mm:ss',
                minutes: 'MMM DD HH:mm:ss',
                hour: 'MMM DD HH:mm:ss',
                mounth: 'MM',
                year: 'YYYY',
              },

              stepSize: 5
            },
            
          }],       
          yAxes: [{
                     ticks: {
                        max: 10,
                        min: 0,
                        stepSize: 3
                      }
                    }]
      },

  }

//   const options= {
//     legend: {
//       display: true
//     },
//     scales: {
//         xAxes: [{
//             type: "time",
//             time: {                        
//               parser: "YYYY-MM-DD HH:mm:ss",
//               unit: 'minutes',
//               unitStepSize: 5,
//               round: 'second',
//               displayFormats: {
//                 seconds: 'ss',
//                 minutes: 'MMM DD HH:mm:ss',
//                 hour: 'MMM DD HH:mm:ss',
//                 mounth: 'MM',
//                 year: 'YYYY',
//               },
//               // min: 1471174953000,
//               // max: 1473853353000
//             },
            
//           }],

//       },

//   }


  const data30 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    pointDot: true,
    showLines: false,
    datasets: [
      {
        label: 'minimum',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'red',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: 'red',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: 'medium',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'green',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: 'green',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
      {
        label: 'maximum',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'blue',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: 'blue',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
      }

    ],
  
  };
  let chart30MinutesData;
  let chart5MinutesData;
  let data = {};
  Object.assign(data, data5)
  let changeStepChange = true;

class Chart extends React.Component {
    constructor(props) {
        super(props);
        
        this.prepareDataForChart();
        let dateRange = this.getDateRange();
       
        
        this.state = {
          dateRange: dateRange,
        };

    }

    componentDidMount() {

    }

    changeXScale(value) {
        console.log(this.props);
        this.reference.chartInstance.config.options.scales.xAxes[0].time.min = new Date(value[0]);
        this.reference.chartInstance.config.options.scales.xAxes[0].time.max = new Date(value[1]);
        
        if(changeStepChange === false) {
          data.datasets = data30.datasets;
          data.labels = chart30MinutesData.label;
          data.datasets[0].data = chart30MinutesData.minData;
          data.datasets[1].data = chart30MinutesData.mediumData;
          data.datasets[2].data = chart30MinutesData.maxData;
          this.reference.chartInstance.config.options.unitStepSize = 30;
          this.reference.chartInstance.config.options.stepSize = 30;
      } else {
          data.datasets = data5.datasets;
          data.labels = chart5MinutesData.labels;
          data.datasets[0].data = chart5MinutesData.data; 
          this.reference.chartInstance.config.options.scales.xAxes[0].unitStepSize = 5;
          this.reference.chartInstance.config.options.scales.xAxes[0].stepSize = 5;
      }
        this.reference.chartInstance.update();
    }

    changeTimeStep() {  
    
        if(changeStepChange === true) {
            data.datasets = data30.datasets;
            data.labels = chart30MinutesData.label;
            data.datasets[0].data = chart30MinutesData.minData;
            data.datasets[1].data = chart30MinutesData.mediumData;
            data.datasets[2].data = chart30MinutesData.maxData;
            this.reference.chartInstance.config.options.scales.xAxes[0].unitStepSize = 30;
            this.reference.chartInstance.config.options.scales.xAxes[0].stepSize = 30;
        } else {
            data.datasets = data5.datasets;
            data.labels = chart5MinutesData.labels;
            data.datasets[0].data = chart5MinutesData.data; 
            this.reference.chartInstance.config.options.scales.xAxes[0].unitStepSize = 5;
            this.reference.chartInstance.config.options.scales.xAxes[0].stepSize = 5;
        }

        changeStepChange = !changeStepChange;
        this.reference.chartInstance.update();
    }

    getDateRange() {
        const clientDataLastIndex = this.props.clientData.jsonArray.length-1;
        const minDate = this.props.clientData.jsonArray[0].time.split(' ')[0];
        const maxDate = this.props.clientData.jsonArray[clientDataLastIndex].time.split(' ')[0];
        const dateRange = [new Date(minDate), new Date(maxDate)];
        return dateRange
    }


    prepareDataForChart() {
        const values = [];
        const labels = [];
        const jsonArray = this.props.clientData.jsonArray;
        
        let clientDataLastIndex =  this.props.clientData.jsonArray.length-1;
        let beginTime = new Date(jsonArray[0].time).getTime()*(1.66667e-5);
        let endTime = new Date(jsonArray[jsonArray.length-1].time).getTime()*(1.66667e-5);
           

        let minValue = jsonArray[0].value;
        let mediumValue = jsonArray[0].value;
        let maxValue = jsonArray[0].value;
        let summ = jsonArray[0].value;
        let countInInterval=1;
        let findedPeriod = true;  
      
        chart30MinutesData = {
          minData: [],
          mediumData: [],
          maxData: [],
          label: []
        };
        
        chart5MinutesData = {
          data: [],
          labels: []
        }

        chart5MinutesData.data.push(jsonArray[0].value);
        chart5MinutesData.labels.push(new Date(jsonArray[0].time));
        
        for (let i=1; i < jsonArray.length; i++) {
            
            chart5MinutesData.data.push(jsonArray[i].value);
            chart5MinutesData.labels.push(new Date(jsonArray[i].time));
        }
        
        let ranges = [];
        let count = 0;

        while(beginTime < endTime) {
            ranges[count] = { 
                              labels: [],
                              data: [],
                              min: [0,0],
                              max: [0,0],
                              medium: [0,0]
                            };
            ranges[count].labels = [new Date(beginTime/(1.66667e-5)), new Date((beginTime + 30)/(1.66667e-5))];
            
            let min = 0;
            let max = 0;
            let medium = 0;
            let summ = 0;
            let summCount = 0;
            let first = true;
            for(let i=0; i<jsonArray.length;i++) {
              let dateInMinutes = new Date(jsonArray[i].time).getTime()*(1.66667e-5);


              if(beginTime<=dateInMinutes && dateInMinutes<=beginTime + 30) {
                if(first === true) {
                  min = jsonArray[i].value;
                  max = jsonArray[i].value;
                  medium = jsonArray[i].value;
                  summ = jsonArray[i].value;
                  summCount = 1;
                  first = false;
                } else {
                  if(min > jsonArray[i].value) {
                    min = jsonArray[i].value;
                  }

                  if(max < jsonArray[i].value) {
                    max = jsonArray[i].value;
                  }

                  summ = summ + jsonArray[i].value;
                  summCount++;
                  medium = summ/summCount;
                }


                ranges[count].data.push(jsonArray[i].value);
              }
            }
            
            if(first === false) {
              ranges[count].min = [min,min];
              ranges[count].max = [max,max];
              ranges[count].medium = [medium,medium];
            }

            let minArray = chart30MinutesData.minData.concat(ranges[count].min);
            let mediumArray = chart30MinutesData.mediumData.concat(ranges[count].medium );
            let maxArray = chart30MinutesData.maxData.concat(ranges[count].max);
            let labelArray = chart30MinutesData.label.concat(ranges[count].labels);
            
            chart30MinutesData.minData = minArray;
            chart30MinutesData.mediumData = mediumArray;
            chart30MinutesData.maxData = maxArray;
            chart30MinutesData.label = labelArray;
            
            beginTime = beginTime + 30;
            count = count+1;
            
        }


        data.labels = chart5MinutesData.labels;
        data.datasets[0].data = chart5MinutesData.data;

        options.scales.xAxes[0].min = new Date(data.labels[0]);
        options.scales.xAxes[0].max = new Date(data.labels[data.labels.length-1]);

       
    }


    render() {


          
        this.prepareDataForChart();
            

        
        return (
          <div className="chart">
            <Line redraw={true} ref = {(reference) => this.reference = reference} data={data} options={options}/>

            <div className="tools">
                <div className="tools__tool"> 
                  <h6>Change Date scale:</h6>
                  <DateRangePicker 
                    defaultValue={this.state.dateRange}
                    onChange={value => {
                      this.changeXScale(value);
                    }}
                  />
                </div>
                <div className="tools__tool">
                    <h6>Change time step:</h6>
                    <Toggle size="md" 
                      onChange={() => {
                        this.changeTimeStep();
                      }}
                    />
                </div>
            </div>

          </div>
        );

      }
}




const mapStateToProps = (state) => {
    return {
        users: state.reducer.users,
        clientData: state.reducer.clientData
    };

  };

export default connect(mapStateToProps)(Chart);
