window.onload = function () {
    var button = document.getElementById("enter-button");
    button.addEventListener('click',function() {
      if (document.contains(document.getElementById("results-from-api"))) {
                document.getElementById("results-from-api").remove();
      }   else { }
      if (document.contains(document.getElementById("results-title"))) {
                document.getElementById("results-title").remove();
      }   else { }
      if (document.contains(document.getElementById("closing-time"))) {
                document.getElementById("closing-time").remove();
      }   else { }
      if (document.contains(document.getElementById("difference-arrow"))) {
                document.getElementById("difference-arrow").remove();
      }   else { }
      const resultsTitle = document.createElement("h1");
      resultsTitle.id = "results-title";
      const results = document.createElement("p");
      results.id = "results-from-api";
      const difference = document.createElement("p");
      difference.id = "difference-arrow";
      const arrow = document.createTextNode("render arrow based on difference");
      const price = document.createTextNode("The most recent closing price:  ");
      const rslts = document.createTextNode("insert results here  ");
      results.appendChild(price);
      results.appendChild(rslts);
      difference.appendChild(arrow);
      document.getElementById("response").appendChild(resultsTitle);
      document.getElementById("response").appendChild(results);
      document.getElementById("response").appendChild(difference);
      }  );
  }