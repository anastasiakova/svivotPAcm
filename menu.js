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
