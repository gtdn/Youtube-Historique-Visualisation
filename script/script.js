function printTime(textMessage, timeStart){
  const d = new Date();
  let timeLoad = d.getTime();
  console.log(textMessage," :",timeLoad," Duration :",(timeLoad - timeStart)/ 1000)
}

function areEqual(array1, array2) {
  var valChange = [];
  if (array1.length === array2.length) {
    const b = array1.every((element) => {
      if(array2.find((d)=> d[0] == element[0]) != undefined){
        return true;
      }else{

        valChange = element[0];
        return false;
      }
    });
    if(b){
      return true;
    }else{
      console.log(valChange)
      return valChange;
    }
  }
  return false;
}
