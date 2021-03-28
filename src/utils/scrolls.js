export function scrollFunction() {
  // window.scrollX
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    console.log("hi, ", document.body.scrollTop);
    document.getElementById("backTopDiv").style.display = "block";
  } else {
    document.getElementById("backTopDiv").style.display = "none";
  }
}
