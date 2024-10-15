// $(function () {

//   const summaryDiv = $('#summary'); //document.getElementById("summary");


//   $('form').submit(function (event) {
//     event.preventDefault();
//     const formData = new FormData($('form')[0]);
//     try {
//       summarize(formData).then((summaryText) => {
//         console.log("Summary: ", summaryText);

//         const sentences = summaryText.split(". ");

//         sentences.forEach((sentence, index) => {
//           const isLast = index === sentences.length - 1;
//           const $p = $("<p>").text(sentence.trim() + (isLast ? "" : "."));
//           summaryDiv.append($p);
//         });

//         //Show summary to user
//         summaryDiv.removeClass('hide');
        

//       });


//     } catch (err) {
//       console.error("Error", err);
//       summaryDiv.classList.remove("hide");

//       //Show error message to user
//       summaryDiv.removeClass('hide');
//       summaryDiv.text("Sorry, there was an rrror generating a summary. We are a work in progress, please try again later.");
//     }
//   });


//   async function summarize(formData) {
//     try {
//       const response = await $.ajax({
//         url: '/upload',
//         type: 'POST',
//         data: formData,
//         processData: false,
//         contentType: false,
//         async: false
//       });

//       console.log('Succes: Server response', response.data);
//       return (Promise.resolve(response.data));
//     }
//     catch (err) {
//       console.log("Error: ", err);
//       return (Promise.reject(err));
//     }
//   }


// });


$(function () {
  const summaryDiv = $('#summary');

  $('form').submit(function (event) {
    event.preventDefault();
    const formData = new FormData($('form')[0]);

    summarize(formData).then((summaryText) => {
      console.log("Summary: ", summaryText);

      if (summaryText) {
        const sentences = summaryText.split(". ");

        sentences.forEach((sentence, index) => {
          const isLast = index === sentences.length - 1;
          const $p = $("<p>").text(sentence.trim() + (isLast ? "" : "."));
          summaryDiv.append($p);
        });

        // Show summary to user
        summaryDiv.removeClass('hide');
      } else {
        showError("No summary generated.");
      }
    }).catch(err => {
      console.error("Error", err);
      showError("Sorry, there was an error generating a summary. We are a work in progress, please try again later.");
    });
  });

  async function summarize(formData) {
    try {
      const response = await $.ajax({
        url: '/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false
      });

      console.log('Success: Server response', response.data);
      return response.data;
    } catch (err) {
      console.log("Error: ", err);
      throw err; // Re-throw the error to be handled in the submit function
    }
  }

  function showError(message) {
    summaryDiv.removeClass('hide').text(message);
  }
});
