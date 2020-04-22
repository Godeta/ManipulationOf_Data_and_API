  //affiche le graphe
  async function chartIt() {
      const data = await getData(); //attend la récupération des données
      const ctx = document.getElementById('chart').getContext('2d'); //où on l'affiche
      const myChart = new Chart(ctx, {
          type: 'bar', //type de graphe
          data: {
              labels: data.xlabels, //nom
              datasets: [{ //les différentes courbes
                  label: 'Crédits en fonction des dates', //titre
                  data: data.ycredits, //données
                  //fill: false, //ne pas remplir la courbe
                  backgroundColor: 'rgba(255, 99, 132, 0.2)', //couleurs et affichage
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  xAxes: [{

                      time: {
                          displayFormats: {
                              quarter: 'DD MM YYYY'
                          }
                      }
                  }],
                  yAxes: [{
                      ticks: {
                          // ajoute le symbole degrés aux ticks
                          callback: function (value, index, values) {
                              return value + '$';
                          }
                      }
                  }]
              }
          }
      });
  }


  //actions
  getData();
  chartIt();
  //récupère les données
  async function getData() {

      //temps en bas
      const xlabels = [];
      //différentes valeurs en ordonné
      const ycredits = [];

      const response = await fetch("dataExample.csv");
      const data = await response.text();

      //séparer les données manuellement
      const table = data.split("\n").slice(1); //chaque ligne puis on enlève la 2ème ligne
      table.forEach(row => {
          const column = row.split(","); //on sépare chaque case
          const year = column[2]; //les années/ dates
          xlabels.push(year); //les années en abscisse
          const credit = column[0]; //les crédits

          //affichage différence par rapport à la creditérature moyenne de 14 degrés
          ycredits.push(parseFloat(credit));
          console.log(year, credit);
      });
      //console.log(table);
      return {
          xlabels, //années
          ycredits, //credits
      };
  }