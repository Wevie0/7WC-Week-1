num_foods = 10;
function send_order() {
    document.getElementById("amount").reset();
    document.getElementById("tip-form").reset();
    alert("Your order was sent!");
    for (var i = 0; i < num_foods; i++) {
        document.getElementById(String(i)).innerHTML = "$0.00";
    }
    document.getElementById("subtotal").innerHTML = "$0.00";
    document.getElementById("taxes").innerHTML = "$0.00";
    document.getElementById("final_total").innerHTML = "$0.00";
}

function item_cost(cost, index) {
    var item_cost = 0;
    var item_list = document.getElementById("amount");
    item_cost += item_list.elements[index].value * cost;
    document.getElementById(String(index)).innerHTML = "$" + String(item_cost.toFixed(2));
    subtotal();
}

function subtotal() {
    var subtotal = 0;
    for (var i = 0; i < num_foods; i++) {
        subtotal += parseFloat(document.getElementById(String(i)).innerHTML.substr(1));
    }
    document.getElementById("subtotal").innerHTML = "$" + String(subtotal.toFixed(2));
    calculate_tax(subtotal);
}

function calculate_tax(sub) {
    var taxes = sub * 0.13;
    if (sub <= 4) // Partial tax rebate if the order cost is less than or equal to $4.00
    {
        taxes = sub * 0.05;
    }
    document.getElementById("taxes").innerHTML = "$" + String(taxes.toFixed(2));
    total_cost();
}

function total_cost() {
    var tip;
    if (document.getElementById("tip-form").elements[0].value) {
        tip = parseFloat(document.getElementById("tip-form").elements[0].value)
    }
    else {
        tip = 0;
    }
    var subtotal = parseFloat(document.getElementById("subtotal").innerHTML.substr(1));
    var tax = parseFloat(document.getElementById("taxes").innerHTML.substr(1));
    document.getElementById("final_total").innerHTML = "$" + String((tip + subtotal + tax).toFixed(2));

}

function print_menu() {
    var printContents = document.getElementById("print-menu").innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}

window.onload = function () {
    document.getElementById("amount").reset();
    document.getElementById("tip-form").reset();
    for (var i = 0; i < num_foods; i++) {
        document.getElementById(String(i)).innerHTML = "$0.00";
    }
    document.getElementById("subtotal").innerHTML = "$0.00";
    document.getElementById("taxes").innerHTML = "$0.00";
    document.getElementById("final_total").innerHTML = "$0.00";
}