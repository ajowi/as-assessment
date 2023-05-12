// @ts-nocheck
export function autocompleteFilter(data, element){
    /* FILTERING DATA BASED ON INPUT */	
    let filteredData = [];

    const filterData = () => {
        let storageArr = []
        if (inputValue) {
            data.forEach(company => {
                if (company.name.toLowerCase().startsWith(inputValue.toLowerCase())) {
                    storageArr = [...storageArr, makeMatchBold(company.name)];
                }
            });
        }
        filteredData = storageArr;
    }	


    /* HANDLING THE INPUT */
    let searchInput; // use with bind:this to focus element
    let inputValue = "";
        
    $: if (!inputValue) {
        filteredData = [];
        hiLiteIndex = null;
    }

    const clearInput = () => {
        inputValue = "";	
        searchInput.focus();
    }
        
    const setInputVal = (companyName) => {
        inputValue = removeBold(companyName);
        filteredData = [];
        hiLiteIndex = null;
        document.querySelector(element).focus();
    }	

    const submitValue = () => {
        if (inputValue) {
            console.log(`${inputValue} is submitted!`);
            setTimeout(clearInput, 1000);
        } else {
            alert("You didn't type anything.")
        }
    }

    const makeMatchBold = (str) => {
        // replace part of (country name === inputValue) with strong tags
        let matched = str.substring(0, inputValue.length);
        let makeBold = `<strong>${matched}</strong>`;
        let boldedMatch = str.replace(matched, makeBold);
        return boldedMatch;
    }

    const removeBold = (str) => {
        //replace < and > all characters between
        return str.replace(/<(.)*?>/g, "");
        // return str.replace(/<(strong)>/g, "").replace(/<\/(strong)>/g, "");
    }	
        

    /* NAVIGATING OVER THE LIST OF COUNTRIES W HIGHLIGHTING */	
    let hiLiteIndex = null;
    $: hiLitedCountry = filteredData[hiLiteIndex]; 	
        
    const navigateList = (e) => {
        if (e.key === "ArrowDown" && hiLiteIndex <= filteredData.length-1) {
            hiLiteIndex === null ? hiLiteIndex = 0 : hiLiteIndex += 1
        } else if (e.key === "ArrowUp" && hiLiteIndex !== null) {
            hiLiteIndex === 0 ? hiLiteIndex = filteredData.length-1 : hiLiteIndex -= 1
        } else if (e.key === "Enter") {
            setInputVal(filteredData[hiLiteIndex]);
        } else {
            return;
        }
    }
    
    return {
        filteredData,
        navigateList,
        searchInput,
        inputValue,
        hiLiteIndex,
        setInputVal
    }
}