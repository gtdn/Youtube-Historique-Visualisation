function printTime(textMessage, timeStart){
  const d = new Date();
  let timeLoad = d.getTime();
  console.log(textMessage," :",timeLoad," Duration :",(timeLoad - timeStart)/ 1000)
}
