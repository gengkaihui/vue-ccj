// let reg=/^18|19$///189/119
let reg=/^[(18)29]$///189/119
console.log(reg.test(1829));//1819
console.log(reg.test(182));//1819
console.log(reg.test(119));//1819
console.log(reg.test(8));//1819
console.log(reg.test(1));//1819
console.log(reg.test(2));//1819
console.log(reg.test(9));//1819


let str = "2015";
let ary = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
str = str.replace(/\d{1}/g, function () {
  return ary[arguments[0]];
});
console.log(str);

