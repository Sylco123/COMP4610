$(document).ready(function() {
  $("#tabs").tabs();
//Sergio Barro-Ojeda 01857597
  // // Function to set up sliders and synchronize with input fields,
  // proviging a max and min value for slider
  function setupSlider(sliderId, inputId) {
    $(sliderId).slider({
      min: -50,
      max: 50,
      slide: function(event, ui) {
        $(inputId).val(ui.value); //updating the input field when the slider gets moved
      }
    });
    $(inputId).on("input", function() {
      $(sliderId).slider("value", this.value); //updates the slider in input field change
    });
  }

  setupSlider("#hStartSlider", "#hStart");
  setupSlider("#hEndSlider", "#hEnd");
  setupSlider("#vStartSlider", "#vStart");
  setupSlider("#vEndSlider", "#vEnd");

  // Form validation
  $("#multiplicationForm").validate({
    rules: {
      hStart: {
        required: true,
        number: true,
        range: [-50, 50]
      },
      hEnd: {
        required: true,
        number: true,
        range: [-50, 50]
      },
      vStart: {
        required: true,
        number: true,
        range: [-50, 50]
      },
      vEnd: {
        required: true,
        number: true,
        range: [-50, 50]
      }
    },
    messages: {
      hStart: "Please enter a valid number between -50 and 50",
      hEnd: "Please enter a valid number between -50 and 50",
      vStart: "Please enter a valid number between -50 and 50",
      vEnd: "Please enter a valid number between -50 and 50"
    },
    errorPlacement: function(error, element) {
      error.appendTo("#errorMessages"); // Position error messages after the input fields
    },
    submitHandler: function(form) {
      if (generateTable()) {
        return false; // Prevent default form submission
      }
    }
  });

  // Function to generate the multiplication table
  function generateTable() {
    const hStart = parseInt($("#hStart").val());
    const hEnd = parseInt($("#hEnd").val());
    const vStart = parseInt($("#vStart").val());
    const vEnd = parseInt($("#vEnd").val());

    const errorMessages = $("#errorMessages"); // create the error messages, NOT ALERT LIKE BEFORE
    errorMessages.empty(); // Clear previous error messages

    if (isNaN(hStart)) { // specific cases for each value error case, to help understand what is wrong.
      errorMessages.append("<p>Min Column Value must be a valid number.</p>");
      return false;
    }
    if (isNaN(hEnd)) {
      errorMessages.append("<p>Max Column Value must be a valid number.</p>");
      return false;
    }
    if (isNaN(vStart)) {
      errorMessages.append("<p>Min Row Value must be a valid number.</p>");
      return false;
    }
    if (isNaN(vEnd)) {
      errorMessages.append("<p>Max Row Value must be a valid number.</p>");
      return false;
    }
    if (hStart > hEnd) {
      errorMessages.append("<p>Min Column Value must be less than or equal to Max Column Value.</p>");
      return false;
    }
    if (vStart > vEnd) {
      errorMessages.append("<p>Min Row Value must be less than or equal to Max Row Value.</p>");
      return false;
    }
    if (hStart < -50 || hEnd > 50 || vStart < -50 || vEnd > 50) {
      errorMessages.append("<p>All values must be between -50 and 50.</p>");
      return false;
    }

    const tableContainer = $("#tableContainer");
    tableContainer.empty();

    const table = $("<table></table>");

    // Create table header
    let headerRow = $("<tr></tr>");
    headerRow.append("<th></th>");
    for (let h = hStart; h <= hEnd; h++) {
      headerRow.append("<th>" + h + "</th>");
    }
    table.append(headerRow);

    // Create table rows
    for (let v = vStart; v <= vEnd; v++) {
      let row = $("<tr></tr>");
      row.append("<th>" + v + "</th>");
      for (let h = hStart; h <= hEnd; h++) {
        row.append("<td>" + (h * v) + "</td>");
      }
      table.append(row);
    }

    // Add new tab for the generated table
    const tabId = "tab-" + ($(".ui-tabs-panel").length + 1);
    const tabTitle = "Table (" + hStart + ", " + hEnd + ", " + vStart + ", " + vEnd + ")";
    $("#tabs").append('<div id="' + tabId + '"><div class="tableContainer"></div><button class="delete-tab">Delete Table</button></div>');
    $("#tabs ul").append('<li><a href="#' + tabId + '">' + tabTitle + '</a></li>');
    $("#" + tabId + " .tableContainer").append(table);
    $("#tabs").tabs("refresh");

    // Delete tab functionality
    $("#tabs").on("click", "span.ui-icon-close", function() {
      const panelId = $(this).closest("li").remove().attr("aria-controls");
      $("#" + panelId).remove();
      $("#tabs").tabs("refresh");
    });

    return true;
  }
});
