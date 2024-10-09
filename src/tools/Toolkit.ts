// randomly generates a number between the range of low and high
// arguments :
// low : number - the lowest number in the range
// high : number - the highest number in the range
function getRandom(low:number = 1, high:number = 10) {
    let randomNumber:number;
    // calculate random number
    randomNumber = Math.round(Math.random() * (high - low)) + low;
    // returning value
    return randomNumber;
}

// adds key event listener to any key and runs a function when that key is pressed
// arguments :
// functionToCall : function - the function to call when the key is pressed
// keyToDetect : string - the key to detect
function addKey(functionToCall:Function, myKeyCode:string = "Enter") {
    // this example exposes issue with scoping and event handlers and how it is solved with arrow function

    // wire up event listener
    document.addEventListener("keydown", (e:KeyboardEvent) => {
        // is the key released the provided key? Check keyCode via Event object
        if (e.code === myKeyCode) {
            // pressing the enter key will force some browsers to refresh
            // this command stops the event from going further
            e.preventDefault();
            // call provided callback to do everything else that needs to be done
            functionToCall();
            // this also helps the event from propagating in some browsers
            return false;
        }
    });
}

// retrieves JSON data from a URL and runs a function when the data is retrieved, passing along the JSON data as an argument
// arguments :
// retrieveURL : string - the URL to retrieve the JSON data from
// caching : boolean - whether to cache the data on the server if it rarely changes (default is set to true)
// debug : boolean - whether to throw an error if one occurs (default is set to true)
async function getJSONData(retrieveScript:string, caching:boolean = true, debug:boolean = true) {
    try {
        const response:Response = await fetch(retrieveScript, { cache: (caching ? 'force-cache' : 'no-store') });
        const data:any = await response.json();
        // pause for one second if in debugging mode to simulate slow response
        if (debug) await new Promise(resolve => setTimeout(resolve, 4000));
        return data;
    } catch (error:any) {
        console.log(`>>> FETCH ERROR: ${error.message}`);
        if (debug) throw error;
        return null;
    }
}

// sends JSON data to a URL and runs a function when the response has been received
// arguments :
// sendURL : string - the URL to send the JSON data to
// sendJSON : object - the JSON data to send
// debug : boolean - whether to throw an error if one occurs (default is set to true)
async function sendJSONData(sendURL: string, sendJSON: any, debug: boolean = true) {
    try {
        const response = await fetch(sendURL, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(sendJSON)
        });
        const data:any = await response.json();
        if (debug) await new Promise(resolve => setTimeout(resolve, 2000));
        return data;
    } catch (error:any) {
        console.log(`>>> FETCH ERROR: ${error.message}`);
        if (debug) throw error;
        return null;
    }
}

export {getRandom, addKey, getJSONData, sendJSONData};