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
            //this singles out a single stock object, sorting all the info it needs,
            //then puts that information into an array
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
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [
                {
                    label: "Highest",
                    backgroundColor: ['rgba(61, 161, 61, 0.7)','rgba(209, 4, 25, 0.7)','rgba(18, 4, 209, 0.7)','rgba(166, 43, 158, 0.7)'],
                    data: [4,5,6,7]

                }
            ]
        }
    });

}



//I need this function to go through all the values of a stock
//choose the highest one of that array,
//then put all those in an array,
//and I need it to do it 4 times

function getHighest() {
    stocks.map(value => parseFloat(value.high))
    console.log (arr)
    let i = 0
    arr.forEach((element) => {
        if (i < element) {
            i = element;
        }
    });
    console.log(i)
}

//console.log(getHighest())

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