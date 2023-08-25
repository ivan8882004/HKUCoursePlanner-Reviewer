const fs = require('fs');

const filePath = './fbe.txt';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const array = data.split("\r\n");
  const courses = [];

  for (let i = 0; i < array.length; i++) {
    if (array[i].slice(-8) === "credits)") {
        courses.push({top: array[i], content: ""})
        continue;
    } else {
        courses[courses.length - 1].content += array[i]
    }
  }

  const toProcessList = [];

  for (let i = 0; i < courses.length; i++) {
    toProcessList.push({info: courses[i].top, prereg: "", exclusive: ""})
    const remarksIndex = courses[i].content.indexOf("Remarks:")
    if (remarksIndex !== -1) {
        courses[i].content = courses[i].content.slice(0, remarksIndex)
    }
    const exclusiveIndex = courses[i].content.indexOf("Mutually exclusive: ")
    if (exclusiveIndex !== -1) {
        toProcessList[toProcessList.length - 1].exclusive = courses[i].content.slice(exclusiveIndex + "Mutually exclusive: ".length)
        courses[i].content = courses[i].content.slice(0, exclusiveIndex)
    }
    const preregIndex = courses[i].content.indexOf("Prerequisite: ")
    if (preregIndex !== -1) {
        toProcessList[toProcessList.length - 1].prereg = courses[i].content.slice(preregIndex + "Prerequisite: ".length)
    }
    const preregsIndex = courses[i].content.indexOf("Prerequisites: ")
    if (preregsIndex !== -1) {
        toProcessList[toProcessList.length - 1].prereg = courses[i].content.slice(preregsIndex + "Prerequisites: ".length)
    }
  }

  const output = [];

  for (let i = 0; i < toProcessList.length; i++) {
    const course = {
        name: "",
        fullName: "",
        prereg: [],
        isPrereg: [],
        exclusive: [],
        recommendYear: 0,
        credit: 6
    }
    course.name = toProcessList[i].info.slice(0, 8)
    course.fullName = toProcessList[i].info.slice(10, -12)
    course.credit = parseInt(toProcessList[i].info.slice(-10, -9))
    if (toProcessList[i].exclusive !== "") {
        course.exclusive = toProcessList[i].exclusive.split("; and").map((courseFullTopic) => courseFullTopic.slice(0, 8))
    }
    if (!toProcessList[i].prereg) {
        output.push(course)
        continue;
    }
    const temp = toProcessList[i].prereg.split("; and")
    const temp1 = temp.map((item) => item.split("; or"))
    for (let j = 0; j < temp1.length; j++) {
        const time = temp1[j].length;
        for (let k = time - 1; k >= 0; k--) {
            if (temp1[j][k].indexOf(" or ") !== -1){
                temp1[j] = temp1[j][k].split(" or ").map((courseFullTopic) => courseFullTopic.slice(0, 8))
            } else if (temp1[j][k].indexOf(" and ") !== -1) {
                temp1[j][k] = temp1[j][k].split(" and ").map((courseFullTopic) => courseFullTopic.slice(0, 8)).join("&")
            } else {
                temp1[j][k] = temp1[j][k].slice(0, 8)
            }
        }
    }
    course.prereg = temp1;
    
    output.push(course)
  }

  fs.writeFile("./fbe.json", JSON.stringify(output), (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
  
    console.log('File exported successfully.');
  });
});
