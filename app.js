$(document).ready(function() {
  // Sergio Barro-Ojeda 01857597
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
          error.appendTo("#errorMessages");
      },
      submitHandler: function(form) {
          generateTable();
          return false; // Prevent default form submission
      }
  });

  function generateTable() {
      const hStart = parseInt($("#hStart").val());
      const hEnd = parseInt($("#hEnd").val());
      const vStart = parseInt($("#vStart").val());
      const vEnd = parseInt($("#vEnd").val());

      const errorMessages = $("#errorMessages");
      errorMessages.empty(); // Clear previous error messages

      if (isNaN(hStart) || isNaN(hEnd) || isNaN(vStart) || isNaN(vEnd)) {
          errorMessages.append("<p>All inputs must be valid numbers.</p>");
          return;
      }
      if (hStart > hEnd) {
          errorMessages.append("<p>Horizontal Start must be less than or equal to Horizontal End.</p>");
          return;
      }
      if (vStart > vEnd) {
          errorMessages.append("<p>Vertical Start must be less than or equal to Vertical End.</p>");
          return;
      }
      if (hStart < -50 || hEnd > 50 || vStart < -50 || vEnd > 50) {
          errorMessages.append("<p>Values must be between -50 and 50.</p>");
          return;
      }

      const tableContainer = $("#tableContainer");
      tableContainer.empty(); // Clear previous table

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

      tableContainer.append(table);
  }
});
