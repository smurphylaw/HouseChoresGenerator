function deleteChore(id){
    
    $.ajax({
        url: '/chores',
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};