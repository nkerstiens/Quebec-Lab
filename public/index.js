// const deleteButton = document.querySelector('#delete-button')


// deleteButton.addEventListener('click', _ => {
//     fetch('/players', {
//         method: 'delete',
//         headers: { 'Content-Type': 'applications/json' },
//         body: JSON.stringify({
//             player: 'Peyton'
//         })
//     })
//       .then(res => {
//         if(res.ok) return res.json()
//       })
//       .then(response => {
//         window.location.reload(false)
//       })
// })


$(".delete").click(function(){
  console.log("delete buttong clicked");
  var id = $(this).attr("id");
  console.log(id);
  fetch(`players/player_id:${id}`, {
    method:"delete",
    headers: {'Content-Type': 'applications/json'}
  })
  
  // .then(result => {
  //   res.json(`Deleted Darth Vader's quote`)
  // })
  // .catch(error => console.error(error))
})