function chooseChore() {
    $.ajax({
        url: 'generator/chooseChore',
        type: 'GET',
        success: function(result){
            document.getElementById('choreResult').textContent = result;
        }
    });
}