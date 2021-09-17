d3.json("data/samples.json").then(function(data) {
    const samp=data.samples;
    const meta=data.metadata;


    dropdown=d3.select("#selDataset");



    function init(){
        let arr = samp[0].otu_ids.slice(0,10).map(i => 'OTU ' + i);
        let data1=[{
            x:samp[0].sample_values.slice(0,10),
            y:arr,
            text: samp[0].otu_labels.slice(0,10),
            orientation:'h',
            type: "bar"
        }];

        let layout1 = {
            xaxis: {
                title: 'Sample Value',
            }
        }

        Plotly.newPlot('bar',data1,layout1);

        let data2=[{
            x:samp[0].otu_ids,
            y:samp[0].sample_values,
            marker:{
                color:samp[0].otu_ids,
                size:samp[0].sample_values
            },
            text:samp[0].otu_labels,
            mode:'markers'

        }]

        Plotly.newPlot('bubble',data2);

        let demo=d3.select("#sample-metadata");
        for (const [key, value] of Object.entries(meta[0])) {
            demo.append('p').text(`${key}: ${value}`);

        };
        var data3 = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              title: { text: "Scrubs Per Week" },
              type: "indicator",
              mode: "gauge+number+delta",
              value: meta[0].wfreq,
              gauge: {
                axis: { range: [0,10] },
                steps: [
                  { range: [0, 1], color: "#fafa6e" },
                  { range: [1, 2], color: "#d7f171" },
                  { range: [2, 3], color: "#b5e877" },
                  { range: [3, 4], color: "#95dd7d" },
                  { range: [4, 5], color: "#77d183" },
                  { range: [5, 6], color: "#77d183" },
                  { range: [6, 7], color: "#5bc489" },
                  { range: [7, 8], color: "#3fb78d" },
                  { range: [8, 9], color: "#23aa8f" },
                  { range: [9, 10], color: "#008d8c" }
                ],
              }
            }
          ];
          
          var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
          Plotly.newPlot('gauge', data3, layout);

    };

    init();

    for (i=0;i<samp.length;i++) {
        let op=dropdown.append("option").text(samp[i].id)
        op.property('value',i)
    }
    d3.selectAll("#selDataset").on("change", getData);

    function getData(){
        let id=parseInt(dropdown.property('value'));
        let arr = samp[id].otu_ids.slice(0,10).map(i => 'OTU ' + i);
        console.log(samp[id].sample_values.slice(0,10));
        Plotly.restyle('bar','x',[samp[id].sample_values.slice(0,10)]);
        Plotly.restyle('bar','y',[arr]);
        Plotly.restyle('bar','text',[samp[id].otu_labels.slice(0,10)]);

        Plotly.restyle('bubble','x',[samp[id].otu_ids]);
        Plotly.restyle('bubble','y',[samp[id].sample_values]);
        Plotly.restyle('bubble','marker.color',[samp[id].otu_ids]);
        Plotly.restyle('bubble','marker.size',[samp[id].sample_values]);
        Plotly.restyle('bubble','text',[samp[id].otu_labels]);

        let demo=d3.select("#sample-metadata");
        demo.selectAll('p').remove()
        for (const [key, value] of Object.entries(meta[id])) {
            demo.append('p').text(`${key}: ${value}`);
        }

          Plotly.restyle('gauge', 'value', meta[id].wfreq);
    }
});

  