function toggleVisibility(selectedTab) {

        // Get a list of your content divs
        var content = document.getElementsByClassName('txt');

        // Loop through, hiding non-selected divs, and showing selected div
        for(var i=0; i<content.length; i++) {
            if(content[i].id == selectedTab) {
                content[i].style.display = 'block';
            } else {
                content[i].style.display = 'none';
            }
        }

}

function toggleKeysPickerVisability(checkbox, hidden) {
    var checkbox = $(`#${checkbox}`);
    var hidden = $(`#${hidden}`);
    hidden.hide();
    checkbox.change(function() {
            if (checkbox.is(':checked')) {
            hidden.hide();
            hidden.attr('required', false);
            } else {
            hidden.show();
            hidden.attr('required', true);
            }
    });
}