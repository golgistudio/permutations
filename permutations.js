// Print all permutations for a string using Heap's algorithm:
// https://en.wikipedia.org/wiki/Heap%27s_algorithm

// Globals

// To use in command line mode using node
// 1) copy javascript to a javascript file on your local drive
// 2) set supportWebOutput to false
var supportWebOutput = true;
var outputStep = null;
var testCases = [];
var testCaseNames = [];

// Swap values
function swap(inputArray, index1, index2) {
  "use strict";
  var val = inputArray[index1];
  inputArray[index1] = inputArray[index2];
  inputArray[index2] = val;
};

// Main algorithm
function generate(subStringLength, inputArray) {
    var subStringEnd = subStringLength - 1;
  
    if (subStringLength <= 1) {
      outputStep(stepNum, inputArray, subStringLength, subStringEnd, "DONE                ", true);
      stepNum++;
    }
    else {
      outputStep(stepNum, inputArray, subStringEnd, subStringEnd, "generate", false);
    stepNum++;
      for (var i = 0; i < subStringEnd; i += 1 ) {
        generate (subStringEnd, inputArray);
        if ((subStringLength % 2) === 0) {
          outputStep(stepNum, inputArray, i, subStringEnd, "swap    ", false);
          stepNum++;
          swap (inputArray, i, subStringEnd);
        }
        else {
           outputStep(stepNum, inputArray, 0, subStringEnd, "swap    ", false);
          stepNum++;
          swap (inputArray, 0, subStringEnd)
        }
      }
      generate(subStringEnd, inputArray)
    }
}

function runAlgo(params) {
    stepNum = 1;
    outputProblemDefinition(params);
    generate(params.inputArray.length, params.inputArray);
}

// run the custom test case
function runCustom(inputString) {
  var inputArray = inputString.split(',');
  inputArray = inputArray.slice(0, 8);
  var params = {
    "inputArray": inputArray,
    "name": "Custom"
  };
  runAlgo(params);
}

//============================================
// Test Cases 
//=============================================
function createTestCases() {
  var testCase = testCase_1();
  testCases[testCase.name] = testCase;
  testCaseNames[0] = testCase.name;
  
  testCase = testCase_2();
  testCases[testCase.name] = testCase;
  testCaseNames[1] = testCase.name;
  
  testCase = testCase_3();
  testCases[testCase.name] = testCase;
  testCaseNames[2] = testCase.name;
  
  testCase = testCase_4();
  testCases[testCase.name] = testCase;
  testCaseNames[3] = testCase.name;
  
  testCase = testCase_5();
  testCases[testCase.name] = testCase;
  testCaseNames[4] = testCase.name;
  
  testCase = testCase_6();
  testCases[testCase.name] = testCase;
  testCaseNames[5] = testCase.name;
}
function testCase_1() {
  var params = {
    "inputArray": ['a','b','c','d'],
    "name" : "Even"
  };
  return params;
};

function testCase_2() {
  var params = {
    "inputArray": ['a','b','c'],
    "name" : "Odd"
  };
  return params;
};

function testCase_3() {
  var inputArray = ['a'];
  var params = {
    "inputArray": inputArray,
    "name" : "Single"
  };
  return params;
};

function testCase_4() {
  var params = {
    "inputArray": ['a','b','c','d','e','f'],
    "name" : "6 values"
  };
  return params;
};

function testCase_5() {
  var params = {
    "inputArray": [],
    "name" : "Empty"
  };
  return params;
};

function testCase_6() {
  var params = {
    "inputArray": ['a','b','a','c'],
    "name" : "Duplicates"
  };
  return params;
};

//============================================
// Web code
//============================================
// Retrieve custom string from web page
function handleCustom(inputArray) {
  // Test case
  var inputString = document.getElementById("customArray").value;
  runCustom(inputString);
};

function webTestCaseClickHanlder(e) {
  runAlgo(testCases[event.target.id]);
}

function addControl(params) {
  "use strict";
  //Create an input type dynamically.
  var element = document.createElement("input");

  //Assign different attributes to the element.
  element.setAttribute("type", params.inputType);
  element.setAttribute("value", params.value);
  element.setAttribute("name", params.name);
  element.setAttribute("id", params.elementId);
  element.addEventListener("click", params.click.bind(element))

  var controlArea = document.getElementById(params.parentId);

  //Append the element in page (in span).
  controlArea.appendChild(element);
};

function createTestCaseButton(param) {
  var params = {
    "inputType": "button",
    "value": param.name,
    "name": param.name,
    "parentId": "controls",
    "elementId": param.name,
    "click": webTestCaseClickHanlder
  };
  addControl(params);
};

function createTestCaseButtons() {
  for (var key in testCases) {
    createTestCaseButton(testCases[key]);
  }
}

//============================================
// Helper functions to display progress
//=============================================
function outputDescription(title, description) {
  if (supportWebOutput) {
    document.getElementById("description").innerHTML = "<h3>" + title + "</h3>" + description;
  }
}
function outputProblemDefinition(params) {
  "use strict";

  if (supportWebOutput) {
    var output = document.getElementById('problemDefinition');

    output.innerHTML = params.name + ": Array = [" + params.inputArray + "] <br>";
    clearTable();
  }
  console.log(params.name + " | array = [" + params.inputArray + "]");

};

function clearTable() {
  var table = document.getElementById('alogOutput');
  while (table.childNodes.length > 2) {
    table.removeChild(table.lastChild);
  }
};

function consoleLogStep(stepNum, numArray, i, j, action) {
  "use strict";

  var logoutput = stepNum + " | ";
  logoutput = logoutput + action;
  logoutput = logoutput + "array[ " + i + " ] =  " + numArray[i] + " | ";
  logoutput = logoutput + "array[ " + j + " ] =  " + numArray[j] + " | ";
  logoutput = logoutput + "[" + numArray + " ]";
  console.log(logoutput);
}

function webOutputStep(stepNum, numArray, i, j, action, highlight) {
  "use strict";
  var output = {};
  output.step = stepNum;
  output.i = i;
  output.j = j;
  output.iVal = numArray[i];
  output.jVal = numArray[j];
  output.action = action;
  output.array = numArray;

  appendRow(output, highlight);
};

function fillInRow(rowHTML, index, value) {
  "use strict";
  var cell = rowHTML.insertCell(index);
  cell.innerHTML = value;
};

function appendRow(output, highlight) {
  "use strict";
  var tableBody = document.getElementById('alogOutput');

  var newRow = document.createElement("tr");
  if (highlight) {
    newRow.setAttribute("class", "highlight");
  }
  
  var index = 0;
  var value = output["step"];
  fillInRow(newRow, index, value);

  index++;
  value = output["action"];
  fillInRow(newRow, index, value);
  
  index++;
  value = "array[ " + output["i"] + " ] = " + output["iVal"];
  fillInRow(newRow, index, value);

  index++;
  value = "array[ " + output["j"] + " ] = " + output["jVal"];
  fillInRow(newRow, index, value);

  index++;
  value = "[ " + output["array"] + " ]";
  fillInRow(newRow, index, value);

  tableBody.appendChild(newRow);
};

//============================================
// This is the main program
//=============================================

// Main for web based version
function webMain() {
   var title = "Permutation generator";
   var description = "Given a string of letters, generate all permutations using Heap's algorithm: <a href=\"https://en.wikipedia.org/wiki/Heap%27s_algorithm\" target=_blank> https://en.wikipedia.org/wiki/Heap%27s_algorithm</a>";
  
    outputDescription(title, description);
  
    // Create test case buttons
    createTestCaseButtons();
 
    // Assign event handler for custom button click
    document.getElementById("customButton").addEventListener("click", handleCustom);
    outputStep = webOutputStep;
}

function displayConsoleHints(inputParams){

	var programName = inputParams[1].split("/"); 

	console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
   	console.log ("Run one of the predefined test cases:")
   	console.log ("\'node " + programName[programName.length -1] + " t=#\' where # = 1 - 6");
	console.log(" ");
   	console.log ("Run a custom case:")
   	console.log ("\'node " + programName[programName.length -1] + " c=[up to 8 characters comma separated]\'  ");
}

function launchTestCase(inputParams) {
	var testCase = inputParams[2].split("=");

	switch (testCase[0]) {
		case "t": 
			testCaseIndex = parseInt(testCase[1]);
			if (testCaseIndex > 0) {
				testCaseIndex = testCaseIndex - 1;
			}
			if (testCaseIndex < 0) {
				testCaseIndex = 0;
			} else if (testCaseIndex > testCaseNames.length - 1) {
				testCaseIndex = testCaseNames.length - 1;
			}
			testCaseToRun = testCases[testCaseNames[testCaseIndex]];
			runAlgo(testCaseToRun);
			break;
		case "c": 
			runCustom(testCase[1]);
			break;
		default:
			displayConsoleHints(inputParams);
			break;

	};
}

// main for command line version
function commandLineMain(arguments) {
    inputParams = arguments.slice(" ");
	console.log(inputParams);

    if (inputParams.length === 2) {
		displayConsoleHints(inputParams);
    }

    outputStep = consoleLogStep;

	launchTestCase(inputParams);

}

// Main entry point
function main() {
  "use strict";

  createTestCases();
  
  if (supportWebOutput) {
    webMain();
  } else {
    commandLineMain(process.argv);
  }
};

//============================================
// This is where the program starts
//=============================================
main();
