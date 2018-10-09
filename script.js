const firebaseConfig = {
  apiKey: "AIzaSyB7i1nha2fRAiuXpnw4aYc35NfzHWuWWo0",
  authDomain: "react-brasil-newsletter.firebaseapp.com",
  projectId: "react-brasil-newsletter"
};

window.onload = function() {
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  function convertToCSV(objArray) {
    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    var str = "";

    for (var i = 0; i < array.length; i++) {
      var line = "";
      for (var index in array[i]) {
        if (line != "") line += ",";

        line += array[i][index];
      }

      str += line + "\r\n";
    }

    return str;
  }

  const getAllEmails = () => {
    var emailsRef = db.collection("emails");
    return emailsRef.get();
  };

  getAllEmails().then(emailList => {
    var jsonEmails = [];
    emailList.forEach(doc => {
      jsonEmails.push(doc.data());
    });

    csvFile = convertToCSV(jsonEmails);
    var blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });

    var url = URL.createObjectURL(blob);

    var dlAnchorElem = document.getElementById("downloadAnchorElem");

    dlAnchorElem.setAttribute("href", url);
    dlAnchorElem.setAttribute("download", "export.csv");
  });
};
