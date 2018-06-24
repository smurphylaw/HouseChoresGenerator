function chooseChore() {
    
    var chores = ['Take out the trash', 'Wash the car', 'Vacuum your bedroom', 'Do the dishes', 'Clean surface area in living room'];
    
    var chore = chores[Math.floor(Math.random() * chores.length)];
    
    document.getElementById('choreResult').textContent = chore;
}