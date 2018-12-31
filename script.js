(function() {
    var currentPlayer = "cowboy1";

    $(".column").on("click", function(e) {
        var col = $(e.currentTarget);
        var slotsInColumn = col.find(".slot");
        var i;
        var gameover = $("#gameover");
        var winner = $(".winner");

        for (i = 5; i >= 0; i--) {
            if (
                !slotsInColumn.eq(i).hasClass("cowboy1") &&
                !slotsInColumn.eq(i).hasClass("cowboy2")
            ) {
                break;
            }
        }

        slotsInColumn.eq(i).addClass(currentPlayer);

        if (checkForVictory(slotsInColumn)) {
            //do victory dance.
            console.log("The winner is: ", currentPlayer); //Winner column!
            winner.html(" The winner is: " + currentPlayer + ".");

            if (currentPlayer == "cowboy1") {
                winner.css("color", "red");
            } else {
                winner.css("color", "rgb(135, 206, 250)");
            }

            $(".column").animate(
                {
                    opacity: 0.25,
                    left: "+=50",
                    height: "toggle"
                },
                5000,
                function() {
                    gameover.css("left", "450px");
                    winner.css("left", "550px");

                    $(document).on("click", function() {
                        location.reload();
                    });
                }
            );

            $(".column").off("click");
        }

        var slotsInRow = $(".row" + i);
        if (checkForVictory(slotsInRow)) {
            console.log("The winner is: ", currentPlayer); // winner rows !!!!!!!!!!!!!!!!!!!!
            winner.html(" The winner is: " + currentPlayer + ".");

            if (currentPlayer == "cowboy1") {
                winner.css("color", "red");
            } else {
                winner.css("color", "rgb(135, 206, 250)");
            }

            $(".column").animate(
                {
                    opacity: 0.25,
                    left: "+=50",
                    height: "toggle"
                },
                5000,
                function() {
                    gameover.css("left", "450px");
                    winner.css("left", "550px");

                    // h1.css("transition", "1s linear");
                    $(document).on("click", function() {
                        location.reload();
                    });
                    // Animation complete.
                }
            );

            $(".column").off("click");
        }

        for (var b = 0; b < 41; b++) {
            var currSlot = $(".slot").eq(b);
            // initialize objects for going up and down with current slot
            var slotsDown = currSlot;
            var slotsUp = currSlot;
            // adding three more slots to each object in steps of 5 (down) and 7 (up)
            for (var c = 1; c < 4; c++) {
                var nextDownSlot = $(".slot").eq(b + 5 * c);
                var nextUpSlot = $(".slot").eq(b + 7 * c);
                // check if the next slot is in the neighbouring column
                //parent is current column
                if (
                    currSlot.parent().index() + c ==
                    nextDownSlot.parent().index()
                ) {
                    slotsDown = slotsDown.add(nextDownSlot);
                }
                if (
                    currSlot.parent().index() + c ==
                    nextUpSlot.parent().index()
                ) {
                    slotsUp = slotsUp.add(nextUpSlot);
                }
            }
            checkForVictory(slotsDown);
            checkForVictory(slotsUp);

            if (checkForVictory(slotsDown) || checkForVictory(slotsUp)) {
                console.log("The winner is: ", currentPlayer);
                winner.html(" The winner is: " + currentPlayer + ".");

                if (currentPlayer == "cowboy1") {
                    winner.css("color", "red");
                } else {
                    winner.css("color", "rgb(135, 206, 250)");
                }

                $(".column").animate(
                    {
                        opacity: 0.25,
                        left: "+=50",
                        height: "toggle"
                    },
                    5000,
                    function() {
                        gameover.css("left", "450px");
                        winner.css("left", "550px");

                        // h1.css("transition", "1s linear");
                        $(document).on("click", function() {
                            location.reload();
                        });
                        // Animation complete.
                    }
                );
            }
        }

        switchPlayers();
    });

    function checkForVictory(slots) {
        var str = "";

        for (var i = 0; i < slots.length; i++) {
            if (slots.eq(i).hasClass(currentPlayer)) {
                str += "v";
            } else {
                str += "x";
            }
        }

        if (str.indexOf("vvvv") > -1) {
            return true;
        }
    }

    function switchPlayers() {
        if (currentPlayer == "cowboy1") {
            currentPlayer = "cowboy2";
        } else {
            currentPlayer = "cowboy1";
        }
    }
})();
