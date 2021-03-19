console.log("js");

$(document).ready(function () {
  console.log("JQ");
  // Establish Click Listeners
  setupClickListeners();
  // load existing koalas on page load
  getKoalas();
}); // end doc ready

function setupClickListeners() {
  $(document).on("click", ".deleteBtn", deleteKoala);
  $(document).on("click", ".transferToggleBtn", toggleReadiness);

  $("#addButton").on("click", function () {
    console.log("in addButton on click");
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $("#nameIn").val(),
      age: $("#ageIn").val(),
      gender: $("#genderIn").val(),
      readyForTransfer: $("#readyForTransferIn").val(),
      notes: $("#notesIn").val(),
    };
    console.log(koalaToSend);
    // call saveKoala with the new obejct
    saveKoala(koalaToSend);
  });
}

function getKoalas() {
  console.log("in getKoalas");
  // ajax call to server to get koalas
  $.ajax({
    method: "GET",
    url: "/koalas",
  }).then(function (response) {
    console.log(response);
    showKoalas(response);
  });
} // end getKoalas

function saveKoala(newKoala) {
  console.log("in saveKoala", newKoala);
  // ajax call to server to post koalas
  $.ajax({
    method: "POST",
    url: "/koalas",
    data: newKoala,
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log("error in koala POST", error);
      alert("Error adding koala.");
    });
} // end saveKoala

function toggleReadiness() {
  const myID = $(this).data("id");
  console.log("ID clicked:", myID);

  let readiness = {
    status: $(this).data("status"),
  };
  console.log(readiness);
  $.ajax({
    method: "PUT",
    url: `/koalas/${myID}`,
    data: readiness,
  })
    .then(function (response) {
      console.log("back from /koalas PUT", response);
      getKoalas();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function showKoalas(array) {
  console.log("in showKoalas");
  $("#viewKoalas").empty();
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    $("#viewKoalas").append(`
    <tr scope="row">
      <td>${element.name}</td>
      <td>${element.age}</td>
      <td>${element.gender}</td>
      <td>${element.ready_for_transfer}</td>
      <td>${element.notes}</td>
      <td><button data-id="${element.id}" data-status="${element.ready_for_transfer}" class="transferToggleBtn">Ready for Transfer</button></td>
      <td><button data-id="${element.id}" class="deleteBtn">Delete</button></td>
    </tr>
  `);
  }
} //end showKoalas

function deleteKoala() {
  swal({
    text: `are you sure you want to terminate this koala?`,
    icon: "warning",
    buttons: ["NO", "YES"],
    dangerMode: true,
  }).then((response) => {
    if (response) {
      const myID = $(this).data("id");
      console.log("ID clicked:", myID);

      $.ajax({
        type: "DELETE",
        url: `/koalas/${myID}`,
      })
        .then(function (response) {
          console.log("back from DELETE with:", response);
          getKoalas();
        })
        .catch(function (error) {
          console.log("error in DELETE Route", error);
        });
    } else {
      swal("the Koala has been saved!");
    }
  });
} // end deleteKoala
