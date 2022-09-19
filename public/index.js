async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    // let stonks = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=2df3d8a21c144add82895c75d649df67');
    // let stonksObject = await stonks.json();
    // console.log(stonksObject);
    const { GME, MSFT, DIS, BNTX } = mockData;
    const stocks = [GME, MSFT, DIS, BNTX];
    console.log(stocks)

    //puts the dates in ascending order
    stocks.forEach(stock => stock.values.reverse());
    //  TIME CHART
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            //the labels are taken from the fetched data, the const stocks above,
            //the location of the stock in the index [0], then it accesses the "values" array
            //we only want the datetime of each object, so values.map iterates over
            //and makes a new array with only the datetime title thing
            //NOT SURE I completely understand this. 
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map(stock => ({
                label: stock.meta.symbol,
                //"data" is iterating over values, then using parseFloat to change
                //value.high into an integer 
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol)
            }))
        }
    });

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            //this isn't working
            labels: stocks[0].meta.map(meta => meta.symbol),
            datasets: stocks.map(stock => ({
                label: 'Highest',
                barPercentage: 0.5,
                barThickness: 6,
                maxBarThickness: 8,
                minBarLength: 2,
                data:getHighest(stock)
            }))
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {

                }
            }
        },
    });


}



//this does work, I've tested it, just not sure how to call it
function getHighest(stock) {
    arr = stock.values.map(value => parseFloat(value.high))
    console.log(arr)
    let i = 0
    arr.forEach((element) => {
        if (i < element) {
          i = element;
        }
      });
      console.log(i)
}

function getColor(stock) {
    if (stock === "GME") {
        return 'rgba(61, 161, 61, 0.7)'
    }
    if (stock === "MSFT") {
        return 'rgba(209, 4, 25, 0.7)'
    }
    if (stock === "DIS") {
        return 'rgba(18, 4, 209, 0.7)'
    }
    if (stock === "BNTX") {
        return 'rgba(166, 43, 158, 0.7)'
    }
}


main()