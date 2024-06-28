// Sergio Barro-Ojeda 01857597
$(document).ready(function() {
    // Make tiles draggable
    $(".tile").draggable({
        revert: "invalid",
        containment: "body",
        cursor: "move"
    });

    // Make board spaces droppable
    $(".board-space").droppable({
        accept: ".tile",
        drop: function(event, ui) {
            const droppedTile = ui.draggable.clone(); // Clone the draggable tile
            $(this).append(droppedTile);

            const letter = droppedTile.attr("data-letter");
            const value = parseInt(droppedTile.attr("data-value")); // adding the point value to the assigned letter
            // Update board space attributes (data-letter, data-value)
            $(this).attr("data-letter", letter);
            $(this).attr("data-value", value);

            // Update score when a tile is dropped
            updateScore();
        }
    });

    // Make discard area droppable
    $("#discard-area").droppable({
        accept: ".tile",
        drop: function(event, ui) {
            const droppedTile = ui.draggable.clone();
            $(this).append(droppedTile);
        }
    });

    let cumulativeScore = 0;
    
    // Function to update score based on board spaces
    function updateScore() {
        let totalScore = 0;

        $(".board-space").each(function() {
            const letter = $(this).attr("data-letter");
            const value = parseInt($(this).attr("data-value"));
            
            if (letter && value) {
                totalScore += value;

                // Apply bonus logic (if needed)
                if ($(this).hasClass("double-letter")) {
                    totalScore += value; // Double letter score
                } else if ($(this).hasClass("double-word")) {
                    totalScore *= 2; // double word score
                }
            }
        });

        // Update score display
        $("#score-display").text("Score: " + totalScore);
    }

    // Deal button click event handler
    $("#deal-button").click(function() {
        // Clear existing tiles from the rack
        $(".tile").each(function() {
            $(this).remove(); // Remove existing tiles
        });

        // Deal new tiles
        for (let i = 0; i < 7; i++) {
            const randomTileImage = getRandomTileImage();
            const newTile = $('<img>')
                .attr('src', randomTileImage)
                .addClass('tile')
                .draggable({
                    revert: "invalid",
                    containment: "body",
                    cursor: "move"
                });
            $('#tile-rack').append(newTile);
        }

        // Reset score display after dealing new tiles
        updateScore(); // Optional: Reset score to zero or desired initial state
    });

    // Function to get a random tile image
    function getRandomTileImage() {
        // Example: Assuming tiles are named A.png, B.png, ..., Z.png
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        return `images/Scrabble_Tiles/Scrabble_Tile_${randomLetter}.jpg`;
    }

    // Deal button click event handler
    $("#deal-button").click(function() {
        // Clear existing tiles from the rack
        $(".tile").each(function() {
            $(this).remove(); // Remove existing tiles
        });

        // Deal new tiles
        for (let i = 0; i < 7; i++) {
            const randomTileImage = getRandomTileImage();
            const newTile = $('<img>')
                .attr('src', randomTileImage)
                .addClass('tile')
                .attr('data-letter', randomTileImage.slice(-5, -4)) // Adding tile value
                .attr('data-value', getTileValue(randomTileImage.slice(-5, -4))) 
                .draggable({
                    revert: "invalid",
                    containment: "body",
                    cursor: "move"
                });
            $('#tile-rack').append(newTile);
        }
    });
});


// Function to calculate score
function calculateScore() {
    let totalScore = 0;

    $(".board-space").each(function() {
        const tile = $(this).find(".tile");
        if (tile.length > 0) {
            // Assuming each tile has a data-value attribute for its score value
            const tileValue = parseInt(tile.attr("data-value"));
            // Add tile value to total score
            totalScore += tileValue;
        }
        // Check for bonus squares (implement logic based on your bonus rules)
        if ($(this).hasClass("double-letter")) {
            totalScore += tileValue; // Double the tile value
        } else if ($(this).hasClass("double-word")) {
            totalScore *= 3; // double the total score
        }
    });

    return totalScore;
}

function isValidWord() {
    let word = "";

    $(".board-space").each(function() {
        const tile = $(this).find(".tile");
        if (tile.length > 0) {
            // Assuming each tile has a data-letter attribute for its letter
            const letter = tile.attr("data-letter");
            word += letter;
        }
    });

    // Example: Check if 'word' exists in a dictionary (server-side check or local dictionary)
    const dictionary = ["apple", "banana", "orange"]; // Example dictionary
    return dictionary.includes(word.toLowerCase());
}

    // Function to get tile value based on the letter
    function getTileValue(letter) {
        const tileValues = {
            A: 1, B: 3, C: 3, D: 2, E: 1, F: 4, G: 2, H: 4,
            I: 1, J: 8, K: 5, L: 1, M: 3, N: 1, O: 1, P: 3,
            Q: 10, R: 1, S: 1, T: 1, U: 1, V: 4, W: 4, X: 8,
            Y: 4, Z: 10, _: 0
        };
        return tileValues[letter.toUpperCase()] || 0;
    }
