function skillsMember() {
  var member = document.getElementById("member").value;
  var url = "/skills/" + member;
  window.location.href = url;
}