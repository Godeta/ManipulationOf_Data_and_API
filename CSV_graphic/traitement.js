  //affiche le graphe
  async function chartIt() {
      const data = await getData(); //attend la récupération des données
      const ctx = document.getElementById('chart').getContext('2d'); //où on l'affiche
      const myChart = new Chart(ctx, {
          type: 'line', //type de graphe
          data: {
              labels: data.xlabels, //nom
              datasets: [{
                  label: 'Combined Land-Surface Air and Sea-Surface Water Temperature Anomalies in C°', //titre
                  data: data.ytemps, //données
                  fill: false, //ne pas remplir la courbe
                  backgroundColor: 'rgba(255, 99, 132, 0.2)', //couleurs et affichage
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          // ajoute le symbole degrés aux ticks
                          callback: function (value, index, values) {
                              return value + '°C';
                          }
                      }
                  }]
              }
          }
      });
  }


  //Origine du CSV : https://data.giss.nasa.gov/gistemp/
  //actions
  getData();
  chartIt();
  //récupère les données
  async function getData() {

      const xlabels = [];
      const ytemps = [];

      const response = await fetch("ZonAnn.Ts+dSST.csv");
      const data = await response.text();

      //séparer les données manuellement
      const table = data.split("\n").slice(1); //chaqu e ligne puis on enlève la 2ème ligne
      table.forEach(row => {
          const column = row.split(","); //on sépare chaque case
          const year = column[0]; //les années
          xlabels.push(year);
          const temp = column[1]; //1er temperature
          ytemps.push(parseFloat(temp) + 14);
          //car affichage différence par rapport à la température moyenne de 14 degrés
          console.log(year, temp);
      });
      //console.log(table);
      return {
          xlabels,
          ytemps
      };
  }