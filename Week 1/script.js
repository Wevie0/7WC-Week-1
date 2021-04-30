num_foods = 10;
function send_order() { // "Submits" the order. No server-side functionality currently
    document.getElementById("amount").reset(); // Resets all forms and prices
    document.getElementById("tip-form").reset();
    document.getElementById("split-check").checked = false;
    show_split();

    alert("Your order was sent!");
    for (var i = 0; i < num_foods; i++) {
        document.getElementById(String(i)).innerHTML = "$0.00";
    }
    document.getElementById("subtotal").innerHTML = "$0.00";
    document.getElementById("taxes").innerHTML = "$0.00";
    document.getElementById("final_total").innerHTML = "$0.00";
}

function item_cost(cost, index) { // Gets the cost of each item and outputs it
    var item_cost = 0;
    var item_list = document.getElementById("amount");
    if (item_list.elements[index].value > 0) { // Finds the number inputted
        item_cost += item_list.elements[index].value * cost; // Price = # items * cost/item
    }
    // Outputs to string with a '$' sign
    document.getElementById(String(index)).innerHTML = "$" + String(item_cost.toFixed(2));
    // Updates the subtotal
    subtotal();
}

function subtotal() {
    var subtotal = 0; //
    for (var i = 0; i < num_foods; i++) {
        // Goes through each food's cost ands adds it to a running total
        subtotal += parseFloat(document.getElementById(String(i)).innerHTML.substr(1));
    }
    document.getElementById("subtotal").innerHTML = "$" + String(subtotal.toFixed(2)); // Outputs the subtotal
    calculate_tax(subtotal); // Calculates the tax
}

function calculate_tax(sub) {
    var taxes = sub * 0.13;  // Tax rate in ON is normally 13%
    if (sub <= 4) // Partial tax rebate if the order cost is less than or equal to $4.00
    {
        taxes = sub * 0.05;
    }
    document.getElementById("taxes").innerHTML = "$" + String(taxes.toFixed(2)); // Outputs the tax cost
    total_cost();
}

function total_cost() {
    var tip = 0;
    if (document.getElementById("tip-form").elements[0].value) {
        tip = parseFloat(document.getElementById("tip-form").elements[0].value) // Gets the tip
    }

    if (tip < 0) { // Ensures the tip is positive
        tip = 0;
    }
    // Adds the subtotal, tip, and tax together to get final cost, and outputs it
    var subtotal = parseFloat(document.getElementById("subtotal").innerHTML.substr(1));
    var tax = parseFloat(document.getElementById("taxes").innerHTML.substr(1));
    document.getElementById("final_total").innerHTML = "$" + String((tip + subtotal + tax).toFixed(2));

}

function print_menu() {
    var printContents = document.getElementById("print-menu").innerHTML; // Grabs the print menu
    var originalContents = document.body.innerHTML; // Grabs the whole page
    document.body.innerHTML = printContents;  // Sets the whole page to the menu and prints
    window.print();
    document.body.innerHTML = originalContents; // Resets the page
}

function print_receipt() {
    document.getElementById("split-options").style.display = "none"; // Hides elements not meant to be displayed
    document.getElementById("item-forms").style.display = "none";

    var printContents = document.getElementById("current-order").innerHTML; // Grabs the order menu
    var tip = document.getElementById("tip-amount").value; // Saves the tipped amount, as the printContents doesnt save the form
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    document.getElementById("tip-amount").value = tip; // Manually sets the tip value
    window.print();
    document.body.innerHTML = originalContents;

    document.getElementById("split-options").style.display = "block"; // Re shows the elements
    document.getElementById("item-forms").style.display = "block";

}

function add_item() {

    var new_menu = document.createElement("li"); // Creates a new list item
    var name = document.getElementById("new-item-name").value; // Grabs the name and price from the form
    var price = document.getElementById("new-item-price").value;
    // Sets the new list item to have the proper formatting and information
    new_menu.innerHTML = name + '<span style="float:right"> $' + parseFloat(price).toFixed(2) + "</span>";
    if (name && price) { // If both name and price are defined in the form
        num_foods++;
        document.getElementById("menu-list").appendChild(new_menu); // Appends the list element
        document.getElementById("new-menu-item").reset(); // Clears the form
        var oForm = document.getElementById("fries-s"); // Clones the "Fries (S)" food to use as a template
        var clone = oForm.cloneNode(true);

        clone.setAttribute("id", name); // Sets the attributes to the new value
        clone.value = "";
        // Dynamically sets the "oninput" attribute so that the cost can be calculated inn the future
        clone.setAttribute("oninput", "item_cost(" + String(price) + ", " + String(num_foods - 1) + ")");

        document.getElementById("item-forms").appendChild(clone); // Appends the form and creates a line break
        document.getElementById("amount").appendChild(document.createElement("br"));

        var x = document.createElement("p"); // Appends the item name to the receipt
        x.innerHTML = name;
        document.getElementById("item-names").appendChild(x);

        var p = document.createElement("p"); // Appends the item price to the receipt
        p.innerHTML = "$0.00";
        p.setAttribute("id", String(num_foods - 1));
        p.setAttribute("style", "float: right");
        document.getElementById("item-prices").appendChild(p);
    }
}

function show_split() {
    document.getElementById("split-a").value = ""; // Resets the values
    document.getElementById("split-b").innerHTML = "$0.00";
    if (document.getElementById("split-check").checked) { // If checked, display the split bill menu
        document.getElementById("split-menu").style.display = "block";
    }
    else {
        document.getElementById("split-menu").style.display = "none";
    }

}

function party_b() { // Calculates the amount party B has to pay
    var party_a = parseFloat(document.getElementById("split-a").value); // Gets the amount paid by party A thru the form
    total = document.getElementById("final_total").innerHTML; // Gets the total
    total = parseFloat(total.substr(1));
    var party_b = total - party_a; // Party B is the difference of the total and what is paid by the other party
    if (party_b < 0) { // Party A can't be greater than the total, so resets the forms
        party_b = 0;
        alert("You can't pay more than what is owed!")
        document.getElementById("split-b").innerHTML = "$0.00";
        return;
    }
    if (!isNaN(party_a)) {
        // Sets party B to the correct value
        document.getElementById("split-b").innerHTML = "$" + String(party_b.toFixed(2));
    }
    else {
        document.getElementById("split-b").innerHTML = "$0.00";
    }
}

window.onload = function () { // When page is loaded, reset all values
    document.getElementById("amount").reset();
    document.getElementById("tip-form").reset();
    document.getElementById("split-check").checked = false;
    show_split();
    for (var i = 0; i < num_foods; i++) {
        document.getElementById(String(i)).innerHTML = "$0.00";
    }
    document.getElementById("subtotal").innerHTML = "$0.00";
    document.getElementById("taxes").innerHTML = "$0.00";
    document.getElementById("final_total").innerHTML = "$0.00";

}
