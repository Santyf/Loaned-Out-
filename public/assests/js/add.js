$(document).ready(function() {
    function hello() {
        $.ajax("/items", {
            type: "GET",
           
        }).then(function(data) {
          console.log(data);
          var items = data.items;
          var len = items.length;
          var items_elem = $("#listedItems");
          for (var i = 0; i < len; i++) {
            items_elem.append(
              "<li><p>" +
                items[i].item_id +
                "." +
                items[i].item_name +
                "," +
                items[i].Category +
                "<button data-itemid='" +
                items[i].item_id +
                "' class='delQuote'>Delete Quote!</button></p></li>"
            );
          }
        });
    }

    $(document).on("click", ".delQuote", function(event) {
      // Get the ID from the button.
      // This is shorthand for $(this).attr("data-planid")
      var id = $(this).data("quoteid");
      // Send the DELETE request.
      $.ajax("/items/" + id, {
        type: "DELETE"
      }).then(function() {
        console.log("deleted id ", id);
        // Reload the page to get the updated list
        location.reload();
      });
    });
    $("#addQuote").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      // [name=plan] will find an element with a "name" attribute equal to the string "plan"
      var newquote = {
        quote: $("#addQuote [name=quote]")
          .val()
          .trim(),
        author: $("#addQuote [name=author]")
          .val()
          .trim()
      };
      // Send the POST request.
      $.ajax("/items", {
        type: "POST",
        data: JSON.stringify(newquote),
        dataType: "json",
        contentType: "application/json"
      }).then(function() {
        console.log("created new plan");
        // Reload the page to get the updated list
        location.reload();
      });
    });
    $("#updateQuote").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      var id = $("#quote_id")
        .val()
        .trim();
      var updatedquote = {
        quote: $("#updateQuote [name=quote]")
          .val()
          .trim(),
        author: $("#updateQuote [name=author]")
          .val()
          .trim()
      };
      // Send the PUT request.
      $.ajax("/items/" + id, {
        type: "PUT",
        data: JSON.stringify(updatedquote),
        dataType: "json",
        contentType: "application/json"
      }).then(function() {
        console.log("updated id ", id);
        // Reload the page to get the updated list
        location.reload();
      });
    });
    
  });

  function addItemshow() {
    $("#add_item").toggle();
    console.log("show");
  }