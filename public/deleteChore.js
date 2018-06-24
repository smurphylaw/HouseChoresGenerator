function deleteChore(){
    $.ajax({
        url: '/chores',
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};