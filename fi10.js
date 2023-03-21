"use strict";

const transferBalance = document.querySelector("#transferBalance");
const multipleCArefund = document.querySelector("#multipleCArefund");
const noActiveRefund = document.querySelector("#noActiveRefund");
const transferToCA = document.querySelector("#transferToCA");
const lone4 = document.querySelector("#lone4");

transferBalance.addEventListener("click", function () {
  transferToCA.disabled = false;
  lone4.disabled = false;
});

multipleCArefund.addEventListener("click", function () {
  transferToCA.disabled = true;
  lone4.disabled = true;
  transferToCA.value = "";
  lone4.value = "";
});

noActiveRefund.addEventListener("click", function () {
  transferToCA.disabled = true;
  lone4.disabled = true;
  transferToCA.value = "";
  lone4.value = "";
});

document.forms.myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // get all the (not disabled) data from the form
  let formData = new FormData(e.target);
  // create data object
  let data = {};
  // run through all entries and add to data object
  [...formData.entries()].forEach((entry) => {
    data[entry[0]] = entry[1];
  });
  console.log(data);
  // if you need all the keys to be in the object
  // you can pre-populate the data object with empty values
  let data2 = {};
  [...e.target.elements].forEach((elm) => {
    if (elm.name) data2[elm.name] = "";
  });
  // run through all entries and add to data object
  [...formData.entries()].forEach((entry) => {
    data2[entry[0]] = entry[1];
  });

  const irecTextarea = document.querySelector("textarea[name='irec']");
  let output = "";

  output += `${data.bpemnumber}\n\n`;
  output += `${data.accountInfo}\n`;
  output += `Excess credit of $${data.credit}\n`;

  if (data.payer) {
    output += `Payment made by: ${data.payer}`;
  }

  output += `\n\n`;

  if (data.action === "1") {
    output += `No active CA found\nIssued refund cheque for credit`;
  }

  if (data.action === "2") {
    output += `Multiple CAs for BP\nIssued refund cheque for credit`;
  } else if (data.action === "3") {
    output += `Transferred credit to active CA: ${data.transferToCA}`;
  }

  if (data.lone4 === "on" || data.lone4 === "") {
    output += `\nSent LONE4 letter to advise of misposted payment`;
  }

  output += irecTextarea.value = output;
});

// copy irec
const copyirecButton = document.getElementById("copyIrecButton");
const textarea = document.querySelector('textarea[name="irec"]');

copyirecButton.addEventListener("click", function (event) {
  event.preventDefault();
  textarea.select();
  document.execCommand("copy");
});

// clear form
const clearFormButton = document.getElementById("clearForm");
clearFormButton.addEventListener("click", function (event) {
  event.preventDefault();
  const textInputs = document.querySelectorAll(
    "input[type='text'],  [type='number']"
  );
  const checkboxes = document.querySelectorAll("input[type='checkbox']");
  const radioButtons = document.querySelectorAll("input[type='radio']");

  textInputs.forEach((input) => (input.value = ""));
  checkboxes.forEach((checkbox) => (checkbox.checked = false));
  radioButtons.forEach((radio) => {
    radio.checked = false;
    radio.disabled = false;
  });
  document.querySelector("input[name='lone4']").disabled = true;
  document.querySelector("input[name='transferToCA']").disabled = true;
  document.querySelector("textarea[name='irec']").value = "";
  document.querySelector("textarea[name='accountInfo']").value = "";
});
