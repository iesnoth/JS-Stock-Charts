async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&2df3d8a21c144add82895c75d649df67',{
        
    })
    
    
    
    //https://api.twelvedata.com/time_series?symbol=AAPL,EUR/USD,IXIC&interval=1min&apikey=demo
    //key 2df3d8a21c144add82895c75d649df67
    //stock symbols: GME, MSFT, DIS, and BNTX

}

main()