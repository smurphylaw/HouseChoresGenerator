function chooseChore() {
    $.ajax({
        url: 'generator/chooseChore',
        type: 'GET',
        success: function(result){
            document.getElementById('choreResult').textContent = result;
        }
    });
}

function scheduleChore() {
    $.ajax({
        url: 'schedule/scheduleChore',
        type: 'GET',
        success: function(result){
             document.getElementById('scheduleResult').style.display = "block";    
        }
    });
}