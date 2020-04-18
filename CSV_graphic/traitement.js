  //affiche le graphe
  async function chartIt() {
      const data = await getData(); //attend la récupération des données
      const ctx = document.getElementById('chart').getContext('2d'); //où on l'affiche
      const myChart = new Chart(ctx, {
          type: 'line', //type de graphe
          data: {
              labels: data.xlabels, //nom
              datasets: [{ //les différentes courbes
                      label: 'Global temperature in C°', //titre
                      data: data.ytemps, //données
                      fill: false, //ne pas remplir la courbe
                      backgroundColor: 'rgba(255, 99, 132, 0.2)', //couleurs et affichage
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 1
                  },
                  {
                      label: 'Northern Hemisphere Temperature in °C',
                      data: data.northern, //autre données
                      fill: false,
                      borderColor: 'rgba(99, 132, 255, 1)',
                      backgroundColor: 'rgba(99, 132, 255, 0.5)',
                      borderWidth: 1
                  },
                  {
                      label: 'Souther Hemisphere in °C',
                      data: data.southern,
                      fill: false,
                      borderColor: 'rgba(99, 255, 132, 1)',
                      backgroundColor: 'rgba(99, 255, 132, 0.5)',
                      borderWidth: 1
                  }
              ]
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

      //degrés à gauche
      const xlabels = [];
      //différentes valeurs en ordonné
      const ytemps = [];
      const northern = [];
      const southern = [];

      const response = await fetch("ZonAnn.Ts+dSST.csv");
      const data = await response.text();

      //séparer les données manuellement
      const table = data.split("\n").slice(1); //chaque ligne puis on enlève la 2ème ligne
      table.forEach(row => {
          const column = row.split(","); //on sépare chaque case
          const year = column[0]; //les années
          xlabels.push(year); //les années en abscisse
          const temp = column[1]; //la température globale

          //affichage différence par rapport à la température moyenne de 14 degrés
          ytemps.push(parseFloat(temp) + 14);
          northern.push(14 + parseFloat(column[2]));
          southern.push(14 + parseFloat(column[3]));
          console.log(year, temp);
      });
      //console.log(table);
      return {
          xlabels, //années
          ytemps, //températures °C
          northern, //autres températures
          southern
      };
  }